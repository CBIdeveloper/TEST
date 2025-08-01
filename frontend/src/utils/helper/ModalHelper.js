import store from '../../store/store';

import GeneralModal from '../modals/DialogModal/GeneralModal/GeneralModal';
import GeneralDeleteModal from '../modals/DialogModal/GeneralDeleteModal/GeneralDeleteModal';
import DeleteModal from '../modals/DialogModal/DeleteModal/DeleteModal';
import MessageModal from '../modals/DialogModal/MessageModal/MessageModal';
import UploadModal from '../modals/DialogModal/MessageModal/UploadModal';
import UploadSuccessModal from '../modals/DialogModal/MessageModal/UploadSuccessModal.js';
import HasEmptyModal from '../modals/DialogModal/MessageModal/HasEmptyModal';
import HasErrorMeetingModal from '../modals/DialogModal/MessageModal/HasErrorMeetingModal';
import HasEmptyRequestModal from '../modals/DialogModal/MessageModal/HasEmptyRequestModal';
import ErrorModal from '../modals/DialogModal/ErrorModal/ErrorModal';
import UploadFileModal from '../modals/DialogModal/UploadFileModal/UploadFileModal';
import ApproveModal from '../modals/DialogModal/ApproveModal/ApproveModal';
import ConfirmModal from '../modals/DialogModal/ConfirmModal/ConfirmModal';
import ConfirmModal2 from '../modals/DialogModal/ConfirmModal2/ConfirmModal';
import ConfirmModal3 from '../modals/DialogModal/ConfirmModal3/ConfirmModal';
import ConfirmModal4 from '../modals/DialogModal/ConfirmModal4/ConfirmModal';
import PropsConfirmModal from '../modals/DialogModal/ConfirmModal/PropsConfirmModal/PropsConfirmModal';
import BusinessManagementModal from '../modals/DialogModal/BusinessManagementModal/BusinessManagementModal';
import BusinessManagementMemoModal from '../modals/DialogModal/BusinessManagementMemoModal/BusinessManagementMemoModal';
import BusinessManagementSignModal from '../modals/DialogModal/BusinessManagementSignModal/BusinessManagementSignModal';
import ImportModal from '../modals/DialogModal/ImportModal/ImportModal.js';
import TableModal from '../modals/DialogModal/TableModal/TableModal';
import TableSubModal from '../modals/DialogModal/TableSubModal/TableSubModal.js';
import BatchApprovalModal from '../modals/DialogModal/BatchApprovalModal/BatchApprovalModal';
import AnnouncementModal from '../modals/DialogModal/AnnouncementModal/AnnouncementModal';
import AcceptInformationRetrievalModal from '../modals/DialogModal/AcceptInformationRetrievalModal/AcceptInformationRetrievalModal';
import MemoModal from '../modals/DialogModal/MemoModal/MemoModal';
import PlanUpdateMemoModal from '../modals/DialogModal/PlanUpdateMemoModal/PlanUpdateMemoModal';
import BraidingCategoryMemoModal from '../modals/DialogModal/BraidingCategoryMemoModal/BraidingCategoryMemoModal';
import FileUploadModal from '../modals/DialogModal/FileUploadModal/FileUploadModal.js';
import RejectUserModal from '../modals/DialogModal/RejectUserModal/RejectUserModal';
import ChangePasswordModal from '../modals/DialogModal/ChangePasswordModal/ChangePasswordModal';
import AccessModal from '../modals/DialogModal/AccessModal/AccessModal';
import StatusCodeHelper from './StatusCodeHelper';
import ReturnModal from '../modals/DialogModal/ReturnModal/ReturnModal.js';
import SaveModal from '../modals/DialogModal/ReturnModal2/ReturnModal.js';
import NotCorrectModal from '../modals/DialogModal/NotCorrectModal/NotCorrectModal.js';
import EditorModal from '../modals/DialogModal/EditorModal/EditorModal.js';
import BraidingCategoryReminderModel from '../modals/DialogModal/BraidingCategoryReminderModel/BraidingCategoryReminderModel';
import VisiableLevelModal from '../modals/DialogModal/VisiableLevelModal/VisiableLevelModal.js';
import DataformModal from '../modals/DialogModal/DataformModal/DataformModal.js';
import ContactModal from '../modals/DialogModal/ContactModal/ContactModal.js';
import RequestModal from '../modals/DialogModal/RequestModel/RequestModal.js';
import RequestAnswerModal from '../modals/DialogModal/RequestAnswerModel/RequestAnswerModal.js';
import TopicEffectModifyModal from '../modals/DialogModal/TopicEffectModal/TopicEffectModifyModal.js';
import TopicEffectOpenModal from '../modals/DialogModal/TopicEffectModal/TopicEffectOpenModal.js';
import TopicEffectExportModal from '../modals/DialogModal/TopicEffectModal/TopicEffectExportModal.js';
import {
  openDialogModal,
  reserveOpenDialogModal,
} from '../../store/modal/slice';

