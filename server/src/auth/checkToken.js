export const checkToken = (req, res) => {
  return res.status(200).send({ user: req.user });
};
