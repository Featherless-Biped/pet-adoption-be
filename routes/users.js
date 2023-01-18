import  express  from "express";
import  verify  from "jsonwebtoken";
import {getUser, getUserPets, addRemovePets, getUsers} from "../controllers/users.js"
import {verifyToken} from "../middleware/auth.js"


const router = express.Router()

// READ
router.get("/", verifyToken, getUsers)
router.get("/:id", verifyToken, getUser);
router.get("/:id/ownedPets", verifyToken, getUser)

// Update
router.patch("/:id/:petID", verifyToken, addRemovePets)

export default router