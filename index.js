require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./src/config/db");
const intensityRoute = require("./src/Routes/intensity.routes");
const likelihoodRoute = require("./src/Routes/likelihood.routes");
const relevanceRoute = require("./src/Routes/relevance.routes");
const yearRoute = require("./src/Routes/year.routes");
const countryRoute = require("./src/Routes/country.routes");
const topicsRoute = require("./src/Routes/topics.routes");
const regionRoute = require("./src/Routes/region.routes");
const cityRoute = require("./src/Routes/city.routes");
const Vds = require("./src/Model/vd.model");
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/intensity", intensityRoute);
app.use("/likelihood", likelihoodRoute);
app.use("/relevance", relevanceRoute);
app.use("/year", yearRoute);
// app.use("/country", countryRoute);
// app.use("/topics", topicsRoute);
// app.use("/region", regionRoute);
// app.use("/city", cityRoute);

app.get("/", async (req, res) => {
  let vds = await Vds.find().limit(10);
  res.send(vds);
});

app.listen(PORT, async () => {
  await connect();
  console.log(`Listening On http://localhost:${PORT}`);
});
