import Router from './router';

import { getRequest } from '../../axios/axiosMethod';

import ContactInformationResponse from '../../../dataModels/ContactInformation/ContactInformationResponse';

const readExecutiveUser = () =>
  getRequest(Router.readExecutiveUser).then((response) =>
    response.data.get_dto_list.map(
      (item) => new ContactInformationResponse(item),
    ),
  );

const readMobilizationPlanUser = ({
  mobilizationPlanId,
  mobilizationClassificationId,
}) =>
  getRequest(
    Router.readMobilizationPlanUser({
      mobilizationPlanId,
      mobilizationClassificationId,
    }),
  ).then((response) =>
    response.data.get_dto_list.map(
      (item) => new ContactInformationResponse(item),
    ),
  );

const readCityUser = ({ cityId }) =>
  getRequest(Router.readCityUser({ cityId })).then((response) =>
    response.data.get_dto_list.map(
      (item) => new ContactInformationResponse(item),
    ),
  );

const readLevelUser = ({ levelId }) =>
  getRequest(Router.readLevelUser({ levelId })).then((response) =>
    response.data.get_dto_list.map(
      (item) => new ContactInformationResponse(item),
    ),
  );
const readMaintainManufacturer = () =>
  getRequest(Router.readMaintainManufacturer()).then((response) =>
    response.data.get_dto_list.map(
      (item) => new ContactInformationResponse(item),
    ),
  );

export default {
  readExecutiveUser,
  readMobilizationPlanUser,
  readCityUser,
  readMaintainManufacturer,
  readLevelUser,
};
