import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ExportModalContent';

import './TopicEffectModal.scss';

class TopicEffectExportModal extends DialogModal {
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
    />
  );
}

export default TopicEffectExportModal;
