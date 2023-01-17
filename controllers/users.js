import User from "../models/User.js";
import Pet from "../models/Pet.js";

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserPets = async (req, res) => {
    try {
        // const { id } = req.params;
        // const user = await User.findById(id);
        // const pets = await Promise.all(user.pets.map((id) => Pet.findById(id)));
        // const formattedPets = pets.map(
        //     ({
        //         _id,
        //         petName,
        //         type,
        //         adoptionStatus,
        //         picturePath,
        //         height,
        //         weight,
        //         color,
        //         bio,
        //         hypoallergenic,
        //         dietaryRestriction,
        //         breed,
        //     }) => {
        //         return {
        //             _id,
        //             petName,
        //             type,
        //             adoptionStatus,
        //             picturePath,
        //             height,
        //             weight,
        //             color,
        //             bio,
        //             hypoallergenic,
        //             dietaryRestriction,
        //             breed,
        //         };
        //     }
        // );
        // res.status(200).json(formattedPets)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// UPDATE

export const addRemovePets = async (req, res) => {
    try {
        const { id, petsId } = req.params;
        const user = await User.findById(id);
        const pet = await Pet.findById(petsId);
        if (user.ownedPets.includes(petsId)) {
            user.ownedPets = user.pets.filter((id) => id !== petsId)
        } else {
            user.ownedPets.push(petsId)
        }
        await user.save()
        const pets = await Promise.all(user.pets.map((id) => Pet.findById(id)));
        const formattedPets = pets.map(
            ({
                _id,
                petName,
                type,
                adoptionStatus,
                picturePath,
                height,
                weight,
                color,
                bio,
                hypoallergenic,
                dietaryRestriction,
                breed,
            }) => {
                return {
                    _id,
                    petName,
                    type,
                    adoptionStatus,
                    picturePath,
                    height,
                    weight,
                    color,
                    bio,
                    hypoallergenic,
                    dietaryRestriction,
                    breed,
                };
            }
        );
        res.status(200).json(formattedPets)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
