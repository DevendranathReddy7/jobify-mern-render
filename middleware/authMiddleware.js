import { UnauthenticatedError, UnauthorizedError } from "../errors/CustomErrors.js"
import { verifyJWT } from "../utils/tokenUtils.js"

export const authenticateUser = (req, res, next) => {
    const { token } = req.cookies
    if (!token) throw new UnauthenticatedError('authentication invalid')

    try {
        const { userId, role } = verifyJWT(token)
        req.user = { userId, role }
        next()

    } catch {
        throw new UnauthenticatedError('authentication invalid')
    }
}

export const authorisePermission = async (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('you\'re not authorised')
        }
        next()

    }
}