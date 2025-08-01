import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
import { createQuery } from '../../../parsers/queryParser';

export default Object.freeze({
  readExecutiveUser: urlParser([
    ApiKey.sysUserAccount,
    ApiKey.contactInformation,
    ApiKey.executive,
  ]),

  readMobilizationPlanUser: ({
    mobilizationPlanId,
    mobilizationClassificationId,
  }) => {
    let query = createQuery({
      [ApiKey.mobilizationPlanId]: mobilizationPlanId,
    });
    const path = urlParser([
      ApiKey.sysUserAccount,
      ApiKey.contactInformation,
      ApiKey.mobilizationPlan,
    ]);
    if (
      mobilizationClassificationId !== undefined &&
      mobilizationClassificationId !== null &&
      mobilizationClassificationId !== ''
    ) {
      query = createQuery({
        [ApiKey.mobilizationPlanId]: mobilizationPlanId,
        [ApiKey.mobilizationClassificationId]: mobilizationClassificationId,
      });
    }
    return `${path}${query}`;
  },

  readCityUser: ({ cityId }) => {
    let query = '';
    const path = urlParser([
      ApiKey.sysUserAccount,
      ApiKey.contactInformation,
      ApiKey.city,
    ]);
    if (cityId !== undefined && cityId !== null && cityId !== '') {
      query = createQuery({
        [ApiKey.cityId]: cityId,
      });
    }
    return `${path}${query}`;
  },

  readMaintainManufacturer: () => {
    const path = urlParser([
      ApiKey.sysUserAccount,
      ApiKey.contactInformation,
      ApiKey.maintainManufacturer,
    ]);
    return `${path}`;
  },

  readLevelUser: ({ levelId }) => {
    let query = '';
    const path = urlParser([
      ApiKey.sysUserAccount,
      ApiKey.contactInformation,
      ApiKey.levelId,
    ]);
    if (levelId !== undefined && levelId !== null && levelId !== '') {
      query = createQuery({
        [ApiKey.levelId]: levelId,
      });
    }
    return `${path}${query}`;;
  },
});
