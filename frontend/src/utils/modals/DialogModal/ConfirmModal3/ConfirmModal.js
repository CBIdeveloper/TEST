import React from 'react';
import store from '../../../../store/store';

import BaseModal from '../../BaseModal';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import ModalHelper from '../../../helper/ModalHelper';
import {
  reserveCloseDialogModal,
  closeDialogModal,
} from '../../../../store/modal/slice';

import './ConfirmModal.scss';

class ConfirmModal extends BaseModal {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };
  openModal = () => {
    ModalHelper.openFileUploadModal({
      title: '檔案上傳',
      id: this.props.id,
      file: this.props.file,
      fileName: this.props.fileName,
      cover: this.props.cover,
    });
  };
  getModalTitle = () => '提醒視窗';

  getModalContent = () => (
    <div className="confirm-modal2">
      <div className="message2">
        {'匯入將覆蓋前一次已匯入資料的資料，是否確認覆蓋?'}
      </div>
      <div className="button-group">
        <ButtonDiv className="cancel-button2" onClick={this.onClose}>
          {this.language.confirmModal.cancel}
        </ButtonDiv>
        <ButtonDiv className="confirm-button2" onClick={this.openModal}>
          {'確認覆蓋'}
        </ButtonDiv>
      </div>
    </div>
  );
}

export default ConfirmModal;
