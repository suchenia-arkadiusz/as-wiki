import {searchPagesFromDB} from './helpers/searchPages';

export const searchPages = async (req, res) => {
  const { searchTerm } = req.query;

  if (!searchTerm || searchTerm.length === 0) return res.status(200).send([]);

  const result = await searchPagesFromDB(searchTerm);

  return res.status(200).send(result);
};
