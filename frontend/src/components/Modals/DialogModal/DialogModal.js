import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from '../../../lib/components/Modal/Modal';

import './DialogModal.scss';

class DialogModal extends React.PureComponent {
  modalTitle = () => {
    const { props } = this;
    return props.dialogModal.modalObject === null
      ? ''
      : props.dialogModal.modalObject.getModalTitle();
  };
  modalEnd = () => {
    const { props } = this;
    // return props.dialogModal.modalObject === null
    //   ? ''
    //   : props.dialogModal.modalObject.getModalEnd();
    return props.dialogModal.modalObject === null ? '' : '';
  };
  headerClassname = () => {
    const { props } = this;
    return props.dialogModal.modalObject === null
      ? ''
      : props.dialogModal.modalObject.getHeaderClassname();
  };

  modalContent = () => {
    const { props } = this;
    return props.dialogModal.modalObject === null
      ? ''
      : props.dialogModal.modalObject.getModalContent();
  };

  onClose = () => {
    const { props } = this;
    return props.dialogModal.modalObject === null
      ? () => {}
      : props.dialogModal.modalObject.onClose();
  };

  render() {
    const { props } = this;

    return (
      <Modal
        show={props.dialogModal.isModalOpen}
        sizeType="fit"
        header={this.modalTitle()}
        headerClassname={this.headerClassname()}
        onClose={this.onClose}
        ender={this.modalEnd()}
      >
        {this.modalContent()}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  dialogModal: state.modal.dialogModal,
});

const mapDispatchToProps = (dispatch) => ({});

DialogModal.propTypes = {
  dialogModal: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogModal);
