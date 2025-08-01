import React from 'react';
import store from '../../../../store/store';
import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';
import { reserveCloseDialogModal } from '../../../../store/modal/slice';
import './NotCorrectModal.scss';

class NotCorrectModal extends DialogModal {
  constructor(props) {
    super(props);
    this.props = props;
    // console.log(props)
  }

  getModalTitle = () => (
    <div className="not-correct-modal">
      <div className="not-correct-modal-title">不合規原因分析</div>
      <div className="not-correct-modal-name">●{this.props.name2}</div>
      <div className="not-correct-modal-transat">
        傳輸時間:{this.props.transAt}&nbsp;&nbsp;
      </div>
    </div>
  );

  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };
  getModalContent = () => (
    <ModalContent
      onClose={this.onClose}
      id={this.props.id}
      code={this.props.code}
      updatedUserAccountId={this.props.updatedUserAccountId}
      name2={this.props.name2}
      editAgency={this.props.editAgency}
      transAt={this.props.transAt}
      complianceQuantity={this.props.complianceQuantity}
      nonComplianceQuantity={this.props.nonComplianceQuantity}
    />
  );
}

export default NotCorrectModal;
