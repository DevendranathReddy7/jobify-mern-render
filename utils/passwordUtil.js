import bcrypt from "bcryptjs"

export const hashpassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt)
    return hashedPwd

}

export const comparePassword = async (pswd, hashpassword) => {
    const isMatch = await bcrypt.compare(pswd, hashpassword)
    return isMatch
}