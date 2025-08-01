import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

import './BatchApprovalModal.scss';

class BatchApprovalModal extends DialogModal {
  constructor({ id }) {
    super();
    this.id = id;
  }

  getModalTitle = () => this.language.batchApprovalModal.title;

  getModalContent = () => (
    <ModalContent
      language={this.language}
      onClose={this.onClose}
      id={this.id}
    />
  );
}

export default BatchApprovalModal;
