import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { MdRemoveCircle } from 'react-icons/md';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import ModalHelper from '../../../../utils/helper/ModalHelper';

import './FileInput.scss';

class FileInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { fileKey: '' };
    this.uploadInputRef = React.createRef();
  }

  resetFileInput = () => {
    const { props } = this;
    const randomString = Math.random().toString(36);
    this.setState({ fileKey: randomString });
    props.setFieldValue(props.inputName, '');
  };

  uploadFileOnClicked = () => {
    this.uploadInputRef.current.click();
  };

  displayFileName = () => {
    const { props } = this;
    return props.inputValue !== '' ? (
      <div className="file">
        <div>{props.inputValue.name}</div>
        <ButtonDiv className="delete-container" onClick={this.resetFileInput}>
          <MdRemoveCircle size={24} className="delete-icon" />
        </ButtonDiv>
      </div>
    ) : (
      <div className="file">{props.language.fileInput.noUpload}</div>
    );
  };

  onFileChanged = (event) => {
    const { props } = this;
    const file = event.target.files[0];
    if (props.limitSize && file.size > props.sizeLimitInMb * 1048576) {
      ModalHelper.openErrorModal({
        message: props.language.fileInput.fileTooLarge,
      });
    } else {
      props.setFieldValue(props.inputName, file);
    }
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  acceptFileExtension = () => {
    const { props } = this;
    return props.acceptFileExtension.length === 0
      ? '*'
      : props.acceptFileExtension.join(',');
  };

  render() {
    const { props, state } = this;

    return (
      <div className="file-input">
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <div className="input-container">
          <div className="file-input-container">
            <ButtonDiv
              className="upload-file-button"
              onClick={this.uploadFileOnClicked}
            >
              {props.inputPlaceholder}
            </ButtonDiv>
            <input
              type="file"
              className="file-input"
              name="upload_file"
              ref={this.uploadInputRef}
              key={state.fileKey || ''}
              onChange={this.onFileChanged}
              accept={this.acceptFileExtension()}
            />
            <div className="file-name">
              <div className="file-name-title">
                {props.language.fileInput.fileName}
              </div>
              {this.displayFileName()}
            </div>
          </div>
          <div className="message-section">
            {props.touched[props.inputName] &&
              props.errors[props.inputName] && (
                <div className="error-message">
                  {props.errors[props.inputName]}
                </div>
            )}
            {props.errorMessage !== '' ? (
              <div className="error-message">{props.errorMessage}</div>
            ) : (
              ''
            )}
            {props.description !== '' ? (
              <div className="input-description">{props.description}</div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

FileInput.defaultProps = {
  inputValue: '',
  touched: {},
  errors: {},
  errorMessage: '',
  description: '',
  required: false,
  limitSize: true,
  sizeLimitInMb: 10,
  acceptFileExtension: [],
};

FileInput.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  inputValue: PropTypes.oneOfType([
    PropTypes.instanceOf(File),
    PropTypes.string,
    PropTypes.objectOf(Object),
  ]),
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  errorMessage: PropTypes.string,
  description: PropTypes.string,
  required: PropTypes.bool,
  limitSize: PropTypes.bool,
  sizeLimitInMb: PropTypes.number,
  acceptFileExtension: PropTypes.arrayOf(Object),
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FileInput),
);
