import React from 'react';
import store from '../../../../store/store';

import DialogModal from '../DialogModal';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Divider from '../../../../lib/components/Divider/Divider';

import { reserveCloseDialogModal } from '../../../../store/modal/slice';

import './ErrorModal.scss';

class ErrorModal extends DialogModal {
  constructor(message) {
    super();
    this.message = message;
  }

  onClose = () => {
    // store.dispatch(setLoading(true));
    // store.dispatch(setLoading(false));
    store.dispatch(reserveCloseDialogModal());
  };

  getModalTitle = () => this.language.errorModal.title;

  getModalContent = () => (
    <div className="error-modal">
      <div className="message">{this.message}</div>
      <Divider />
      <div className="button-group">
        <ButtonDiv className="confirm-button" onClick={this.onClose}>
          {this.language.errorModal.confirm}
        </ButtonDiv>
      </div>
    </div>
  );
}

export default ErrorModal;