const openGeneralModal = ({ title, message, callback }) => {
  const generalModal = new GeneralModal(title, message, callback);
  store.dispatch(openDialogModal(generalModal));
};

const openGeneralDeleteModal = ({
  title,
  message,
  deleteFunction,
  deleteButtonText,
}) => {
  const generalDeleteModal = new GeneralDeleteModal({
    title,
    message,
    deleteFunction,
    deleteButtonText,
  });
  store.dispatch(openDialogModal(generalDeleteModal));
};

const openMessageModal = ({ message, callback }) => {
  const messageModal = new MessageModal(message, callback);
  store.dispatch(openDialogModal(messageModal));
};

const openDeleteModal = ({ deleteFunction }) => {
  const deleteModal = new DeleteModal(deleteFunction);
  store.dispatch(openDialogModal(deleteModal));
};

const openErrorModal = ({ message }) => {
  const errorModal = new ErrorModal(message);
  store.dispatch(reserveOpenDialogModal(errorModal));
};

const openUploadFileModal = ({ uploadFunction }) => {
  const uploadModal = new UploadFileModal(uploadFunction);
  store.dispatch(openDialogModal(uploadModal));
};

const openApproveModal = ({ approveFunction }) => {
  const approveModal = new ApproveModal(approveFunction);
  store.dispatch(openDialogModal(approveModal));
};

const openConfirmModal = ({ confirmFunction }) => {
  const confirmModal = new ConfirmModal(confirmFunction);
  store.dispatch(openDialogModal(confirmModal));
};

const openConfirmModal2 = ({ props }) => {
  const confirmModal = new ConfirmModal2(props);
  store.dispatch(openDialogModal(confirmModal));
};

const openConfirmModal3 = (props) => {
  const confirmModal = new ConfirmModal3(props);
  store.dispatch(openDialogModal(confirmModal));
};

const openConfirmModal4 = (props) => {
  const confirmModal = new ConfirmModal4(props);
  store.dispatch(openDialogModal(confirmModal));
};

const openMessageModalByStatus = ({ response, callback }) => {
  const message = StatusCodeHelper.getMessage({
    code: response.data.code,
    status: response.status,
    responseMessage: response.data.message,
  });
  const messageModal = new MessageModal(message, callback);
  store.dispatch(openDialogModal(messageModal));
};

const openBusinessManagementModal = ({ title, id }) => {
  const messageModal = new BusinessManagementModal({
    title,
    id,
  });
  store.dispatch(openDialogModal(messageModal));
};

const openBusinessManagementMemoModal = () => {
  const businessManagementMemoModal = new BusinessManagementMemoModal();
  store.dispatch(openDialogModal(businessManagementMemoModal));
};

const openBusinessManagementSignModal = ({ title, id }) => {
  const messageModal = new BusinessManagementSignModal({
    title,
    id,
  });
  store.dispatch(openDialogModal(messageModal));
};

const openTopicEffectModifyModal = ({ title, id }) => {
  const messageModal = new TopicEffectModifyModal({
    title,
    id,
  });
  store.dispatch(openDialogModal(messageModal));
};

