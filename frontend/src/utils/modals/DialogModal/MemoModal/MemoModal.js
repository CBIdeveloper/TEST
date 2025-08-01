import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

import './MemoModal.scss';

class MemoModal extends DialogModal {
  getModalTitle = () => this.language.memoModal.title;

  getModalContent = () => (
    <ModalContent language={this.language} onClose={this.onClose} />
  );
}

export default MemoModal;
