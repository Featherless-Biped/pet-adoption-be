import Pet from "../models/Pet.js";
import User from "../models/User.js";

// CREATE (PUT UP PET FOR ADOPTION)
export const placePetForAdoption = async (req, res) => {
    try {
        const {
            petName,
            type,
            breed,
            adoptionStatus,
            picturePath,
            height,
            weight,
            color,
            shortBio,
            hypoallergenic,
            dietaryRestriction,
            
        } = req.body;
        
        const newPet = new Pet({
            
            petName,
            type,
            breed,
            adoptionStatus,
            picturePath,
            height,
            weight,
            color,
            shortBio,
            hypoallergenic,
            dietaryRestriction,
            
        });
        const savedPet = await newPet.save();
        res.status(201).json(savedPet);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

// READ (GET PETS UP FOR ADOPTION)
export const getAvailablePets = async (req, res) => {
    try {
        const pet = await Pet.find();
        res.status(200).json(pet);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


// UPDATE ADOPT/ABANDON (Sorry for the wording) PET

export const adoptPet = async (req, res) => {
    try{
        const {id} = req.params
        const {petId} = req.body
        const petOwner = await User.findById(id)
        const isAdopted = petOwner.ownedPets.get(petId)
        if (isAdopted) {
            petOwner.ownedPets.delete(petId)
        } else {
            petOwner.ownedPets.set(petId, true)
        }

        const updatedPetStatus = await User.findByIdAndUpdate(
            id,
            {ownedPets: petId},
            {new: true}
        )

        res.status(200).json(updatedPetStatus)
    } catch (err) {
        res.status(404).json({ message: err.message });

    }
}