import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

class BusinessManagementMemoModal extends DialogModal {
  getModalTitle = () => this.language.businessManagementMemoModal.title;

  getModalContent = () => (
    <ModalContent language={this.language} onClose={this.onClose} />
  );
}

export default BusinessManagementMemoModal;