const openTopicEffectOpenModal = ({ title, id }) => {
  const messageModal = new TopicEffectOpenModal({
    title,
    id,
  });
  store.dispatch(openDialogModal(messageModal));
};

const openTopicEffectExportModal = ({ title }) => {
  const messageModal = new TopicEffectExportModal({
    title,
  });
  store.dispatch(openDialogModal(messageModal));
};

const openImportModal = ({ code }) => {
  const messageModal = new ImportModal({
    code,
  });
  store.dispatch(openDialogModal(messageModal));
};

const openTableModal = ({ modalTitle, sectionTitle, TableClass, typeId }) => {
  const tableModal = new TableModal({
    modalTitle,
    sectionTitle,
    TableClass,
    typeId,
  });
  store.dispatch(openDialogModal(tableModal));
};

const openTableSubModal = ({
  modalTitle,
  sectionTitle,
  TableClass,
  typeId,
}) => {
  const tableSubModal = new TableSubModal({
    modalTitle,
    sectionTitle,
    TableClass,
    typeId,
  });
  store.dispatch(openDialogModal(tableSubModal));
};

const openBatchApprovalModal = ({ id }) => {
  const batchApprovalModal = new BatchApprovalModal({ id });
  store.dispatch(openDialogModal(batchApprovalModal));
};

const openAnnouncementModal = ({ id }) => {
  const announcementModal = new AnnouncementModal({ id });
  store.dispatch(openDialogModal(announcementModal));
};

const openAcceptModal = () => {
  const acceptModal = new AcceptInformationRetrievalModal();
  store.dispatch(openDialogModal(acceptModal));
};

const openMemoModal = () => {
  const memoModal = new MemoModal();
  store.dispatch(openDialogModal(memoModal));
};

const openPlanUpdateMemoModal = () => {
  const planUpdateMemoModal = new PlanUpdateMemoModal();
  store.dispatch(openDialogModal(planUpdateMemoModal));
};

const openBraidingCategoryMemoModal = () => {
  const braidingCategoryMemoModal = new BraidingCategoryMemoModal();
  store.dispatch(openDialogModal(braidingCategoryMemoModal));
};

const openFileUploadModal = (props) => {
  const fileUploadModal = new FileUploadModal(props);
  store.dispatch(openDialogModal(fileUploadModal));
};

const openRejectUserModal = (id) => {
  const rejectUserModal = new RejectUserModal({ id });
  store.dispatch(openDialogModal(rejectUserModal));
};

const openPropsConfirmModal = (props) => {
  const propsConfirmModal = new PropsConfirmModal(props);
  store.dispatch(openDialogModal(propsConfirmModal));
};

const openChangePasswordModal = (id) => {
  const changePasswordModal = new ChangePasswordModal({ id });
  store.dispatch(openDialogModal(changePasswordModal));
};

const openAccessModal = ({ roleId }) => {
  const accessModal = new AccessModal({ roleId });
  store.dispatch(openDialogModal(accessModal));
};

const openReturnModal = () => {
  const returnModal = new ReturnModal();
  store.dispatch(openDialogModal(returnModal));
};

const openSaveModal = (updatedDtoKeyDatas, dataLength, code, id) => {
  const returnModal = new SaveModal(updatedDtoKeyDatas, dataLength, code, id);
  store.dispatch(openDialogModal(returnModal));
};

const openNotCorrectModal = (
  id,
  code,
  updatedUserAccountId,
  name2,
  editAgency,
  transAt,
  complianceQuantity,
  nonComplianceQuantity,
) => {
  const notCorrectModal = new NotCorrectModal(
    id,
    code,
    updatedUserAccountId,
    name2,
    editAgency,
    transAt,
    complianceQuantity,
    nonComplianceQuantity,
  );
  store.dispatch(openDialogModal(notCorrectModal));
};
const openEditorModal = (data) => {
  const notCorrectModal = new EditorModal(data);
  store.dispatch(openDialogModal(notCorrectModal));
};

