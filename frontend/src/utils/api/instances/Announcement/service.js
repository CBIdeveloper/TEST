import Router from './router';
import store from '../../../../store/store';

import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import AnnouncementQuery from '../../graphql/Announcement/AnnouncementQuery';
import AnnouncementResponse from '../../../dataModels/Announcement/AnnouncementResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

import FileHelper from '../../../helper/FileHelper';
import ModalHelper from '../../../helper/ModalHelper';
import { setLoading } from '../../../../store/loading/slice';
import { multipartFormData } from '../../ApiHeader';

const readAnnouncement = () =>
  apolloInstance
    .query({
      query: AnnouncementQuery.getAnnouncement,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.announcements.items.map(
        (item) => new AnnouncementResponse(item),
      );
    });

const readAnnouncementById = (id) =>
  apolloInstance
    .query({
      query: AnnouncementQuery.getAnnouncementById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new AnnouncementResponse(data.announcements.items[0]);
    });

const readAnnouncementPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: AnnouncementQuery.getAnnouncementPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.announcements.items.map(
        (item) => new AnnouncementResponse(item),
      );
      return new PaginationResponse({
        ...data.announcements,
        items,
      });
    });

const readAnnouncementQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: AnnouncementQuery.getAnnouncementQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.announcements.items.map(
        (item) => new AnnouncementResponse(item),
      );
      return new PaginationResponse({
        ...data.announcements,
        items,
      });
    });

const createAnnouncement = (body) =>
  postRequest(Router.createAnnouncement, body).then((response) => response);

const updateAnnouncement = (id, body) =>
  putRequest(Router.updateAnnouncement(id), body).then((response) => response);

const deleteAnnouncement = (id, body) =>
  deleteRequest(Router.deleteAnnouncement(id), body).then(
    (response) => response,
  );

const uploadAttachmentFileRecord = (body) =>
  postRequest(Router.uploadAttachmentFile, body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const updateAttachmentFile = (id, body) =>
  postRequest(Router.updateAttachmentFile(id), body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const deleteAttachmentFile = (id) =>
  deleteRequest(Router.deleteAttachmentFile(id)).then((response) => response);

const downloadAttachmentFileRecord = (id) =>
  getRequest(Router.downloadAttachmentFile(id), {
    responseType: 'blob',
  })
    .then((response) => FileHelper.openBlobInTab(response))
    .catch((err) => {
      console.log('service.downloadAttachmentFileRecord Failed', err);  //add by River for shor detaul errmsg
      store.dispatch(setLoading(false));
      ModalHelper.openErrorModal({
        message: '開啟檔案發生問題！',
      });
    });

const attachmentFileLink = (id) => Router.attachmentFileLink(id);

export default {
  readAnnouncement,
  readAnnouncementById,

  readAnnouncementPagination,
  readAnnouncementQueryPagination,

  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,

  uploadAttachmentFileRecord,
  updateAttachmentFile,
  deleteAttachmentFile,
  downloadAttachmentFileRecord,
  attachmentFileLink,
};
