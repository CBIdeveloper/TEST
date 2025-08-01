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

  getModalTitle = () => '提醒視窗';

  getModalContent = () => (
    <div className="confirm-modal4">
      <div className="message2">
        {'您尚未匯入資料'}
      </div>
      <div className="button-group">
        <ButtonDiv className="cancel-button2" onClick={this.onClose}>
          {this.language.confirmModal.cancel}
        </ButtonDiv>
      </div>
    </div>
  );
}

export default ConfirmModal;
