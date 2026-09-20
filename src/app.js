const express = require("express");
const app = express();
app.use(express.json());
const routes = require("./routes");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");
app.get("/",(req,res)=>{
     // console.log("niitn===>",req.body)
      res.json({
        success: true,
        message: "API Platform is running",
    });
})

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);
module.exports = app;