import { getUserByUsername } from "./helpers/getUser";
import bcrypt from "bcryptjs";
import { generateJWT } from "./utils/generateJWT";
import { log } from "../config/logger";

export const loginUser = async (req, res) => {
  const { username, password: userPassword } = req.body;

  const user = await getUserByUsername(username);
  if (!user) return res.status(401).json({ message: "Invalid username or password" });

  try {
    if (!(await isPasswordMatched(userPassword, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    log.warn({ err }, "Error during password validation");
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const { password: _pass, ...responseUser } = user;
  const token = generateJWT({ userId: user.id, ...user });
  const refreshToken = generateJWT({ userId: user.id, ...user }, "1d");

  res.send({ user: responseUser, jwt: token, refreshToken });
};

const isPasswordMatched = async (password, storedPassword) => await bcrypt.compare(password, storedPassword);
