import { getUserByUsername } from "./helpers/get-user";
import bcrypt from "bcryptjs";
import { generateJWT } from "./utils/generate-jwt";

export const loginUser = async (req, res) => {
  const { username, password: userPassword } = req.body;
  const user = await getUserByUsername(username);

  if (!user || !(await isPasswordMatched(userPassword, user.password)))
    return res.status(401).json({ message: "Invalid username or password" });

  const { password, ...responseUser } = user;
  const token = generateJWT({ userId: user.id, ...user });
  const refreshToken = generateJWT({ userId: user.id, ...user }, "1d");

  res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" }).header("Authorization", token).send(responseUser);
};

const isPasswordMatched = async (password, storedPassword) => await bcrypt.compare(password, storedPassword);
