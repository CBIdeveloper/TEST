import React from 'react';
import store from '../../../../store/store';
import DialogModal from '../DialogModal';
import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import ModalContent from './ModalContent/ModalContent';
import { reserveCloseDialogModal } from '../../../../store/modal/slice';
import './RequestAnswerModal.scss';
class RequestAnswerModal extends DialogModal {
  constructor(props) {
    super(props);
    this.props = props;
    // console.log(props);
  }
  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };
  getModalTitle = () => '統計項目';
  getModalContent = () => (
    <ModalContent onClose={this.onClose} data={this.props} />
  );
}
export default RequestAnswerModal;
