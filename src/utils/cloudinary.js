import { v2 as cloudinary} from "cloudinary";
import fs from "fs";


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        // file uploaded successfully
        // console.log("File uploaded successfully", response.url);
        fs.unlinkSync(localFilePath); // remove file from local directory as it is uploaded to cloudinary
        return response;
    }
    catch (error) {
        fs.unlinkSync(localFilePath); // remove file from local directory as it is not uploaded to cloudinary
        return null;
    }
}


export default uploadOnCloudinary;






cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});