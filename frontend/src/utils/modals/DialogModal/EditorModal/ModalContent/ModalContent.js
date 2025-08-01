import React from 'react';
import { connect } from 'react-redux';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import { setLoading } from '../../../../../store/loading/slice';
import { getUserId } from '../../../../auth/auth';
import '../EditorModal.scss';
import ApiService from '../../../../api/ApiService';
import ContactDetailItem from '../../../../../components/RetrievalService/ContactInformation/ContactDetail/ContactDetailTabPage/ContactDetailItem/ContactDetailItem';
import icon10 from '../../../../../assets/images/contact/ics_10.png';
class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.initState();
  }
  displayContactList = () => {
    const { props, state } = this;
    return (
      <ContactDetailItem
        key={props.data.name}
        content={props.data}
        color={'color-contact-10'}
        icon={icon10}
      />
    );
  };
  initState = () => {};

  render() {
    const { props, state } = this;
    // console.log(state.reasonCount);
    return (
      <div className="editor-modal">
        <SectionTitle title={'聯絡資訊'} />
        <div className="contact-item-container">
          {this.displayContactList()}
        </div>
        <div className="button-group">
          <ButtonDiv className="confirm-button" onClick={props.onClose}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
