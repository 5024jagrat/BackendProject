import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//unlink files are linked if we delete the file os automatically unlink that

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    console.log("File is uploaded on cloudinary");
    console.log(response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};
cloudinary.v2.uploader.upload(
  "https://media.istockphoto.com/id/1336646871/photo/teenagers-practicing-soccer-in-sports-field.jpg?s=1024x1024&w=is&k=20&c=OfkE69sW5uFcSv9H2bo7jfXIAfon-xPJd1vt23K6W5M=",
  {
    public_id: "football_picture",
  },
  function (error, result) {
    console.log(result);
  }
);

// https://media.istockphoto.com/id/1336646871/photo/teenagers-practicing-soccer-in-sports-field.jpg?s=1024x1024&w=is&k=20&c=OfkE69sW5uFcSv9H2bo7jfXIAfon-xPJd1vt23K6W5M=
