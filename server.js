import express from "express";
import path from "path";
import { inputCleaner, inputValidator } from "./middleware.js";

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("./form");
});

app.get("/form", (req, res) => {
    res.sendFile(path.resolve("public/form.html"));
});

app.post(
    "/submit",
    inputCleaner,
    inputValidator,
    (req, res) => {
        res.json({
            username: req.body.username,
            comment: req.body.comment
        });
    }
);



app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});