const openBraidingCategoryReminderModal = ({
  id,
  fullName,
  systemNum,
  transmissionDate,
}) => {
  const braidingCategoryReminderModal = new BraidingCategoryReminderModel({
    id,
    fullName,
    systemNum,
    transmissionDate,
  });
  store.dispatch(openDialogModal(braidingCategoryReminderModal));
};

const openVisiableLevelModal = ({
  isVisibleToAll,
  isOrganizationClear,
  isGovernmentClear,
  isMilitaryClear,
  firstlevelAgencyList,
  visOrganizationList,
  cityList,
  visGovermentList,
  militaryList,
  visMilitaryList,
}) => {
  const visiableLevelModal = new VisiableLevelModal({
    isVisibleToAll,
    isOrganizationClear,
    isGovernmentClear,
    isMilitaryClear,
    firstlevelAgencyList,
    visOrganizationList,
    cityList,
    visGovermentList,
    militaryList,
    visMilitaryList,
  });
  store.dispatch(openDialogModal(visiableLevelModal));
};

const openDataformModal = ({
  name2,
  sendTime,
  cloudDataCount,
  transCount,
  troadCount,
  sftpCount,
  count,
  resultArray,
  count2,
}) => {
  const dataformModal = new DataformModal({
    name2,
    sendTime,
    cloudDataCount,
    transCount,
    troadCount,
    sftpCount,
    count,
    resultArray,
    count2,
  });
  store.dispatch(openDialogModal(dataformModal));
};

const openUploadLimitModal = () => {
  const messageModal = new UploadModal();
  store.dispatch(openDialogModal(messageModal));
};

const openUploadSuccessModal = () => {
  const messageModal = new UploadSuccessModal();
  store.dispatch(openDialogModal(messageModal));
};

const openContactModal = (data) => {
  const messageModal = new ContactModal(data);
  store.dispatch(openDialogModal(messageModal));
};

const openhasEmptyModal = () => {
  const messageModal = new HasEmptyModal();
  store.dispatch(openDialogModal(messageModal));
};

const openhasErrorMeetingModal = () => {
  const messageModal = new HasErrorMeetingModal();
  store.dispatch(openDialogModal(messageModal));
};

const openhasEmptyRequestModal = () => {
  const messageModal = new HasEmptyRequestModal();
  store.dispatch(openDialogModal(messageModal));
};

const openRequestModal = (response, id, filteredData) => {
  const messageModal = new RequestModal(response, id, filteredData);
  store.dispatch(openDialogModal(messageModal));
};

const openRequestAnswerModal = (requestResponse, signResponse) => {
  const messageModal = new RequestAnswerModal(requestResponse, signResponse);
  store.dispatch(openDialogModal(messageModal));
};

export default {
  openGeneralModal,
  openGeneralDeleteModal,
  openMessageModal,
  openDeleteModal,
  openErrorModal,
  openUploadFileModal,
  openApproveModal,
  openConfirmModal,
  openConfirmModal2,
  openConfirmModal3,
  openConfirmModal4,
  openMessageModalByStatus,
  openBusinessManagementModal,
  openBusinessManagementMemoModal,
  openBusinessManagementSignModal,
  openTopicEffectModifyModal,
  openTopicEffectOpenModal,
  openTopicEffectExportModal,
  openImportModal,
  openTableModal,
  openTableSubModal,
  openBatchApprovalModal,
  openAnnouncementModal,
  openAcceptModal,
  openMemoModal,
  openPlanUpdateMemoModal,
  openBraidingCategoryMemoModal,
  openFileUploadModal,
  openRejectUserModal,
  openPropsConfirmModal,
  openChangePasswordModal,
  openAccessModal,
  openReturnModal,
  openSaveModal,
  openNotCorrectModal,
  openEditorModal,
  openBraidingCategoryReminderModal,
  openVisiableLevelModal,
  openDataformModal,
  openUploadLimitModal,
  openUploadSuccessModal,
  openContactModal,
  openhasEmptyModal,
  openhasErrorMeetingModal,
  openhasEmptyRequestModal,
  openRequestModal,
  openRequestAnswerModal,
};
