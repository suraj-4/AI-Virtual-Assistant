import UploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId; // ✅ should come from auth middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - no user ID" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(500).json({ message: "Server error while getting current user" });
  }
};

export const updateAssistant = async (req, res) => {
  try{
    const {assistantName, imageUrl} = req.body;
    let assistantImage;
    if(req.file){
      assistantImage = await UploadOnCloudinary(req.file.path);
    }else{
      assistantImage = imageUrl;
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    return res.status(200).json(user);

  }catch(error){
    console.error("Update assistant error:", error);
    return res.status(500).json({ message: "Server error while updating assistant" });
  }
};