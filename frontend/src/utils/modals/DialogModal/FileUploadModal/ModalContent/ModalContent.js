import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import { setLoading } from '../../../../../store/loading/slice';
import ModalHelper from '../../../../helper/ModalHelper';
import { MdRemoveCircle } from 'react-icons/md';
import { withRouter } from 'react-router-dom';
import '../FileUploadModal.scss';
import MultipleFileInput2 from '../../../../../lib/components/inputs/MultipleFileInput/MultipleFileInput2';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import ApiService from '../../../../api/ApiService';
import FileRecordRequest from '../../../../../../src/utils/dataModels/FileRecord/FileRecordRequest';
class ModalContent extends React.PureComponent {
  constructor(props) {
    // console.log(props)
    super(props);
    this.state = {
      progress: 0,
    };
  }

  componentDidMount() {
    this.initState();
    
  }

  initState = () => {
    const id = this.props.id;
    const cover = this.props.cover;
    let totalProgress = 0;
    const city = this.props.city;
    const firstlevelUnit = this.props.firstlevelUnit;
    if (this.props.file) {
      const formData = new FormData();
      formData.append('code', id);
      formData.append('cover', cover);
      this.props.file.forEach((file) => {
        formData.append(`files`, file);
      });

      ApiService.fileUpload
        .uploadFiles(formData, (event) => {
          if (event.lengthComputable) {
            totalProgress = (event.loaded / event.total) * 100;
            this.setState({ progress: totalProgress });
          }
        })
        .then(() => {
          this.setState({ progress: 100 });
          window.location.reload();
        });
    }
  };

  render() {
    return (
      <div className="file-upload-modal">
        <div className="file-upload-message">{'檔案上傳進度'}</div>
        <div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${this.state.progress}%` }}
            ></div>
          </div>
          <div className="progress-percentage">{this.state.progress + '%'}</div>
        </div>

        <div className="file-upload-message2">
          {'上傳中:' + this.props.fileName}
        </div>
        <span className="file-upload-message3">
          {'▲提醒您，檔案上傳後系統將批次匯入資料，並於匯入完成後寄信通知您'}
        </span>
        <div className="button-group">
          <ButtonDiv className="cancel-button" onClick={this.props.onClose}>
            {'取消'}
          </ButtonDiv>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContent),
);
