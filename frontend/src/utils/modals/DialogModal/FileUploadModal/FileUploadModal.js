import React from 'react';
import store from '../../../../store/store';

import BaseModal from '../../BaseModal';
import ModalContent from './ModalContent/ModalContent';

import { reserveCloseDialogModal } from '../../../../store/modal/slice';

import './FileUploadModal.scss';

class FileUploadModal extends BaseModal {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      progress: 0,
    };
  }

  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };

  getModalTitle = () => this.props.title;

  getModalContent = () => (
    <div className="file-upload-modal">
      <ModalContent
        id={this.props.id}
        file={this.props.file}
        fileName={this.props.fileName}
        onClose={this.onClose}
        cover={this.props.cover}
      />
    </div>
  );
}

export default FileUploadModal;
