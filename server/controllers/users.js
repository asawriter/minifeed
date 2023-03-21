import db from "../db/connectDb.js";

export const getUser = async (req, res, next) => {
    try {
        const [user] = await db.query('Select * from users where id = ?', [req.params.userId])

        return res.status(200).json({message : 'Info user.', user})
    } catch (error) {
        return next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const values = [
            req.body.username,
            req.body.email,
            req.body.profilePic,
            req.params.userId
        ]
        const [updatedUser] = await db.query("UPDATE users SET `username`=?,`email`=?, `profilePic`=? WHERE id= ? ", values)

        return res.status(200).json({message : 'Info user.', updatedUser})
    } catch (error) {
        return next(error)
    }
}
