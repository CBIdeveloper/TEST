import React from 'react';
import store from '../../../../store/store';

import BaseModal from '../../BaseModal';
import ModalContent from './ModalContent/ModalContent';

import { reserveCloseDialogModal } from '../../../../store/modal/slice';

import './ReturnModal.scss';
class ReturnModal extends BaseModal {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };

  getModalTitle = () => '提醒視窗';

  getModalContent = () => (
    <ModalContent
      updatedDtoKeyDatas={this.props.updatedDtoKeyDatas}
      dataLength={this.props.dataLength}
      code={this.props.code}
      onClose={this.onClose}
      id={this.props.id}
    />
  );
}

export default ReturnModal;
