import cloudinary from "../auth/cloudinary.js";
export const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder: "user_uploads",
            resource_type: "raw",
        }, (error, result) => {
            if (error)
                return reject(error);
            if (!result) {
                return reject(new Error("Upload failed"));
            }
            resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
            });
        });
        stream.end(fileBuffer);
    });
};
//# sourceMappingURL=cloud.js.map