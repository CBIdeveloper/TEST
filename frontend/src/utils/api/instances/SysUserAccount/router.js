import ApiKey from '../../ApiKey';
import { baseURL } from '../../ApiConfig';

import urlParser from '../../../parsers/urlParser';
import { createQuery } from '../../../parsers/queryParser';

export default Object.freeze({
  createSysUserAccount: ApiKey.sysUserAccount,
  applySysUserAccount: urlParser([ApiKey.sysUserAccount, ApiKey.apply]),
  updateSysUserAccount: (id) => urlParser([ApiKey.sysUserAccount, id]),
  updateSysUserAccountWithRemark: (id) =>
    urlParser([ApiKey.sysUserAccount, ApiKey.withRemark, id]),
  deleteSysUserAccount: (id) => urlParser([ApiKey.sysUserAccount, id]),
  approveSysUserAccount: (id) =>
    urlParser([ApiKey.sysUserAccount, ApiKey.approval, id]),
  changePassword: (id) =>
    urlParser([ApiKey.sysUserAccount, ApiKey.changeVerificationString, id]),
  changeSysUserState: (id) =>
    urlParser([ApiKey.sysUserAccount, ApiKey.state, id]),

  uploadAttachmentFile: urlParser([
    ApiKey.sysUserAccountAppliedAttachment,
    ApiKey.upload,
  ]),
  updateAttachmentFile: (id) =>
    urlParser([ApiKey.sysUserAccountAppliedAttachment, id]),
  deleteAttachmentFile: (id) =>
    urlParser([ApiKey.sysUserAccountAppliedAttachment, id]),
  downloadAttachmentFile: (id) =>
    urlParser([ApiKey.sysUserAccountAppliedAttachment, ApiKey.download, id]),
  attachmentFileLink: (id) =>
    urlParser([
      baseURL,
      ApiKey.sysUserAccountAppliedAttachment,
      ApiKey.download,
      id,
    ]),

  getAppliedStatus: ({ identityNumber, name, captchaCode }) => {
    const query = createQuery({
      [ApiKey.identityNumber]: identityNumber,
      [ApiKey.name]: name,
      [ApiKey.captchaCode]: captchaCode,
    });
    const path = urlParser([ApiKey.sysUserAccount, ApiKey.appliedStatus]);
    return `${path}${query}`;
  },
  getSysUserAccountBraidingCategory: () =>
    urlParser([ApiKey.sysUserAccount, ApiKey.braidingCategory]),
  getcloudDataEditId: (id) => urlParser([ApiKey.sysUserAccount, id]),
  getcloudDataEditId2: (id) => urlParser([ApiKey.sysUserAccount, 2, id]),
  getContactUser: urlParser([ApiKey.sysUserAccount, ApiKey.contact]),
});
