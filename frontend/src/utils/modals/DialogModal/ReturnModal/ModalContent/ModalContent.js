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
class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initState();
  }

  initState = () => {};

  returnCloudData = () => {
    const { props, state } = this;
    props.history.goBack();
    this.props.onClose();
  };

  render() {
    const { props, state } = this;
    return (
      <div className="return-modal">
        <div className="text">
          回上一頁不會儲存任何以修改得資料，是否確認不存檔回上一頁
        </div>
        <div className="button-group">
          <ButtonDiv className="cancel-button" onClick={this.props.onClose}>
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

ModalContent.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContent),
);
