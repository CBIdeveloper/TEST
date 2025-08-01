import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import { setLoading } from '../../../../../store/loading/slice';
import ModalHelper from '../../../../helper/ModalHelper';
import { MdRemoveCircle } from 'react-icons/md';
import { withRouter } from 'react-router-dom';
import '../ImportModal.scss';
import MultipleFileInput2 from '../../../../../lib/components/inputs/MultipleFileInput/MultipleFileInput2';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { fileKey: '', file: '', coverData: 'yes', fileName: [] };
    this.uploadInputRef = React.createRef();
    this.handleCoverDataChange = this.handleCoverDataChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    this.initState();
  }

  setCoverData = (coverData) => {
    this.setState({ coverData });
  };

  initState = () => {};

  handleIsFileOnChanged = ({ field, value }) => {
    this.setState({ [field]: value });
  };

  handleCoverDataChange(value) {
    this.setCoverData(value);
  }

  handleUpload() {
    const { coverData, file, fileName } = this.state;
    for (let i = 0; i < file.length; i++) {
      fileName[i] = file[i].name;
    }
    this.processFiles(file).then((processedFiles) => {
      if (processedFiles) {
        if (coverData === 'yes') {
          ModalHelper.openConfirmModal3({
            title: '檔案上傳',
            id: this.props.code,
            file: processedFiles,
            fileName: fileName,
            cover: true,
          });
        } else if (coverData === 'no') {
          ModalHelper.openFileUploadModal({
            title: '檔案上傳',
            id: this.props.code,
            file: processedFiles,
            fileName: fileName,
            cover: false,
          });
        }
      } else {
        ModalHelper.openConfirmModal4({
          title: '檔案上傳',
        });
      }
    });
  }

  processFiles = (files) => {
    return Promise.all(
      files.map(async (file) => {
        if (file.type.startsWith('text/')) {
          const fileContent = await this.readFile(file);
          const cleanedContent = DOMPurify.sanitize(fileContent, {
            ALLOWED_TAGS: ['p', 'b', 'i', 'u', 'strong'],
            ALLOWED_ATTR: [],
          });
          return new File([cleanedContent], file.name, { type: file.type });
        } else {
          return file;
        }
      }),
    );
  };
  
  readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  render() {
    const { props, state } = this;
    return (
      <div className="import-modal">
        <FormRow>
          <MultipleFileInput2
            title={'資料上傳'}
            inputName="file"
            inputPlaceholder={'選擇檔案'}
            inputValue={state.file}
            setFieldValue={(field, value) => {
              this.handleIsFileOnChanged({
                value,
                field,
              });
            }}
            description={'檔案格式限定:xlsx'}
            acceptFileExtension={['.xlsx']}
            onCoverDataChange={this.handleCoverDataChange}
          />
        </FormRow>
        <div className="horizon">
          <ButtonDiv className="action-button" onClick={this.props.onClose}>
            {'取消'}
          </ButtonDiv>
          <ButtonDiv className="action-button2" onClick={this.handleUpload}>
            {'上傳'}
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
