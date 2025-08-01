import React from 'react';
import store from '../../../../store/store';
import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';
import { reserveCloseDialogModal } from '../../../../store/modal/slice';
import './EditorModal.scss';

class NotCorrectModal extends DialogModal {
  constructor(props) {
    super(props);
    this.props = props;
  }

  getModalTitle = () => '聯絡資訊';

  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };
  getModalContent = () => (
    <ModalContent onClose={this.onClose} data={this.props.data} />
  );
}

export default NotCorrectModal;
