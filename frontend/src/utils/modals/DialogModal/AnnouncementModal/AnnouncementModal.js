import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

import './AnnouncementModal.scss';

class AnnouncementModal extends DialogModal {
  constructor({ id }) {
    super();
    this.id = id;
  }

  getModalTitle = () => this.language.announcementModal.modalTitle;

  getModalContent = () => (
    <ModalContent
      language={this.language}
      onClose={this.onClose}
      id={this.id}
    />
  );
}

export default AnnouncementModal;
