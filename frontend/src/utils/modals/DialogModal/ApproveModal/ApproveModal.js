import React from 'react';

import DialogModal from '../DialogModal';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Divider from '../../../../lib/components/Divider/Divider';

import './ApproveModal.scss';

class ApproveModal extends DialogModal {
  constructor(approveFunction) {
    super();
    this.approveFunction = approveFunction;
  }

  getModalTitle = () => this.language.approveModal.title;

  getModalContent = () => (
    <div className="approve-modal">
      <div className="message">{this.language.approveModal.approveMessage}</div>
      <Divider />
      <div className="button-group">
        <ButtonDiv className="cancel-button" onClick={this.onClose}>
          {this.language.approveModal.cancel}
        </ButtonDiv>
        <ButtonDiv className="approve-button" onClick={this.approve}>
          {this.language.approveModal.approve}
        </ButtonDiv>
      </div>
    </div>
  );

  approve = () => {
    this.approveFunction(this.onClose);
  };
}

export default ApproveModal;
