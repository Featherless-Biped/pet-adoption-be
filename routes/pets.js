import  express  from "express";
import { getAvailablePets, adoptPet, getSpecificPet} from "../controllers/pets.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

// READ
router.get("/",  getAvailablePets)
router.get("/:id",  getSpecificPet)

//  CREATE PET
// router.patch("/", placePetForAdoption)

// UPDATE
router.patch("/:petId/adoptionStatus", verifyToken, adoptPet)


export default router