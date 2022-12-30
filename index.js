import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import petRoutes from "./routes/pets.js"
import {register} from "./controllers/auth.js"
import {placePetForAdoption} from "./controllers/pets.js"
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Pet from "./models/Pet.js";
import { users, pets } from "./Data/index.js"

// CONFIGURATIONS (all midleware configs)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register)
app.post("/pets", verifyToken, upload.single("picture"), placePetForAdoption)

// ROUTES
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/pets", petRoutes)


// MONGOOSE SETUP
mongoose.set("strictQuery", false);
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        // Insert DATA ONCE!
        User.insertMany(users)
        Pet.insertMany(pets)
    })
    .catch((error) => console.log(`${error}, Did not connect`));