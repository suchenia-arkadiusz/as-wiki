export const checkToken = (req, res) => {
  return res.status(204).send({ user: req.user });
};
