import { StatusCodes } from "http-status-codes";
import User from "../modals/UserModals.js";
import Job from "../modals/JobModals.js";
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs'

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    const userWoPassword = user.toJSON()
    res.status(StatusCodes.OK).json({ user })
}

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({ users, jobs })
}

export const updateUser = async (req, res) => {
    const newUser = { ...req.body }
    delete newUser.password
    if (req.file) {
        const respnse = await cloudinary.v2.uploader.upload(req.file.path)
        await fs.unlink(req.file.path)
        newUser.avatar = respnse.secure_url
        newUser.avatarPublicId = respnse.public_id
    }
    const updateaUser = await User.findByIdAndUpdate(req.user.userId, newUser)
    if (req.file && updateUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId)
    }
    res.status(StatusCodes.OK).json({ updateUser })
}