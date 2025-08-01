import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Divider from '../../../../../lib/components/Divider/Divider';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';

import '../UploadFileModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { uploadFile: null };
    this.uploadInputRef = React.createRef();
  }

  uploadFileOnClicked = () => {
    this.uploadInputRef.current.click();
  };

  displayFileName = () => {
    const { props, state } = this;
    return state.uploadFile !== null ? (
      <div className="file">{state.uploadFile.name}</div>
    ) : (
      <div className="file">{props.language.uploadFileModal.noUpload}</div>
    );
  };

  uploadButtonClassname = () => {
    const { state } = this;
    return state.uploadFile !== null
      ? 'upload-button'
      : 'upload-button disabled';
  };

  handleUploadOnClicked = () => {
    const { props, state } = this;
    if (state.uploadFile !== null) {
      props.upload(state.uploadFile);
    }
  };

  render() {
    const { props } = this;

    return (
      <div className="upload-file-modal">
        <div className="input-container">
          <ButtonDiv
            className="upload-file-button"
            onClick={this.uploadFileOnClicked}
          >
            {props.language.uploadFileModal.uploadFile}
          </ButtonDiv>
          <input
            type="file"
            className="file-input"
            name="upload_file"
            ref={this.uploadInputRef}
            onChange={(event) => {
              this.setState({ uploadFile: event.target.files[0] });
            }}
          />
          <div className="file-name">
            <div className="file-name-title">
              {props.language.uploadFileModal.fileName}
            </div>
            {this.displayFileName()}
          </div>
        </div>
        <Divider />
        <div className="button-group">
          <ButtonDiv className="cancel-button" onClick={props.onClose}>
            {props.language.uploadFileModal.cancel}
          </ButtonDiv>
          <ButtonDiv
            className={this.uploadButtonClassname()}
            onClick={this.handleUploadOnClicked}
          >
            {props.language.uploadFileModal.upload}
          </ButtonDiv>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ModalContent.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  onClose: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
