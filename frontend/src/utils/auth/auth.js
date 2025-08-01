import DateHelper from '../helper/DateHelper';
import ModalHelper from '../helper/ModalHelper';

import ApiService from '../api/ApiService';
import Path from '../path/path';
import UserService from '../../services/UserService';
import CryptoJS from 'crypto-js';

const tokenType = 'Bearer ';

/* global VERSION */
const version = VERSION;

export const saveToken = async ({
  access_token,
  access_token_expired_at,
  refresh_token,
  refresh_token_expired_at,
}) => {
  await sessionStorage.setItem(`adm-${version}-accessToken`, access_token);
  await sessionStorage.setItem(
    `adm-${version}-accessTokenExpiredAt`,
    access_token_expired_at,
  );
  await sessionStorage.setItem(`adm-${version}-refreshToken`, refresh_token);
  await sessionStorage.setItem(
    `adm-${version}-refreshTokenExpiredAt`,
    refresh_token_expired_at,
  );
};

export const saveTokenAndUserInfo = ({
  access_token,
  access_token_expired_at,
  refresh_token,
  refresh_token_expired_at,
  userId,
  name,
  unitName,
  jobPosition,
  agencyType,
  firstlevelAgencyId,
  secondaryAgencyId,
  cityId,
  firstlevelUnitId,
  businessPlan,
  rolePermissionGroupIdList,
  rolePermissionIdList,
  privacy,
  militaryagencyId,
  businessPhone,
  tpExtension,
}) => {
  sessionStorage.setItem(`adm-${version}-name`, name);
  sessionStorage.setItem(`adm-${version}-unit-name`, unitName);
  sessionStorage.setItem(`adm-${version}-job-position`, jobPosition);
  sessionStorage.setItem(`adm-${version}-agency-type`, agencyType);
  sessionStorage.setItem(
    `adm-${version}-firstlevel-agency-id`,
    firstlevelAgencyId === null ? '' : firstlevelAgencyId,
  );
  sessionStorage.setItem(
    `adm-${version}-secondary-agency-id`,
    secondaryAgencyId === null ? '' : secondaryAgencyId,
  );
  sessionStorage.setItem(`adm-${version}-city-id`, cityId === null ? '' : cityId);
  sessionStorage.setItem(
    `adm-${version}-firstlevel-unit-id`,
    firstlevelUnitId === null ? '' : firstlevelUnitId,
  );
  sessionStorage.setItem(`adm-${version}-accessToken`, access_token);
  sessionStorage.setItem(
    `adm-${version}-accessTokenExpiredAt`,
    access_token_expired_at,
  );
  sessionStorage.setItem(`adm-${version}-refreshToken`, refresh_token);
  sessionStorage.setItem(
    `adm-${version}-refreshTokenExpiredAt`,
    refresh_token_expired_at,
  );
  sessionStorage.setItem(`adm-${version}-user-id`, userId);
  sessionStorage.setItem(`adm-${version}-business-plan`, businessPlan);
  sessionStorage.setItem(
    `adm-${version}-role`,
    JSON.stringify(rolePermissionGroupIdList),
  );
  sessionStorage.setItem(
    `adm-${version}-permission`,
    JSON.stringify(rolePermissionIdList),
  );
  sessionStorage.setItem(`adm-${version}-privacy`, privacy);
  sessionStorage.setItem(`adm-${version}-militaryagency-id`, militaryagencyId);
  sessionStorage.setItem(`adm-${version}-business-phone`, businessPhone);
  sessionStorage.setItem(`adm-${version}-telephone-extension`,tpExtension);
};
export const setPrivacy = (privacy) => {
  sessionStorage.setItem(`adm-${version}-privacy`, privacy);
};

export const getPrivacy = () => {
  const privacy = sessionStorage.getItem(`adm-${version}-privacy`);
  if (privacy != null) {
    return privacy;
  }
  return null;
};

export const setName = (name) => {
  sessionStorage.setItem(`adm-${version}-name`, name);
};

