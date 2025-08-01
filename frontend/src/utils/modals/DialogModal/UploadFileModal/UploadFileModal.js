import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

class UploadFileModal extends DialogModal {
  constructor(uploadFunction) {
    super();
    this.state = { uploadFile: null };
    this.uploadFunction = uploadFunction;
  }

  getModalTitle = () => this.language.uploadFileModal.title;

  getModalContent = () => (
    <ModalContent
      onClose={this.onClose}
      upload={this.upload}
      language={this.language}
    />
  );

  upload = (file) => {
    this.uploadFunction({ file, onClose: this.onClose });
  };
}

export default UploadFileModal;
