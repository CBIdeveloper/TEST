import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
import { baseURL } from '../../ApiConfig';

export default Object.freeze({
  createMobilizationExecution: urlParser([
    ApiKey.planMobilizationExecution,
    ApiKey.upload,
  ]),
  updateMobilizationExecution: (id) =>
    urlParser([ApiKey.planMobilizationExecution, id]),
  updateMobilizationExecutionWithoutFile: (id) =>
    urlParser([ApiKey.planMobilizationExecution, ApiKey.withoutFile, id]),
  deleteMobilizationExecution: (id) =>
    urlParser([ApiKey.planMobilizationExecution, id]),
  downloadMobilizationExecution: (id) =>
    urlParser([ApiKey.planMobilizationExecution, ApiKey.download, id]),
  mobilizationExecutionFileLink: (id) =>
    urlParser([baseURL, ApiKey.planMobilizationExecution, ApiKey.download, id]),
});
