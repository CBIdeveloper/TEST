import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

import './ImportModal.scss';
class ImportModal extends DialogModal {
    constructor({ code, city,firstlevelUnit }) {
      super();
      this.code = code;
    }
  
    getModalTitle = () => "資料匯入";
  
    getModalContent = () => (
      <ModalContent
        language={this.language}
        onClose={this.onClose}
        title={this.title}
        code={this.code}
      />
    );
  }
  
  export default ImportModal;