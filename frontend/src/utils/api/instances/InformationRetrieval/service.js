import Router from './router';

import { getRequest, putRequest } from '../../axios/axiosMethod';

import InformationRetrievalResponse from '../../../dataModels/InformationRetrieval/InformationRetrievalResponse';
import NonAcceptedInformationRetrievalResponse from '../../../dataModels/InformationRetrieval/NonAcceptedInformationRetrievalResponse';
import ResponsibleInformationRetrievalInformationResponse from '../../../dataModels/InformationRetrieval/ResponsibleInformationRetrievalInformationResponse';
import HumanResourceInformationFromHumanResourcePlanResponse from '../../../dataModels/InformationRetrieval/HumanResourceInformationFromHumanResourcePlanResponse';
import GetUniqueHrReservistPidResponse from '../../../dataModels/InformationRetrieval/GetUniqueHrReservistPidResponse';

const getInformationRetrieval = ({ braidingList }) =>
  getRequest(Router.getInformationRetrieval).then(
    (response) => new InformationRetrievalResponse(response.data, braidingList),
  );

const getNonAcceptedInformationRetrievalInfo = () =>
  getRequest(Router.getNonAcceptedInformationRetrievalInfo).then(
    (response) => new NonAcceptedInformationRetrievalResponse(response.data),
  );

const getResponsibleInformationRetrievalInformation = () =>
  getRequest(Router.getResponsibleInformationRetrievalInformation).then(
    (response) =>
      new ResponsibleInformationRetrievalInformationResponse(response.data),
  );

const acceptNonAcceptedInformationRetrievalInfo = (list) =>
  putRequest(Router.acceptNonAcceptedInformationRetrievalInfo(list)).then(
    (response) => response,
  );

const getHumanResourceInformationFromHumanResourcePlan = ({
  braidingCategoryCode,
  humanResourcePlanId,
}) =>
  getRequest(
    Router.getHumanResourceInformationFromHumanResourcePlan({
      braidingCategoryCode,
      humanResourcePlanId,
    }),
  ).then(
    (response) =>
      new HumanResourceInformationFromHumanResourcePlanResponse(response.data),
  );

const getUniqueHrReservistPids = (list) =>
  getRequest(Router.getUniqueHrReservistPids(list)).then(
    (response) => new GetUniqueHrReservistPidResponse(response.data).data,
  );

export default {
  getInformationRetrieval,
  getNonAcceptedInformationRetrievalInfo,
  getResponsibleInformationRetrievalInformation,
  acceptNonAcceptedInformationRetrievalInfo,
  getHumanResourceInformationFromHumanResourcePlan,
  getUniqueHrReservistPids,
};
