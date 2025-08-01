import React from 'react';

import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';

import './BraidingCategoryReminderModel.scss';

class BraidingCategoryReminderModel extends DialogModal {
  constructor(props) {
    super(props);
    this.props = props;
  }

  getModalTitle = () => this.language.braidingCategoryReminderModal.modalTitle;

  getModalContent = () => (
    <ModalContent
      language={this.language}
      onClose={this.onClose}
      id={this.props.id}
      fullName={this.props.fullName}
      systemNum={this.props.systemNum}
      transmissionDate={this.props.transmissionDate}
    />
  );
}

export default BraidingCategoryReminderModel;
