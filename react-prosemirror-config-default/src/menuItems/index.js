import marks from './marks';
import blocks from './blocks';
import inserts from './inserts';
import history from './history';

const items = { marks, blocks, inserts, history };

export default (docType, schema) => (itemsCategory) => {
  let { generic, htmlSpecific } = items[itemsCategory];

  return docType === 'html' ? Object.assign(generic(schema), htmlSpecific(schema)) : generic(schema);
}
