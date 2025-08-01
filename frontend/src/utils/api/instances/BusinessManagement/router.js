import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
import { baseURL } from '../../ApiConfig';

export default Object.freeze({
  createBusinessManagementTest: ApiKey.businessManagementTest,
  createBusinessManagementAnswer: urlParser([ApiKey.businessManagementTest, ApiKey.request, ApiKey.answer]),
  updateBusinessManagementTest: (id) =>
    urlParser([ApiKey.businessManagementTest, id]),
  deleteBusinessManagementTest: (id) =>
    urlParser([ApiKey.businessManagementTest, id]),

  uploadAttachmentFile: urlParser([
    ApiKey.businessManagementTestAttachment,
    ApiKey.upload,
  ]),
  updateAttachmentFile: (id) =>
    urlParser([ApiKey.businessManagementTestAttachment, id]),
  deleteAttachmentFile: (id) =>
    urlParser([ApiKey.businessManagementTestAttachment, id]),
  downloadAttachmentFile: (id) =>
    urlParser([ApiKey.businessManagementTestAttachment, ApiKey.download, id]),
  attachmentFileLink: (id) =>
    urlParser([
      baseURL,
      ApiKey.businessManagementTestAttachment,
      ApiKey.download,
      id,
    ]),

  uploadRespondedAttachmentFile: urlParser([
    ApiKey.businessManagementTestRespondedAttachment,
    ApiKey.upload,
  ]),
  updateRespondedAttachmentFile: (id) =>
    urlParser([ApiKey.businessManagementTestRespondedAttachment, id]),
  deleteRespondedAttachmentFile: (id) =>
    urlParser([ApiKey.businessManagementTestRespondedAttachment, id]),
  downloadRespondedAttachmentFile: (id) =>
    urlParser([
      ApiKey.businessManagementTestRespondedAttachment,
      ApiKey.download,
      id,
    ]),
  respondedAttachmentFileLink: (id) =>
    urlParser([
      baseURL,
      ApiKey.businessManagementTestRespondedAttachment,
      ApiKey.download,
      id,
    ]),

  getResponsibleBusinessManagementInfoList: urlParser([
    ApiKey.businessManagementTest,
    ApiKey.getResponsibleBusinessManagementInfoList,
  ]),

  signDiffCount: (id) =>
    urlParser([
      ApiKey.businessManagementTestSign,
      ApiKey.signDiffCount,
      id,
    ]),
  createBusinessManagementTestSign: (id) =>
    urlParser([ApiKey.businessManagementTestSign, id]),
  updateTopicEffect: urlParser([
    ApiKey.businessManagementTest,
    ApiKey.topic,
    ApiKey.effect,
  ]),
});
