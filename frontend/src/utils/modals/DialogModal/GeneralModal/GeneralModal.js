import React from 'react';
import store from '../../../../store/store';

import DialogModal from '../DialogModal';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Divider from '../../../../lib/components/Divider/Divider';

import { closeDialogModal } from '../../../../store/modal/slice';

import './GeneralModal.scss';

class GeneralModal extends DialogModal {
  constructor(title, message, onCloseFunction) {
    super();
    this.title = title;
    this.message = message;
    this.onCloseFunction = onCloseFunction;
  }

  onClose = () => {
    store.dispatch(closeDialogModal());
    this.onCloseFunction();
  };

  getModalTitle = () => this.title;

  getModalContent = () => (
    <div className="general-modal">
      <div className="message">{this.message}</div>
      <Divider />
      <div className="button-group">
        <ButtonDiv className="confirm-button" onClick={this.onGeneralClose}>
          {this.language.messageModal.confirm}
        </ButtonDiv>
      </div>
    </div>
  );

  onGeneralClose = () => {
    this.onClose();
  };
}

export default GeneralModal;
