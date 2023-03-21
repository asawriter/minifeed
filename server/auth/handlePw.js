import bcrypt from "bcryptjs"

export const hashPw = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pw, salt);
}

export const comparePw = async (raw, pw) => await bcrypt.compare(raw, pw);
