import {getUserByUsername} from "./helpers/get-user";
import {createUser} from "./helpers/upsert-user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {config} from "../config/config";
import {insertAuthToken} from "./helpers/upsert-auth";

export const registerUser = async (req, res) => {
  const {username, password, email, firstName, lastName, avatarURL} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 12);

  const savedUser = await createUser({username, password: encryptedPassword, email, firstName, lastName, avatarURL});

  const token = generateJWT(savedUser.id, username, email, firstName, lastName)

  await insertAuthToken({userId: savedUser.id, token})

  res.status(201).json(savedUser);
};

const generateJWT = (userId, username, email, firstName, lastName) => jwt.sign(
    {userId, username, email, firstName, lastName},
    config.tokenSecret,
    {
      expiresIn: "1h"
    }
  )

export const validateRegisterInput = async (req, res, next) => {
  const {username, password, email} = req.body;

  if (!(email && username && password)) {
    console.error("VALIDATION ERROR = 'Username', 'Password' and 'e-mail' are mandatory!");
    res.status(400).json({message: "'Username', 'Password' and 'e-mail' are mandatory!"});
    return;
  }

  const existedUser = await getUserByUsername(username);
  if (!!existedUser) {
    console.error("VALIDATION ERROR = User with given username already exists!");
    res.status(409).json({message: "User with given username already exists!"});
    return;
  }

  next();
}
