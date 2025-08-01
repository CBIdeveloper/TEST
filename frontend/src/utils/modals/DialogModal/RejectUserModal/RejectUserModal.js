import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

class RejectUserModal extends DialogModal {
  constructor({ id }) {
    super();
    this.id = id;
  }

  getModalTitle = () => this.language.rejectUserModal.title;

  getModalContent = () => (
    <ModalContent
      language={this.language}
      onClose={this.onClose}
      id={this.id}
    />
  );
}

export default RejectUserModal;