export const setChangeRequired = (value) => {
  sessionStorage.setItem(`adm-${version}-change-required`, value);
};

export const getAccessToken = () => {
  let accessToken = sessionStorage.getItem(`adm-${version}-accessToken`);
  if (accessToken != null) {
    accessToken = tokenType + accessToken;
    return accessToken;
  }
  return '';
};

export const getAccessTokenExpiredAt = () => {
  const accessTokenExpiredAt = sessionStorage.getItem(
    `adm-${version}-accessTokenExpiredAt`,
  );
  if (accessTokenExpiredAt != null) {
    return accessTokenExpiredAt;
  }
  return '';
};

export const getRefreshToken = () => {
  let refreshToken = sessionStorage.getItem(`adm-${version}-refreshToken`);
  if (refreshToken != null) {
    refreshToken = tokenType + refreshToken;
    return refreshToken;
  }
  return '';
};

export const getRefreshTokenExpiredAt = () => {
  const refreshTokenExpiredAt = sessionStorage.getItem(
    `adm-${version}-refreshTokenExpiredAt`,
  );
  if (refreshTokenExpiredAt != null) {
    return refreshTokenExpiredAt;
  }
  return '';
};

export const getChangePassword = () => {
  const value = sessionStorage.getItem(`adm-${version}-change-required`);
  if (value != null) {
    return value === 'true';
  }
  return false;
};

export const getName = () => {
  const name = sessionStorage.getItem(`adm-${version}-name`);
  if (name != null) {
    return name;
  }
  return '';
};

export const getUnitName = () => {
  const unitName = sessionStorage.getItem(`adm-${version}-unit-name`);
  if (unitName != null) {
    return unitName;
  }
  return '';
};

export const getJobPosition = () => {
  const jobPosition = sessionStorage.getItem(`adm-${version}-job-position`);
  if (jobPosition != null) {
    return jobPosition;
  }
  return '';
};

export const getAgencyType = () => {
  const agencyType = sessionStorage.getItem(`adm-${version}-agency-type`);
  if (agencyType != null) {
    return agencyType;
  }
  return '';
};

export const getFirstlevelAgencyId = () => {
  const firstlevelAgencyId = sessionStorage.getItem(
    `adm-${version}-firstlevel-agency-id`,
  );
  if (firstlevelAgencyId != null) {
    return firstlevelAgencyId;
  }
  return '';
};

export const getSecondaryAgencyId = () => {
  const secondaryAgencyId = sessionStorage.getItem(
    `adm-${version}-secondary-agency-id`,
  );
  if (secondaryAgencyId != null) {
    return secondaryAgencyId;
  }
  return '';
};

export const getCityId = () => {
  const cityId = sessionStorage.getItem(`adm-${version}-city-id`);
  if (cityId != null) {
    return cityId;
  }
  return '';
};

export const getFirstlevelUnitId = () => {
  const firstlevelUnitId = sessionStorage.getItem(
    `adm-${version}-firstlevel-unit-id`,
  );
  if (firstlevelUnitId != null) {
    return firstlevelUnitId;
  }
  return '';
};

export const getUserId = () => {
  const userId = sessionStorage.getItem(`adm-${version}-user-id`);
  if (userId != null) {
    return userId;
  }
  return '';
};

export const getUserRole = () => {
  const role = sessionStorage.getItem(`adm-${version}-role`);
  if (role != null) {
    return JSON.parse(role);
  }
  return [];
};

export const getUserPermission = () => {
  const permission = sessionStorage.getItem(`adm-${version}-permission`);
  if (permission != null) {
    return JSON.parse(permission);
  }
  return [];
};

export const getMilitaryagencyId = () => {
  const militaryagencyId = sessionStorage.getItem(
    `adm-${version}-militaryagency-id`,
  );
  if (militaryagencyId != null) {
    return militaryagencyId;
  }
  return '';
};

export const getBusinessPhone = () => {
  const businessPhone = sessionStorage.getItem(`adm-${version}-business-phone`);
  if (businessPhone != null) {
    return businessPhone;
  }
  return '';
};

