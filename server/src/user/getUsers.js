import { getAllUsers } from "./helpers/getAllUsers";
import { log } from "../config/logger";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    log.warn({ err }, "Cannot get users");
    res.status(500).send({ message: "Cannot get users" });
  }
};
