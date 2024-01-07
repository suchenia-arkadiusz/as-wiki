import { createUser } from "./helpers/upsertUser";
import bcrypt from "bcryptjs";
import { generateJWT } from "./utils/generateJWT";

export const registerUser = async (req, res) => {
  const { username, password, email, firstName, lastName, avatarURL, userGroup } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 12);

  const savedUser = await createUser({ username, password: encryptedPassword, email, firstName, lastName, avatarURL }, userGroup);
  if (!savedUser) return res.status(500).send({ message: "Cannot create user" });

  const user = { id: savedUser.id, username, email, firstName, lastName, avatarURL, userGroups: savedUser.userGroups };

  const token = generateJWT(user);
  const refreshToken = generateJWT(user, "1d");

  res
    .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" })
    .cookie("jwt", token, { httpOnly: true, sameSite: "strict", secure: true })
    .header("authorization", token)
    .send(user);
};
