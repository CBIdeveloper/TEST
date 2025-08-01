import store from '../../../store/store';

import MenuItem from '../MenuItem';

// import regulationMenu from './regulation/regulationMenu';
import regulationDetailMenu from './regulationDetail/regulationDetailMenu';
import regulationManagementMenu from './regulationManagement/regulationManagementMenu';
import planDownloadMenu from './planDownload/planDownloadMenu';
import planDownloadManagementMenu from './planDownloadManagement/planDownloadManagementMenu';
import contactInformationMenu from './contactInformation/contactInformationMenu';

import Path from '../../path/path';

const language = store.getState().language.languageInfo.languageObject;

const retrievalService = new MenuItem({
  name: language.retrievalService.title,
  path: Path.retrievalServicePath,
  subMenus: [
    // regulationMenu,
    regulationDetailMenu,
    regulationManagementMenu,
    planDownloadMenu,
    planDownloadManagementMenu,
    contactInformationMenu,
  ],
  disableInBreadcrumb: true,
});

export default retrievalService;
