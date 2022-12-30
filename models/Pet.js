import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
    {
        name: {
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
            type: String,
            required: true,
        },
        height: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        color: {
            type: String,
        },
        bio: {
            type: String,
            default: "",
        },
        hypoallergenic: {
            type: Boolean,
            default: false,
            required: true,
        },
        dietaryRestriction: {
            type: Array,
            default: [],
        },
        breed: {
            type: String,
        },
    },
    { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);

export default Pet;
