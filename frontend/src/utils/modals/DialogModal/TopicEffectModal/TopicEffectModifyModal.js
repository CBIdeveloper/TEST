import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModifyModalContent';

import './TopicEffectModal.scss';

class TopicEffectModifyModal extends DialogModal {
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

export default TopicEffectModifyModal;
