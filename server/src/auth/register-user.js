import { createUser } from "./helpers/upsert-user";
import bcrypt from "bcryptjs";
import { generateJWT } from "./utils/generate-jwt";
import { refreshToken } from "./refresh-token";

export const registerUser = async (req, res) => {
  const { username, password, email, firstName, lastName, avatarURL } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 12);

  const savedUser = await createUser({ username, password: encryptedPassword, email, firstName, lastName, avatarURL });

  const user = { userId: savedUser.id, username, email, firstName, lastName, avatarURL };

  const token = generateJWT(user);
  const refreshToken = generateJWT(user, "1d");

  res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" }).header("Authorization", token).send(user);
};
