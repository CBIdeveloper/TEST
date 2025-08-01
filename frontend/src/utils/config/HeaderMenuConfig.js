import homepageMenu from '../menu/homepage/homepageMenu';
import mobilizationEnergyMenu from '../menu/mobilizationEnergy/mobilizationEnergyMenu';
import businessManagementMenu from '../menu/businessManagement/businessManagementMenu';
import retrievalServiceMenu from '../menu/retrievalService/retrievalServiceMenu';
import dataSearchMenu from '../menu/dataSearch/dataSearchMenu';
import systemManagementMenu from '../menu/systemManagement/systemManagementMenu';

import Path from '../path/path';

const headerMenuConfig = [
  {
    name: '首頁',
    path: Path.mainPath,
    subMenus: homepageMenu,
    fixed: true,
  },
  {
    name: '動員量能',
    path: mobilizationEnergyMenu.path,
    subMenus: mobilizationEnergyMenu.subMenus,
  },
  {
    name: '業務管考',
    path: businessManagementMenu.path,
    subMenus: businessManagementMenu.subMenus,
  },
  {
    name: '檢索服務',
    path: retrievalServiceMenu.path,
    subMenus: retrievalServiceMenu.subMenus,
  },
  {
    name: '資料查詢',
    path: dataSearchMenu.path,
    subMenus: dataSearchMenu.subMenus,
  },
  {
    name: '系統管理',
    path: systemManagementMenu.path,
    subMenus: systemManagementMenu.subMenus,
  },
];

export default headerMenuConfig;
