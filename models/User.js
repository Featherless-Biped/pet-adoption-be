import mongoose from "mongoose";
// import {isEmail} from "validator/lib/isEmail";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: [true, "Please enter an email"],
            lowercase: true,
            max: 50,
            unique: true,
            // validate: [isEmail, "Please enter a valid email"],
        },
        password: {
            type: String,
            // required: [true, "Please enter a password"],
            // min: [6, "Minimum password length is 6 characters"],
            // max: 50,
        },
        picturePath: {
            type: String,
            default: "",
        },
        ownedPets: {
            type: Array,
            default: [],
        },
        phoneNumber: {
            type: String,
        },
        administrator: {
            type: Boolean,
        },
        shortBio: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
