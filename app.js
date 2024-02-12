require("dotenv").config();
const jsonServer = require("json-server");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, "/public"),
});
console.log(path.join(__dirname, "/public"));
const PORT = process.env.PORT;

server.use(middlewares);
server.use(morgan("dev"));
server.use((req, res, next) => {
  // Middleware to disable CORS
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
server.get("/", (req, res) => {
  const jsonData = JSON.parse(fs.readFileSync("db.json", "utf8"));
  res.json(jsonData);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running at port ${PORT}`);
});
