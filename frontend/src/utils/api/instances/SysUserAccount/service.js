import Router from './router';
import store from '../../../../store/store';
import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import SysUserAccountQuery from '../../graphql/SysUserAccount/SysUserAccountQuery';
import SysUserAccountResponse from '../../../dataModels/SysUserAccount/SysUserAccountResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import AppliedStatusResponse from '../../../dataModels/SysUserAccount/AppliedStatusResponse';

import { setLoading } from '../../../../store/loading/slice';

import FileHelper from '../../../helper/FileHelper';
import ModalHelper from '../../../helper/ModalHelper';
import { multipartFormData } from '../../ApiHeader';

const readSysUserAccount = () =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getSysUserAccount,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.sysUserAccounts.items.map(
        (item) => new SysUserAccountResponse(item),
      );
    });

const readSysUserAccountById = (id) =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getSysUserAccountById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new SysUserAccountResponse(data.sysUserAccounts.items[0]);
    });

const readSysUserAccountByFirstLevelAgency = (id) =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getSysUserAccountByFirstLevelAgency(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.sysUserAccounts.items.map(
        (item) => new SysUserAccountResponse(item),
      );
    });

const readSysUserAccountBySecondaryAgency = (id) =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getSysUserAccountBySecondaryAgency(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.sysUserAccounts.items.map(
        (item) => new SysUserAccountResponse(item),
      );
    });

const readSysUserAccountByCity = (id) =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getSysUserAccountByCity(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.sysUserAccounts.items.map(
        (item) => new SysUserAccountResponse(item),
      );
    });

const readSysUserAccountByFirstLevelUnit = (id) =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getSysUserAccountByFirstlevelUnit(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.sysUserAccounts.items.map(
        (item) => new SysUserAccountResponse(item),
      );
    });

const readSysUserAccountByPidAndName = ({ pid, name }) =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getSysUserAccountByPidAndName({ pid, name }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.sysUserAccounts.items.map(
        (item) => new SysUserAccountResponse(item),
      );
    });

const readSysUserAccountPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getSysUserAccountPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.sysUserAccounts.items.map(
        (item) => new SysUserAccountResponse(item),
      );
      return new PaginationResponse({
        ...data.sysUserAccounts,
        items,
      });
    });

const readSysUserAccountQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getSysUserAccountQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.sysUserAccounts.items.map(
        (item) => new SysUserAccountResponse(item),
      );
      return new PaginationResponse({
        ...data.sysUserAccounts,
        items,
      });
    });

const readSysUserAccountQueryPaginationWithOrder = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getSysUserAccountQueryPaginationWithOrder({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.sysUserAccounts.items.map(
        (item) => new SysUserAccountResponse(item),
      );
      return new PaginationResponse({
        ...data.sysUserAccounts,
        items,
      });
    });

const readExecutiveYuanUser = () =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getExecutiveYuanUser(),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.sysUserAccounts.items.map(
        (item) => new SysUserAccountResponse(item),
      );
    });

const readPlanUser = (id) =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getPlanUser(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.sysUserAccounts.items
        .map((item) => new SysUserAccountResponse(item))
        .sort((a, b) => {
          if (a.businessPlan < b.businessPlan) return -1;
          if (a.businessPlan > b.businessPlan) return 1;
          if (a.businessPlan === '3') {
            if (a.mobilizationClassificationId < b.mobilizationClassificationId)
              return -1;
            if (a.mobilizationClassificationId > b.mobilizationClassificationId)
              return 1;
            if (a.firstlevelAgency < b.firstlevelAgency) return -1;
            if (a.firstlevelAgency > b.firstlevelAgency) return 1;
            if (a.secondaryAgency === null) return -1;
            if (b.secondaryAgency === null) return 1;
            if (a.secondaryAgency < b.secondaryAgency) return -1;
            if (a.secondaryAgency > b.secondaryAgency) return 1;
          }
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
    });

const readLocalGovernmentUser = () =>
  apolloInstance
    .query({
      query: SysUserAccountQuery.getLocalGovernmentUser(),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.sysUserAccounts.items
        .map((item) => new SysUserAccountResponse(item))
        .sort((a, b) => {
          if (a.cityAreaCode < b.cityAreaCode) return -1;
          if (a.cityAreaCode > b.cityAreaCode) return 1;
          if (a.firstlevelUnit < b.firstlevelUnit) return -1;
          if (a.firstlevelUnit > b.firstlevelUnit) return 1;
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
    });

const readSysUserAccountBraidingCategory = () =>
  getRequest(Router.getSysUserAccountBraidingCategory()).then((response) => {
    const { data } = response;
    return data;
  });

const createSysUserAccount = (body) =>
  postRequest(Router.createSysUserAccount, body).then((response) => response);

const applySysUserAccount = (body) =>
  postRequest(Router.applySysUserAccount, body).then((response) => response);

const updateSysUserAccount = (id, body) =>
  putRequest(Router.updateSysUserAccount(id), body).then(
    (response) => response,
  );

const updateSysUserAccountWithRemark = (id, body) =>
  putRequest(Router.updateSysUserAccountWithRemark(id), body).then(
    (response) => response,
  );

const deleteSysUserAccount = (id) =>
  deleteRequest(Router.deleteSysUserAccount(id)).then((response) => response);

const approveSysUserAccount = (id, body) =>
  putRequest(Router.approveSysUserAccount(id), body).then(
    (response) => response,
  );

const changePassword = (id, body) =>
  putRequest(Router.changePassword(id), body).then((response) => response);

const changeSysUserState = (id, body) =>
  putRequest(Router.changeSysUserState(id), body).then((response) => response);

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
    .catch(() => {
      store.dispatch(setLoading(false));
      ModalHelper.openErrorModal({
        message: '開啟檔案發生問題！',
      });
    });

const attachmentFileLink = (id) => Router.attachmentFileLink(id);

const getAppliedStatus = ({ identityNumber, name, captchaCode }) =>
  getRequest(Router.getAppliedStatus({ identityNumber, name, captchaCode }), {
    withCredentials: true,
  }).then((response) => new AppliedStatusResponse(response.data));
const cloudDataEditId = (id) =>
  getRequest(Router.getcloudDataEditId(id)).then((response) => response);
const cloudDataEditId2 = (id) =>
  getRequest(Router.getcloudDataEditId2(id)).then((response) => response);
const getContactUser = (formData) => {
  return postRequest(Router.getContactUser, formData, {
    headers: { ...multipartFormData },
  }).then((response) => response);
};
export default {
  readSysUserAccount,
  readSysUserAccountById,
  readSysUserAccountByFirstLevelAgency,
  readSysUserAccountBySecondaryAgency,
  readSysUserAccountByCity,
  readSysUserAccountByFirstLevelUnit,
  readSysUserAccountByPidAndName,
  readSysUserAccountBraidingCategory,

  readSysUserAccountPagination,
  readSysUserAccountQueryPagination,
  readSysUserAccountQueryPaginationWithOrder,

  readExecutiveYuanUser,
  readPlanUser,
  readLocalGovernmentUser,

  createSysUserAccount,
  applySysUserAccount,
  updateSysUserAccount,
  updateSysUserAccountWithRemark,
  deleteSysUserAccount,
  approveSysUserAccount,
  changePassword,
  changeSysUserState,

  uploadAttachmentFileRecord,
  updateAttachmentFile,
  deleteAttachmentFile,
  downloadAttachmentFileRecord,
  attachmentFileLink,

  getAppliedStatus,
  cloudDataEditId,
  cloudDataEditId2,
  getContactUser,
};
