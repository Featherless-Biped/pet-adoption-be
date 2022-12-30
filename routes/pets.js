import  express  from "express";
import { getAvailablePets, adoptPet } from "../controllers/pets.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

// READ
router.get("/", verifyToken, getAvailablePets)


// UPDATE
router.patch("/:petId/adoption", verifyToken, adoptPet)


export default router