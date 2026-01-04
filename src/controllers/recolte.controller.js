import asyncHandler from "express-async-handler";
import Recolte from "../models/recoltes.models.js";
import User from "../models/user.model.js";
import { getAuth } from "@clerk/express";
import cloudinary from "../config/cloudinary.js";





export const createRecoltePost = asyncHandler(async (req, res) => {
  // 1. Récupération de l'utilisateur Clerk
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await User.findOne({ clerkId: userId });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // 2. Données reçues
  const {
    images = [],
    title,
    phone,
    description,
    price,
    category,
    quantity,
    city,
    country,
  } = req.body;

  if (!Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: "Images are required" });
  }

  // 3. Upload Cloudinary
  const imageUploads = await Promise.all(
    images.map((image) =>
      cloudinary.uploader.upload(image, {
        folder: "recoltes",
      })
    )
  );

  const imagesUrls = imageUploads.map((img) => img.secure_url);

  // 4. Création de la récolte
  const recolte = await Recolte.create({
    user: user._id,
    images: imagesUrls,
    title,
    phone,
    description,
    price,
    category,
    quantity,
    city,
    country,
  });

  // 5. Réponse
  res.status(201).json({
    success: true,
    recolte,
  });
});






export const getRecoltePosts = asyncHandler(async (req, res) => {
        const recoltes = await Recolte.find()
            .sort({ createdAt: -1 })
            .populate("user", "username firstName lastName profilePicture")
         
    
        res.status(200).json({ recoltes });
    });






export const getMyRecoltePost = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });
    const recoltes = await Recolte.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user", "username firstName lastName profilePicture")
     
  
    res.status(200).json({ recoltes });
  });


  export const deleteRecoltePost = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const { recolteId } = req.params;
  
    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });
  
    const recolte = await Recolte.findById(recolteId);
  
    if (!recolte) return res.status(404).json({ error: "Recolte not found" });
  
    if (recolte.user.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "You can only delete your own recolte posts" });
    }
  
    // delete the recolte
    await Recolte.findByIdAndDelete(recolteId);
  
    res.status(200).json({ message: "Recolte deleted successfully" });
  });



  



  

  




  

