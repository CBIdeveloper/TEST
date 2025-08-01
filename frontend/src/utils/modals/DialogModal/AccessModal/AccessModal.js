import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

class AccessModal extends DialogModal {
  constructor({ roleId }) {
    super();
    this.roleId = roleId;
  }

  getModalTitle = () => this.language.accessModal.title;

  getModalContent = () => (
    <ModalContent
      language={this.language}
      onClose={this.onClose}
      roleId={this.roleId}
    />
  );
}

export default AccessModal;
