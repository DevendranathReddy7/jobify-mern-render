import { StatusCodes } from "http-status-codes"
import User from "../modals/UserModals.js"
import { comparePassword, hashpassword } from "../utils/passwordUtil.js"
import { UnauthenticatedError } from "../errors/CustomErrors.js"
import { createJWT } from "../utils/tokenUtils.js"

export const register = async (req, res) => {
    const isFirst = (await User.countDocuments()) === 0
    req.body.role = isFirst ? 'admin' : 'user'

    const hashedPwd = await hashpassword(req.body.password)
    req.body.password = hashedPwd

    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: 'user created' })
}

export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const isMatch = user && await comparePassword(req.body.password, user.password)
    if (!isMatch) throw new UnauthenticatedError('invalid credentials')
    const token = createJWT({ userId: user._id, role: user.role })

    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged in' })

}

export const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({ msg: 'you\'ve have been logged out!' })
}

