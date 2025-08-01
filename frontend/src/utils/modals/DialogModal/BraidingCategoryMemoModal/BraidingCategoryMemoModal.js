import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

class BraidingCategoryMemoModal extends DialogModal {
  getModalTitle = () => this.language.braidingCategoryMemoModal.title;

  getModalContent = () => (
    <ModalContent language={this.language} onClose={this.onClose} />
  );
}

export default BraidingCategoryMemoModal;
