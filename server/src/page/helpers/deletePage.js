import {config} from '../../config/config';
import {log} from '../../config/logger';

export const deletePageById = async (id) => {
  const client = config.dbClient;
  const query = 'SELECT delete_page($1)';

  try {
    await client.query(query, [id]);
    return true;
  } catch (err) {
    log.error({err}, 'Cannot delete page');
  }

  return false;
};
