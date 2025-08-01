import React from 'react';
import store from '../../../../store/store';

import BaseModal from '../../BaseModal';
import ModalContent from './ModalContent/ModalContent';

import { reserveCloseDialogModal } from '../../../../store/modal/slice';

import './ReturnModal.scss';
class ReturnModal extends BaseModal {
  constructor() {
    super();
  }

  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };

  getModalTitle = () => '提醒視窗';

  getModalContent = () => <ModalContent onClose={this.onClose} />;
}

export default ReturnModal;
