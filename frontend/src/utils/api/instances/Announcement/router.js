import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
import { baseURL } from '../../ApiConfig';

export default Object.freeze({
  createAnnouncement: ApiKey.announcement,
  updateAnnouncement: (id) => urlParser([ApiKey.announcement, id]),
  deleteAnnouncement: (id) => urlParser([ApiKey.announcement, id]),

  uploadAttachmentFile: urlParser([
    ApiKey.announcementAttachment,
    ApiKey.upload,
  ]),
  updateAttachmentFile: (id) => urlParser([ApiKey.announcementAttachment, id]),
  deleteAttachmentFile: (id) => urlParser([ApiKey.announcementAttachment, id]),
  downloadAttachmentFile: (id) =>
    urlParser([ApiKey.announcementAttachment, ApiKey.download, id]),
  attachmentFileLink: (id) =>
    urlParser([baseURL, ApiKey.announcementAttachment, ApiKey.download, id]),
});