export const getTelephoneExtension = () => {
  const tpExtension = sessionStorage.getItem(
    `adm-${version}-telephone-extension`,
  );
  if (tpExtension != null) {
    return tpExtension;
  }
  return '';
};

export const userHasRole = (value) => {
  const role = getUserPermission();
  return role.includes(value);
};

export const getUserWorkObject = () => ({
  agencyType: getAgencyType(),
  firstLevelAgencyId: getFirstlevelAgencyId(),
  secondaryAgencyId: getSecondaryAgencyId(),
  cityId: getCityId(),
  firstLevelUnitId: getFirstlevelUnitId(),
  militaryagencyId: getMilitaryagencyId(),
});

export const getBusinessPlan = () => {
  const businessPlan = sessionStorage.getItem(`adm-${version}-business-plan`);
  if (businessPlan != null) {
    return businessPlan;
  }
  return '';
};

export const userBusinessPlanCheck = (value) => {
  const businessPlan = getBusinessPlan();
  return businessPlan === value;
};

export const getLastActionTime = () => {
  const lastActionTime = sessionStorage.getItem(
    `adm-${version}-last-action-time`,
  );
  if (lastActionTime != null) {
    return new Date(parseInt(lastActionTime, 10));
  }
  return null;
};

export const setLastActionTime = (date) => {
  sessionStorage.setItem(`adm-${version}-last-action-time`, date.getTime());
};

export const removeTokens = () => {
  sessionStorage.removeItem(`adm-${version}-name`);
  sessionStorage.removeItem(`adm-${version}-unit-name`);
  sessionStorage.removeItem(`adm-${version}-job-position`);
  sessionStorage.removeItem(`adm-${version}-agency-type`);
  sessionStorage.removeItem(`adm-${version}-firstlevel-agency-id`);
  sessionStorage.removeItem(`adm-${version}-secondary-agency-id`);
  sessionStorage.removeItem(`adm-${version}-city-id`);
  sessionStorage.removeItem(`adm-${version}-firstlevel-unit-id`);
  sessionStorage.removeItem(`adm-${version}-accessToken`);
  sessionStorage.removeItem(`adm-${version}-accessTokenExpiredAt`);
  sessionStorage.removeItem(`adm-${version}-refreshToken`);
  sessionStorage.removeItem(`adm-${version}-refreshTokenExpiredAt`);
  sessionStorage.removeItem(`adm-${version}-user-id`);
  sessionStorage.removeItem(`adm-${version}-business-plan`);
  sessionStorage.removeItem(`adm-${version}-role`);
  sessionStorage.removeItem(`adm-${version}-change-required`);
  sessionStorage.removeItem(`adm-${version}-privacy`);
  sessionStorage.removeItem(`adm-${version}-militaryagency-id`);
  sessionStorage.removeItem(`adm-${version}-business-phone`);
  sessionStorage.removeItem(`adm-${version}-telephone-extension`);
  UserService.clearToken();
};

export const isUserLogin = () => getAccessToken() !== '' && getUserId() !== '';

export const accessTokenExpireCheck = () => {
  const accessTokenExpiredAt = getAccessTokenExpiredAt();
  if (accessTokenExpiredAt !== '') {
    const now = new Date();
    const expiredAtDateObject = DateHelper.momentDate(accessTokenExpiredAt);
    if (expiredAtDateObject === '') return true;
    if (now >= expiredAtDateObject) {
      ModalHelper.openMessageModal({
        message: 'Token 已過期，請重新登入！',
        callback: () => {
          ApiService.authentication.signOut().then((response) => {
            if (response.executed) {
              removeTokens();
              // window.open(Path.loginPath, '_self');
              window.open('/frontend/login', '_self');
            } else {
              ModalHelper.openErrorModal({
                message: '登出失敗！',
              });
            }
          });
        },
      });
      return false;
    }
  }
  return true;
};

export default {};
