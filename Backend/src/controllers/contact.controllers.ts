import { type Request, type Response } from "express";
import * as contactService from "../services/service.js";
import { error } from "console";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const getContacts = async (req: Request, res: Response) => {
  try {
    const {skip,limit} = (req as any).pagination;
    const contacts = await contactService.getAllContacts(skip,limit);
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

  export const getsearchdataHandler = async (req:Request , res:Response)=>{
    const name = typeof req.query.name ==='string'?req.query.name:undefined;
    const filter = typeof req.query.filter === 'string'?req.query.filter:undefined 
    const {page,limit ,skip}  = (req as any).pagination;
    try{
      const {data,total} = await contactService.getsearchdata(name , filter ,skip , limit);
      res.json({data,total});
    }catch(err){
      res.status(500).json({err:"Error from getsearchdata"})
    }
  }

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, phoneno, address, label, imgsrc } = req.body;
    const newContact = await contactService.insertUser(
      name,
      phoneno,
      address,
      label,
      imgsrc
    );
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteData = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deleteData = await contactService.deleteData(id);
    res.status(201).json(deleteData);
  } catch (err) {
    console.log(error);
    console.log(error);
    res.status(500).json({ error: "not able to delete data" });
  }
};

export const editData = async (req: Request, res: Response) => {
  try {
    const { id, name, phoneno, address, label } = req.body;
    const updatedata = await contactService.editdata(
      id,
      phoneno,
      name,
      label,
      address
    );
    res.status(201).json(updatedata);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "not abel to update data" });
  }
};

export const uploadImageHandler = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "contacts" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          if (!result?.secure_url) {
            return reject(new Error("No URL returned from Cloudinary"));
          }
          resolve(result.secure_url);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Image upload failed" });
  }
};

export const changeBookmarkHandler = async(req:Request,res:Response)=>{
  const id = req.body.id;
  const bookstatus = await contactService.changeBookmark(id);
  return res.status(200).json({bookstatus});
}








