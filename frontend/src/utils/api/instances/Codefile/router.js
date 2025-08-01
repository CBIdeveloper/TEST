import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createCodefile: ApiKey.codefile,
  updateCodefile: (id) => urlParser([ApiKey.codefile, id]),
  deleteCodefile: (id) => urlParser([ApiKey.codefile, id]),
  getMilitarylevelList: urlParser([ApiKey.codefile, ApiKey.militarylevelList]),
  getMilitaryAgencyList: urlParser([ApiKey.codefile, ApiKey.militaryAgencyList]),
  getMeetingTypeList: urlParser([ApiKey.codefile, ApiKey.meetingTypeList]),
});
