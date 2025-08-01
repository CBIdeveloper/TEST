import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
export default Object.freeze({
  getcloudDataEditData: (code) => urlParser([ApiKey.cloudDataEdit, code]),
  getcloudDataEditData2: (code,updatedUserAccountId) => urlParser([ApiKey.cloudDataEdit,ApiKey.cloudDataSearch ,code,updatedUserAccountId]),
  coverData: urlParser([ApiKey.cloudDataEdit, ApiKey.cover]),
  updataData: urlParser([ApiKey.cloudDataEdit, ApiKey.update]),
  log: urlParser([ApiKey.cloudDataEdit, ApiKey.log]),
  getNonReason: (id) => urlParser([ApiKey.cloudDataEdit,ApiKey.log,id])
});
