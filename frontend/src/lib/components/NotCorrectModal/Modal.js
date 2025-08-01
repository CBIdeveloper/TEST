import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../ButtonDiv/ButtonDiv';

import './Modal.scss';

import close from '../../../assets/images/icons/close.png';

class Modal extends React.PureComponent {
  modalTypeClass = () => {
    const { sizeType } = this.props;
    let classname = '';
    if (sizeType === 'fixed') {
      classname = 'fixed-size';
    } else if (sizeType === 'fit') {
      classname = '';
    } else if (sizeType === 'full-height') {
      classname = 'full-height';
    }
    return classname;
  };

  topModalClass = () => {
    const { top } = this.props;
    return top ? 'top' : '';
  };

  render() {
    const { props } = this;
    if (!props.show) return '';
    return (
      <div className="modal-wrapper">
        <div
          className={`modal ${
            props.modalClassName
          } ${this.modalTypeClass()} ${this.topModalClass()}`}
        >
          <div className={`modal-header ${props.headerClassname}`}>
            <div>{props.header}</div>
            <ButtonDiv
              className="close-button-container"
              onClick={() => props.onClose()}
            >
              {props.isCloseBtn && (
                <img src={close} className="close-button" alt="close" />
              )}
            </ButtonDiv>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className={`modal-ender ${props.enderClassname}`}>
            <div>{props.ender}</div>
          </div>
        </div>
        <ButtonDiv
          className={`backdrop ${this.topModalClass()}`}
          onClick={() => props.onClose()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

Modal.defaultProps = {
  sizeType: 'fixed',
  top: false,
  modalClassName: '',
  headerClassname: '',
  enderClassname: '',
  isCloseBtn: true,
};

Modal.propTypes = {
  sizeType: PropTypes.string,
  show: PropTypes.bool.isRequired,
  isCloseBtn: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  top: PropTypes.bool,
  modalClassName: PropTypes.string,
  headerClassname: PropTypes.string,
  ender: PropTypes.string.isRequired,
  enderClassname: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
