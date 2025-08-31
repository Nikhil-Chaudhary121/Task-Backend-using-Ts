import { Router } from "express";
import { signup, login, getUser } from "../controller/auth.controller";
import passport from "../config/passport";

const router = Router();

router.get("/getuser/:id", getUser)

// POST /api/auth/signup
router.post("/signup", signup);

// POST /api/auth/login
router.post("/login", login);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const { token, user } = req.user as any;
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}&userId=${user._id}`);
  }
);

export default router;
