import React from 'react';
import store from '../../../../store/store';

import BaseModal from '../../BaseModal';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Divider from '../../../../lib/components/Divider/Divider';

import {
  reserveCloseDialogModal,
  closeDialogModal,
} from '../../../../store/modal/slice';

import './ConfirmModal.scss';

class ConfirmModal extends BaseModal {
  constructor(confirmFunction) {
    super();
    this.confirmFunction = confirmFunction;
  }

  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };

  fullClose = () => {
    store.dispatch(closeDialogModal());
  };

  getModalTitle = () => this.language.confirmModal.title;

  getModalContent = () => (
    <div className="confirm-modal">
      <div className="message">{this.language.confirmModal.confirmMessage}</div>
      <Divider />
      <div className="button-group">
        <ButtonDiv className="cancel-button" onClick={this.onClose}>
          {this.language.confirmModal.cancel}
        </ButtonDiv>
        <ButtonDiv className="confirm-button" onClick={this.confirm}>
          {this.language.confirmModal.confirm}
        </ButtonDiv>
      </div>
    </div>
  );

  confirm = () => {
    this.confirmFunction(this.fullClose);
  };
}

export default ConfirmModal;
