import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

class PlanUpdateMemoModal extends DialogModal {
  getModalTitle = () => this.language.planUpdateMemoModal.title;

  getModalContent = () => (
    <ModalContent language={this.language} onClose={this.onClose} />
  );
}

export default PlanUpdateMemoModal;
