import  express  from "express";
import  verify  from "jsonwebtoken";
import {getUser, getUserPets, addRemovePets,} from "../controllers/users.js"
import {verifyToken} from "../middleware/auth.js"


const router = express.Router()

// READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/pets", verifyToken, getUserPets)

// Update
router.patch("/:id/:petID", verifyToken, addRemovePets)

export default router