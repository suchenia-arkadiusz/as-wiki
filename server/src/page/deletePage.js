import {deletePageById} from './helpers/deletePage';

export const deletePage = async (req, res) => {
  const {pageId} = req.params;
  const isDeleted = await deletePageById(pageId);
  if (isDeleted) {
    return res.status(204).send({message: 'Page deleted successfully'});
  } else {
    return res.status(404).send({message: 'Page not found'});
  }
};
