import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import { setLoading } from '../../../../../store/loading/slice';
import ModalHelper from '../../../../helper/ModalHelper';
import { MdRemoveCircle } from 'react-icons/md';
import { withRouter } from 'react-router-dom';
import '../ReturnModal.scss';
import MultipleFileInput2 from '../../../../../lib/components/inputs/MultipleFileInput/MultipleFileInput2';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import ApiService from '../../../../api/ApiService';
class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { props, state } = this;
    this.initState();
  }

  initState = () => {
    const { props, state } = this;
    // console.log("111111111111")
  };

  returnCloudData = async () => {
    const { props, state } = this;
    let cq = 0;
    let ncq = 0;
    if (
      props.limitSize ||
      props.updatedDtoKeyDatas.size > props.sizeLimitInMb * 1048576
    ) {
      // console.log(props.updatedDtoKeyDatas);
      for (let i = 0; i < props.dataLength; i++) {
        if (
          props.updatedDtoKeyDatas[i].DeletedAt == '' ||
          props.updatedDtoKeyDatas[i].DeletedAt == undefined
        ) {
          if (props.updatedDtoKeyDatas[i].NonComplianceReason != '') {
            ncq++;
          } else {
            cq++;
          }
        }
      }
      const formData = new FormData();
      formData.append('code', props.code);
      formData.append(
        'updatedDtoKeyDatas',
        JSON.stringify(props.updatedDtoKeyDatas),
      );
      props.setLoading(true);
      ApiService.cloudDataEditService.coverData(formData);
      let data = await ApiService.fileUpload.getDataByCode(props.code);
      let id = [];
      for (let i = 0; i < data.fileUploadList.length; i++) {
        id.push(data.fileUploadList[i].id);
      }
      // console.log(id.length,ncq,cq)
      if (id.length == 0 && (ncq > 0 || cq > 0)) {
        ApiService.fileUpload.uploadEditFile(props.code).then((response) => {
          console.log(response.data.id);
          id.push(response.data.id);
          const formData2 = new FormData();
          formData2.append('id', id);
          formData2.append('cq', cq);
          formData2.append('ncq', ncq);
          ApiService.fileUpload.updateQuantity(formData2);
          props.history.goBack();
          this.props.onClose();
        });
      } else {
        const formData2 = new FormData();
        formData2.append('id', id);
        formData2.append('cq', cq);
        formData2.append('ncq', ncq);
        ApiService.fileUpload.updateQuantity(formData2);
        props.setLoading(false);
        props.history.goBack();
        this.props.onClose();
      }
    } else {
      props.history.goBack();
      this.props.onClose();
    }
  };

  cancel = () => {
    this.props.onClose();
  }

  render() {
    const { props, state } = this;
    return (
      <div className="return-modal2">
        <div className="text">
          請確認資料已編輯完成，存檔後需稍待系統重新檢核資料格式
        </div>
        <div className="button-group">
          <ButtonDiv className="cancel-button" onClick={this.cancel}>
            {'取消'}
          </ButtonDiv>
          <ButtonDiv className="confirm-button" onClick={this.returnCloudData}>
            {'確認'}
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

ModalContent.defaultProps = {
  limitSize: true,
  sizeLimitInMb: 50,
};

ModalContent.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  limitSize: PropTypes.bool,
  sizeLimitInMb: PropTypes.number,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContent),
);
