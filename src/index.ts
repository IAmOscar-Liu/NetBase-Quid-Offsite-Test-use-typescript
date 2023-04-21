import { checkPostData, getData, setData } from "./controller";
import express from "express";

const PORT = 5000;

const app = express();
app.use(express.json());

app.get("/", getData);
app.post("/", checkPostData, setData);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
