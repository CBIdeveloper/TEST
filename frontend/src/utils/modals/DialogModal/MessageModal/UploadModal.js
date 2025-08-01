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
      <div className="message2">您所上傳的檔案已超過容量上限</div>
      <div className="message2">請壓縮後至25MB後上傳，謝謝您！</div>
      <Divider />
      <div className="button-group">
        <ButtonDiv className="confirm-button" onClick={this.onClose}>
          {this.language.errorModal.confirm}
        </ButtonDiv>
      </div>
    </div>
  );

}

export default UploadModal;
