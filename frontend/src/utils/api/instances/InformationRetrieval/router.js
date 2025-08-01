import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
import { createQuery } from '../../../parsers/queryParser';

export default Object.freeze({
  getInformationRetrieval: ApiKey.informationRetrieval,
  getNonAcceptedInformationRetrievalInfo: urlParser([
    ApiKey.informationRetrieval,
    ApiKey.nonAcceptedInformationRetrievalInfo,
  ]),
  getResponsibleInformationRetrievalInformation: urlParser([
    ApiKey.informationRetrieval,
    ApiKey.responsibleInformationRetrievalInformation,
  ]),
  acceptNonAcceptedInformationRetrievalInfo: (list) => {
    const path = ApiKey.informationRetrieval;
    const query = list.reduce((accum, current) => {
      if (accum === null) {
        return `?${ApiKey.braidingCategoryIdList}=${current}`;
      }
      return `${accum}&${ApiKey.braidingCategoryIdList}=${current}`;
    }, null);
    return `${path}${query}`;
  },
  getHumanResourceInformationFromHumanResourcePlan: ({
    braidingCategoryCode,
    humanResourcePlanId,
  }) => {
    const path = urlParser([
      ApiKey.informationRetrieval,
      ApiKey.getHumanResourceInformationFromHumanResourcePlan,
    ]);
    const query = createQuery({
      [ApiKey.braidingCategoryCode]: braidingCategoryCode,
      [ApiKey.humanResourcePlanId]: humanResourcePlanId,
    });
    return `${path}${query}`;
  },
  getUniqueHrReservistPids: (idList) => {
    const path = urlParser([
      ApiKey.informationRetrieval,
      ApiKey.getUniqueHrReservistPids,
    ]);
    const query = idList.reduce(
      (accum, current) =>
        `${accum}&${ApiKey.pidList}=${encodeURIComponent(current)}`,
      '?',
    );
    return `${path}${query}`;
  },
});
