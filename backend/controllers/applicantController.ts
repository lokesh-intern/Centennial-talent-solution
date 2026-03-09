import type { Request, Response } from "express"
import Applicant from "../models/applicant.js"
import bcrypt from "bcryptjs"
import { uploadToCloudinary } from "../services/cloud.js";
import jwt from "jsonwebtoken";
import type JWTPayload from "../types/JWTPayload.js";




interface LoginBody {
  email: string
  password: string
}



export const registerController = async (
  req: Request,
  res: Response
) => {
  try {
    const { password, ...rest } = req.body
    const resumeFile = req.file as Express.Multer.File | undefined
    console.log(rest)

    const existingUser = await Applicant.findOne({ email: rest.email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    let resume = {}
    if (resumeFile) {
      const result = await uploadToCloudinary(resumeFile.buffer);
      resume = result;
    }

    await Applicant.create({
      ...rest,
      resume,
      password: hashedPassword
    })

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    })

  } catch (e) {
    console.log(`Error at register controller: ${e}`)
    return res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}


export const loginController = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body

    const user = await Applicant.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }


    const userData: JWTPayload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone
    }

    const token = jwt.sign(userData, process.env.JWT_SECRET as string, { expiresIn: '1d' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 24,
    })

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    })

  } catch (e) {
    console.log(`Error at login controller: ${e}`)
    return res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}