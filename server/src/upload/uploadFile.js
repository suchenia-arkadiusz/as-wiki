import {createAttachment} from './helpers/createAttachment';

export const uploadFile = async (req, res) => {
  const uploadedFile = await createAttachment(req.files.file);

  if (!uploadedFile) {
    return res.status(500).send();
  }

  res.status(200).send({id: uploadedFile});
};
