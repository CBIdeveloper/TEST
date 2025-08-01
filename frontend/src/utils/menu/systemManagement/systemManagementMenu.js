import store from '../../../store/store';

import MenuItem from '../MenuItem';

import userManagementMenu from './userManagement/userManagementMenu';
import approveUserMenu from './approveUser/approveUserMenu';
import accessControlMenu from './accessControl/accessControlMenu';
import mobilizationPlanManagementMenu from './mobilizationPlanManagement/mobilizationPlanManagementMenu';
import mobilizationClassificationManagementMenu
    from './mobilizationClassificationManagement/mobilizationClassificationManagementMenu';
import braidingCategoryManagementMenu from './braidingCategoryManagement/braidingCategoryManagementMenu';
import firstLevelAgencyMenu from './firstLevelAgency/firstLevelAgencyMenu';
import secondaryAgencyMenu from './secondaryAgency/secondaryAgencyMenu';
import systemCodeMenu from './systemCode/systemCodeMenu';
import systemCodeSetMenu from './systemCodeSet/systemCodeSetMenu';
import systemMenuMenu from './systemMenu/systemMenuMenu';
import systemSubMenuMenu from './systemSubMenu/systemSubMenuMenu';
import modificationSearchMenu from './modificationSearch/modificationSearchMenu';
import systemAnnouncementMenu from './systemAnnouncement/systemAnnouncementMenu';

import Path from '../../path/path';
import permissionApplicationMenu from "./PermissionApplication/PermissionApplicationMenu";
import permissionApproveMenu from "./permissionApprove/permissionApproveMenu";

const language = store.getState().language.languageInfo.languageObject;

const systemManagement = new MenuItem({
    name: language.systemManagement.title,
    path: Path.systemManagementPath,
    subMenus: [
        userManagementMenu,
        approveUserMenu,
        accessControlMenu,
        mobilizationPlanManagementMenu,
        mobilizationClassificationManagementMenu,
        braidingCategoryManagementMenu,
        firstLevelAgencyMenu,
        secondaryAgencyMenu,
        systemCodeMenu,
        systemCodeSetMenu,
        systemMenuMenu,
        systemSubMenuMenu,
        modificationSearchMenu,
        systemAnnouncementMenu,
        permissionApplicationMenu,
        permissionApproveMenu
    ],
    disableInBreadcrumb: true,
});

export default systemManagement;
