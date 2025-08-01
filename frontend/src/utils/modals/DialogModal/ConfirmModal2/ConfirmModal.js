import React from 'react';
import store from '../../../../store/store';

import BaseModal from '../../BaseModal';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';

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

  getModalTitle = () => '提醒視窗';

  getModalContent = () => (
    <div className="confirm-modal2">
      <div className="message2">
        {'資料確認後，所屬動員機關將可接收已確認的資料，是否進行資料確認'}
      </div>
      <div className="button-group">
        <ButtonDiv className="cancel-button2" onClick={this.onClose}>
          {this.language.confirmModal.cancel}
        </ButtonDiv>
        <ButtonDiv className="confirm-button2" onClick={this.onClose}>
          {this.language.confirmModal.confirm}
        </ButtonDiv>
      </div>
    </div>
  );
}

export default ConfirmModal;
