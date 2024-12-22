import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import router from "./src/router/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import "./src/passport.js";

const app = express();

dotenv.config();
export const config = {
  runtime: 'edge',
};
const PORT = process.env.PORT || process.env.URL_API;
const URI_DB = process.env.URI_DB;
connect(URI_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,  
  socketTimeoutMS: 10000 
   
});



app.use(cors({
  origin: process.env.URL_CLIENT || process.env.URL
}));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
