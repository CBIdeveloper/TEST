import React from 'react';
import store from '../../../../store/store';
import DialogModal from '../DialogModal';
import { reserveCloseDialogModal } from '../../../../store/modal/slice';
import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Divider from '../../../../lib/components/Divider/Divider';

import './MessageModal.scss';

class UploadModal extends DialogModal {
  constructor() {
    super();
  }
  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };
  getModalTitle = () => this.language.messageModal.title;

  getModalContent = () => (
    <div className="message-modal">
      <div className="message2">送出成功</div>
      <div className="button-group">
        <ButtonDiv className="confirm-button" onClick={this.onClose}>
          {this.language.errorModal.confirm}
        </ButtonDiv>
      </div>
    </div>
  );
}

export default UploadModal;
