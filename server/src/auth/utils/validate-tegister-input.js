import { getUserByUsername } from "../helpers/get-user";

export const validateRegisterInput = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!(email && username && password)) {
    console.error("VALIDATION ERROR = 'Username', 'Password' and 'e-mail' are mandatory!");
    res.status(400).json({ message: "'Username', 'Password' and 'e-mail' are mandatory!" });
    return;
  }

  const existedUser = await getUserByUsername(username);
  if (!!existedUser) {
    console.error("VALIDATION ERROR = User with given username already exists!");
    res.status(409).json({ message: "User with given username already exists!" });
    return;
  }

  next();
};
