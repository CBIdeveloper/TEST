import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

class AcceptInformationRetrievalModal extends DialogModal {
  getModalTitle = () => this.language.acceptInformationRetrievalModal.title;

  getModalContent = () => (
    <ModalContent language={this.language} onClose={this.onClose} />
  );
}

export default AcceptInformationRetrievalModal;
