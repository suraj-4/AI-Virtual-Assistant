import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

const UploadOnCloudinary = async (filePath)=> {
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

    // Upload an image
    try{
        const uploadResult = await cloudinary.uploader
        .upload(filePath);
        fs.unlinkSync(filePath);
        return uploadResult.secure_url;

        console.log(uploadResult);
    }catch(error){
        console.log(error);
        fs.unlinkSync(filePath);
        return resizeBy.status(500).json({message : "Cloudinary error"})
    }
}

export default UploadOnCloudinary;