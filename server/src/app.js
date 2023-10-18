import express from "express";
import {dbConnect} from "./db/connect";
import {config} from "./config/config";
import {routes} from "./routes";

const app = express();
app.use(express.json())

const db = dbConnect(config.db);

config.dbClient = db;

const addRoutes = () => {
  const appRoutes = routes();
  appRoutes.forEach(route => app.use(route.prefix, route.route))
}

const query = `SELECT * FROM "USERS"`;
db.query(query, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res.rows);
})

addRoutes();


app.listen(3000, () => {
  console.log("The asWiki app is started!");
})

