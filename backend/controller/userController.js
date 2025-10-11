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
