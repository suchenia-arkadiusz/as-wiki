import { getUserByEmail, getUserByUsername } from "../helpers/getUser";
import { log } from "../../config/logger";

export const validateRegisterInput = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!(email && username && password)) {
    log.error({}, "VALIDATION ERROR = 'Username', 'Password' and 'e-mail' are mandatory!");
    return res.status(400).json({ message: "'Username', 'Password' and 'e-mail' are mandatory!" });
  }

  const existedUser = await getUserByUsername(username);
  const existedEmail = await getUserByEmail(email);
  if (!!existedUser || !!existedEmail) {
    log.error({}, "VALIDATION ERROR = User with given username already exists!");
    return res.status(409).json({ message: "User with given username already exists!" });
  }

  next();
};
