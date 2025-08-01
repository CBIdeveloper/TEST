import businessManagementPath from './businessManagement/businessManagementPath';
import dataSearchPath from './dataSearch/dataSearchPath';
import cloudDataPath from './dataSearch/cloudDataPath';
import mobilizationEnergyPath from './mobilizationEnergy/mobilizationEnergyPath';
import retrievalServicePath from './retrievalService/retrievalServicePath';
import systemManagementPath from './systemManagement/systemManagementPath';
import servePath from './qanda/qandaPath';

const mainPath = '/';
const loginPath = '/login';

const forgotPasswordPath = '/forgot-password';
const changePasswordPath = '/change-password';
const registerPath = '/register';
const registerProgressPath = '/register-progress';

const announcementPath = '/announcement';

export default {
  mainPath,
  loginPath,

  forgotPasswordPath,
  changePasswordPath,
  registerPath,
  registerProgressPath,

  announcementPath,

  ...businessManagementPath,
  ...dataSearchPath,
  ...cloudDataPath,
  ...mobilizationEnergyPath,
  ...retrievalServicePath,
  ...systemManagementPath,
  ...servePath,
};
