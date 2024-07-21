import express, { Express } from "express";
import dotenv from "dotenv";
import { authRoute, userRoute, walletRoute } from "./routes";
import cors from "cors";

// Allows cross origin
const allowedOrigins = ['http://localhost:5173'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(options))

// Route initialization
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/wallet", walletRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
