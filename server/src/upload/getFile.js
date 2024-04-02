import {getFileById} from './helpers/getFileById';

export const getFile = async (req, res) => {
  const {id} = req.params;

  const file = await getFileById(id);

  if (!file) {
    return res.status(404).send();
  }

  res.setHeader('Content-Type', file.type);
  res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
  res.send(file.content);
};
