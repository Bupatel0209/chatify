import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {connectDB} from "./lib/db.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//make ready for deployment
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
}); 
};
app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  connectDB();
});

//mongodb+srv://bhagwat292003_db_user:kC2ueWO1oASsGuIS@cluster0.s6pl0s5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0