import React from 'react';

import DialogModal from '../DialogModal';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Divider from '../../../../lib/components/Divider/Divider';

import './GeneralDeleteModal.scss';

class GeneralDeleteModal extends DialogModal {
  constructor({ title, message, deleteFunction, deleteButtonText }) {
    super();
    this.title = title;
    this.message = message;
    this.deleteFunction = deleteFunction;
    this.deleteButtonText = deleteButtonText || this.language.deleteModal.delete;
  }

  getModalTitle = () => this.title;

  getModalContent = () => (
    <div className="general-delete-modal">
      <div className="message">{this.message}</div>
      <Divider />
      <div className="button-group">
        <ButtonDiv className="cancel-button" onClick={this.onClose}>
          {this.language.deleteModal.cancel}
        </ButtonDiv>
        <ButtonDiv className="delete-button" onClick={this.delete}>
          {this.deleteButtonText}
        </ButtonDiv>
      </div>
    </div>
  );

  delete = () => {
    this.deleteFunction(this.onClose);
  };
}

export default GeneralDeleteModal;
