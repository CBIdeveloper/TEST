import React from 'react';

import DialogModal from '../DialogModal';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Divider from '../../../../lib/components/Divider/Divider';

import './MessageModal.scss';

class MessageModal extends DialogModal {
  constructor(message, onCloseFunction) {
    super();
    this.message = message;
    this.onCloseFunction = onCloseFunction;
  }

  getModalTitle = () => this.language.messageModal.title;

  getModalContent = () => (
    <div className="message-modal">
      <div className="message">{this.message}</div>
      <Divider />
      <div className="button-group">
        <ButtonDiv className="confirm-button" onClick={this.onMessageClose}>
          {this.language.messageModal.confirm}
        </ButtonDiv>
      </div>
    </div>
  );

  onMessageClose = () => {
    this.onCloseFunction();
    this.onClose();
  };
}

export default MessageModal;
