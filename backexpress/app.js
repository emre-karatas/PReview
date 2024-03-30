require("dotenv").config();

const express = require('express');
const cors = require("cors");
const errorHandler = require("./middlewares/errorhandler");
const algos = require("./algos/controller");
const port = '8080';
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(function (req, res, next) {

  var allowedDomains = ['http://localhost:3000'];
  var origin = req.headers.origin;
  
  if(allowedDomains.indexOf(origin) > -1){ res.setHeader('Access-Control-Allow-Origin', '*'); }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
})

app.use("/api", router);
app.use(errorHandler);

router.use("/algos", algos);
router.get("/test", (req, res) => {
  console.log("Hello world");
  return res.status(200).send("Hello the world");
});

app.use(express.static("public"));
app.listen(port, () => {console.log(`Server is running on port ${port}`); });
