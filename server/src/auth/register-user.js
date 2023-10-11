import {getUserByUsername} from "./helpers/get-user.js";
import {createUser} from "./helpers/upsert-user.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const {username, password, email, firstName, lastName, avatarURL} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 12);

  const savedUser = await createUser({username, password: encryptedPassword, email, firstName, lastName, avatarURL});

  res.status(200).json(savedUser);
};

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
