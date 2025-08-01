import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
import { baseURL } from '../../ApiConfig';

export default Object.freeze({
  createMobilizationProgram: urlParser([
    ApiKey.planMobilizationProgram,
    ApiKey.upload,
  ]),
  updateMobilizationProgram: (id) =>
    urlParser([ApiKey.planMobilizationProgram, id]),
  updateMobilizationProgramWithoutFile: (id) =>
    urlParser([ApiKey.planMobilizationProgram, ApiKey.withoutFile, id]),
  deleteMobilizationProgram: (id) =>
    urlParser([ApiKey.planMobilizationProgram, id]),
  downloadMobilizationProgram: (id) =>
    urlParser([ApiKey.planMobilizationProgram, ApiKey.download, id]),
  mobilizationProgramFileLink: (id) =>
    urlParser([baseURL, ApiKey.planMobilizationProgram, ApiKey.download, id]),
});
