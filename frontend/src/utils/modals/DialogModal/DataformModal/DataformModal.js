import React from 'react';
import store from '../../../../store/store';
import DialogModal from '../DialogModal';

import ModalContent from './ModalContent/ModalContent';
import { reserveCloseDialogModal } from '../../../../store/modal/slice';
import './DataformModal.scss';

class DataformModal extends DialogModal {
  constructor(props) {
    super(props);
    this.props = props;
    // console.log(props)
  }

  getModalTitle = () => (
    <div className="data-form-modal">
      <div className="data-form-modal-title">態樣分析</div>
      <div className="data-form-modal-name">●{this.props.name2}</div>
      <div className="data-form-modal-transat">
        傳輸時間:{this.props.sendTime}
      </div>
    </div>
  );

  onClose = () => {
    store.dispatch(reserveCloseDialogModal());
  };
  getModalContent = () => (
    <ModalContent
      onClose={this.onClose}
      code={this.props.code}
      cloudDataCount={this.props.cloudDataCount}
      transCount={this.props.transCount}
      troadCount={this.props.troadCount}
      sftpCount={this.props.sftpCount}
      count={this.props.count}
      count2={this.props.count2}
      resultArray={this.props.resultArray}
    />
  );
}

export default DataformModal;
