import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
    {
        petName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        type: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        picturePath: {
            type: String,
            default: "",
        },
        adoptionStatus: {
            type: Boolean,
            default: false,
            required: true,
        },
        height: {
            type: String,
        },
        weight: {
            type: String,
        },
        color: {
            type: String,
        },
        shortBio: {
            type: String,
            default: "",
        },
        hypoallergenic: {
            type: Boolean,
            default: false,
            required: true,
        },
        dietaryRestriction: {
            type: String,
            default: "None",
        },
        breed: {
            type: String,
        },
    },
    { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);

export default Pet;
