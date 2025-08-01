import React from 'react';
import store from '../../../../store/store';
import DialogModal from '../DialogModal';
import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import ModalContent from './ModalContent/ModalContent';
import { reserveCloseDialogModal } from '../../../../store/modal/slice';
import './RequestModal.scss';
class RequestModal extends DialogModal {
  constructor(props) {
    super(props);
    this.props = props;
    // console.log(props);
  }
  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };
  getModalTitle = () => '回饋表單';
  getModalContent = () => (
    <ModalContent onClose={this.onClose} data={this.props} />
  );
}
export default RequestModal;
