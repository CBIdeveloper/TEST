import React from 'react';
import store from '../../../../store/store';
import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';
import { reserveCloseDialogModal } from '../../../../store/modal/slice';
import './VisiableLevelModal.scss';

class VisiableLevelModal extends DialogModal {
  constructor(props) {
    super(props);
    this.props = props;
    // console.log(props)
  }

  getModalTitle = () => '已選單位列表';

  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };
  getModalContent = () => (
    <ModalContent
      onClose={this.onClose}
      isVisibleToAll={this.props.isVisibleToAll}
      isOrganizationClear={this.props.isOrganizationClear}
      isGovernmentClear={this.props.isGovernmentClear}
      isMilitaryClear={this.props.isMilitaryClear}
      firstlevelAgencyList={this.props.firstlevelAgencyList}
      visOrganizationList={this.props.visOrganizationList}
      cityList={this.props.cityList}
      visGovermentList={this.props.visGovermentList}
      militaryList={this.props.militaryList}
      visMilitaryList={this.props.visMilitaryList}
    />
  );
}

export default VisiableLevelModal;
