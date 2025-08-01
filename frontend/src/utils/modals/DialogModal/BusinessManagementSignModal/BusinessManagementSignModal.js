import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

import './BusinessManagementSignModal.scss';

class BusinessManagementSignModal extends DialogModal {
  constructor({ title, id }) {
    super();
    this.title = title;
    this.id = id;
  }

  getModalTitle = () => this.title;

  getModalContent = () => (
    <ModalContent
      language={this.language}
      onClose={this.onClose}
      title={this.title}
      id={this.id}
    />
  );
}

export default BusinessManagementSignModal;
