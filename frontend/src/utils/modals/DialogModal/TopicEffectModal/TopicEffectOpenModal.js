import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/OpenModalContent';

import './TopicEffectModal.scss';

class TopicEffectOpenModal extends DialogModal {
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

export default TopicEffectOpenModal;
