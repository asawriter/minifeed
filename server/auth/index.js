import { SESSION_NAME } from "../configs/index.js"

export const isLogin = async (req, data) => {
    if(!req.session?.user){
        req.session.user = {
            userId : data.id,
            username : data.username,
            createdAt : new Date(Date.now())
        }
    }
}

export const isLogout = async (req, res) => new Promise((resolve, reject) => {
    req.session?.destroy((err) => {
        if(err) reject(err)

        res.clearCookie(SESSION_NAME)

        resolve()
    })
})
