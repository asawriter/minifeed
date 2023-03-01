const {Router} = require('express');
const { isLogin, isLogout } = require('../../auth');
const { comparePw } = require('../../auth/handlePw');
const { registerSchema, loginSchema } = require('../../auth/validation');
const { authorized, guest } = require('../../middlewares/auth');
const { getUserByEmail, createUser } = require('../../services/userService');
const router = Router();

router.post("/register", guest, async(req, res, next) => {
    try {
        const {errors} = await registerSchema.validateAsync(req.body);
        if(errors) return res.status(400).json({message : errors.details[0]?.message});

        const { email, username, password } = req.body;
        if (!email || !username || !password) return res.status(400).json({ message: "Invalid email, username or password" });

        const user = await getUserByEmail(email);
        if(user) return res.status(409).json({message : "Email already registered"})

        const newUser = await createUser(email, username, password);

        await isLogin(req, email);

        return res.status(200).json({ message: "Register successfully", user: newUser });
    } catch (error) {
        return next(error);
    }
})

router.post("/login", async(req, res, next) => {
    try {
        const {errors} = await loginSchema.validateAsync(req.body);
        if(errors) return res.status(400).json({message : errors.details[0]?.message});

        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Invalid email or password" });

        const user = await getUserByEmail(email);
        if(!user) return res.status(404).json({ message: "User not exist" });

        const checkPw = await comparePw(password, user.password);

        if(!checkPw) return res.status(400).json("Password is incorect");

        await isLogin(req, email);

        return res.status(200).json({ message: "Login successfully", user  });
    } catch (error) {
        return next(error);
    }
})

router.post("/logout", authorized, async (req, res, next) => {
    try {
        await isLogout(req, res);

        return res.status(200).json({ message: "Logout successfully"})
    } catch (error) {
        return next(error);
    }
})

module.exports = router;