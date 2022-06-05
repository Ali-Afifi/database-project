const express = require("express");
const apiRouter = require("./routes/api");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", apiRouter);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));