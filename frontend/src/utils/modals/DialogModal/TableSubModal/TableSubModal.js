import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

import './TableSubModal.scss';

class TableModal extends DialogModal {
  constructor({ modalTitle, sectionTitle, TableClass, typeId }) {
    super();
    this.modalTitle = modalTitle;
    this.sectionTitle = sectionTitle;
    this.TableClass = TableClass;
    this.typeId = typeId;
  }

  getModalTitle = () => this.modalTitle;

  getModalContent = () => (
    <ModalContent
      language={this.language}
      onClose={this.onClose}
      title={this.sectionTitle}
      TableClass={this.TableClass}
      typeId={this.typeId}
    />
  );
}

export default TableModal;
