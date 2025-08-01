import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
import { baseURL } from '../../ApiConfig';

export default Object.freeze({
  uploadAttachmentFile: urlParser([ApiKey.fileUpload, ApiKey.upload]),
  uploadEditFile: (code) => urlParser([ApiKey.fileUpload, ApiKey.edit,code]),
  getFile: (code) => urlParser([ApiKey.fileUpload, code]),
  getFile2: urlParser([ApiKey.fileUpload, ApiKey.All]),
  getFile3: urlParser([ApiKey.fileUpload, ApiKey.All2]),
  getFile4: (id) =>urlParser([ApiKey.fileUpload,ApiKey.user,id]),
  updateQuantity: urlParser([ApiKey.fileUpload, ApiKey.quantity]),
  sendEmail: (code) => urlParser([ApiKey.fileUpload, ApiKey.sendEmail,code]),
  getExcel: urlParser([ApiKey.fileUpload, ApiKey.excelTable]),
});
