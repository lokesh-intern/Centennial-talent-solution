import React, { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { 
   ArrowRight, 
  CheckCircle2, Loader2, ShieldCheck, User, Upload
} from "lucide-react";
import { Link } from "react-router-dom";
import { registerApi } from "../api/applicantApi";
import type { RegisterData } from "../types/registerTypes";

interface FormErrors {
  [key: string]: string | undefined;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    resume: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- Validation ---
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.name.trim().length < 2) newErrors.name = "Name is too short!";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format. 📧";
    if (formData.password.length < 8) newErrors.password = "Security first! 8+ characters please.";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "We need exactly 10 digits. 📱";
    if (formData.address.trim().length < 5) newErrors.address = "Address is a bit too vague.";
    if (!formData.resume) newErrors.resume = "Please upload your resume! 📄";

    setErrors(newErrors);
    const len = Object.keys(newErrors).length;
    return len === 0;
  };

  // --- Handlers ---
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "resume" && files) {
      const selectedFile = files[0];
      if (selectedFile && selectedFile.type !== "application/pdf") {
        setErrors(prev => ({ ...prev, resume: "Only PDF files are allowed! 🛑" }));
        return;
      }
      setFormData((prev) => ({ ...prev, resume: selectedFile }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRegister = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      alert(errors.phone || errors.name || errors.email || errors.password || errors.address || errors.resume);
      return;
    }

    setIsLoading(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("name",formData.name);
      dataToSend.append("email", formData.email);
      dataToSend.append("password", formData.password);
      dataToSend.append("address", formData.address);
      dataToSend.append("phone", formData.phone);
      dataToSend.append("resume", formData.resume || "");
      const response = await registerApi(dataToSend);
      if(response.success){
        alert(response.message || "Something went wrong. Try again");
      }
 
      setIsSuccess(true);
    } catch (err) {
      console.error(`System error during registration: ${err}`);
      setErrors(prev => ({ ...prev, form: "Something went wrong. Try again" }));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-emerald-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-emerald-600 w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-balance">Profile Registered!</h2>
          <p className="text-slate-500 mb-8">Your professional journey starts here. Login to continue</p>
          <Link to="/"> 
            <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Left Section: Branding */}
        <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-16 text-white relative">
          <div className="z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-500/20">C</div>
              <span className="text-2xl font-bold tracking-tight">Centennial Talent</span>
            </div>
            <h1 className="text-6xl font-extrabold leading-tight mb-8">
              Secure your <br />
              <span className="text-blue-500">Future</span> <br />
              today.
            </h1>
            <p className="text-slate-400 max-w-sm text-xl leading-relaxed">
              Join the elite circle of professionals building the next generation of business systems.
            </p>
          </div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        {/* Right Section: Form */}
        <div className="p-8 lg:p-16 overflow-y-auto">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Register</h2>
            <p className="text-slate-500 font-medium">Join us. It only takes a minute.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  name="name" type="text" value={formData.name} onChange={handleChange}
                  placeholder="Rahul Sharma"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 font-bold ml-2">{errors.name}</p>}
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Work Email</label>
                <input 
                  name="email" type="email" value={formData.email} onChange={handleChange}
                  placeholder="rahul@company.com"
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Phone</label>
                <input 
                  name="phone" type="tel" value={formData.phone} onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            {/* Address & Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Location / Address</label>
              <input 
                name="address" type="text" value={formData.address} onChange={handleChange}
                placeholder="Vizag, Andhra Pradesh"
                className="w-full px-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Create Password</label>
              <input 
                name="password" type="password" value={formData.password} onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* 📄 RESUME UPLOAD (The Better Field) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Resume (PDF only)</label>
              <div className="relative group">
                <label className={`w-full flex items-center justify-between px-4 py-4 bg-slate-50 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${formData.resume ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 hover:border-blue-400'}`}>
                  <div className="flex items-center gap-3">
                    {formData.resume ? <CheckCircle2 className="text-emerald-500" size={20}/> : <Upload className="text-slate-400" size={20}/>}
                    <span className={`text-sm font-medium ${formData.resume ? 'text-emerald-700' : 'text-slate-500'}`}>
                      {formData.resume ? formData.resume.name : "Choose PDF file (Max 5MB)..."}
                    </span>
                  </div>
                  <input name="resume" type="file" accept=".pdf" onChange={handleChange} className="hidden" />
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">BROWSE</span>
                </label>
              </div>
              {errors.resume && <p className="text-xs text-red-500 font-bold ml-2">{errors.resume}</p>}
            </div>

            <button
              type="submit" disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 mt-4 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] disabled:bg-blue-300"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : <>Create Account <ArrowRight size={20} /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-semibold">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline underline-offset-4">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;