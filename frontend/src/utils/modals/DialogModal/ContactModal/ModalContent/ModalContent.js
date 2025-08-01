import React from 'react';
import { connect } from 'react-redux';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import { setLoading } from '../../../../../store/loading/slice';
import { getUserId } from '../../../../auth/auth';
import '../ContactModal.scss';
import ApiService from '../../../../api/ApiService';
import ContactDetailItem from '../../../../../components/RetrievalService/ContactInformation/ContactDetail/ContactDetailTabPage/ContactDetailItem/ContactDetailItem';
import icon1 from '../../../../../assets/images/contact/ics_01.png';
import icon2 from '../../../../../assets/images/contact/ics_02.png';
import icon4 from '../../../../../assets/images/contact/ics_04.png';
import icon6 from '../../../../../assets/images/contact/ics_06.png';
import icon7 from '../../../../../assets/images/contact/ics_07.png';
import icon8 from '../../../../../assets/images/contact/ics_08.png';
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
    if (props.data.mobilizationPlanText == '行政院動員會報') {
      return (
        <ContactDetailItem
          key={props.data.name}
          content={props.data}
          color={'color-contact-1'}
          icon={icon1}
        />
      );
    } else if(props.data.mobilizationPlanText == "戰綜會報" || props.data.mobilizationPlanText.includes("軍事")) {
      return (
        <ContactDetailItem
          key={props.data.name}
          content={props.data}
          color={'color-contact-2'}
          icon={icon2}
        />
      );
    } else if(props.data.mobilizationPlanText.includes("經濟")) {
      return (
        <ContactDetailItem
          key={props.data.name}
          content={props.data}
          color={'color-contact-8'}
          icon={icon8}
        />
      );
    } else if(props.data.mobilizationPlanText.includes("衛生")) {
      return (
        <ContactDetailItem
          key={props.data.name}
          content={props.data}
          color={'color-contact-6'}
          icon={icon6}
        />
      );
    } else if(props.data.agencyName === "中央機關" && props.data.mobilizationPlanText.includes("部")) {
      return (
        <ContactDetailItem
          key={props.data.name}
          content={props.data}
          color={'color-contact-4'}
          icon={icon4}
        />
      );
    } else if(props.data.mobilizationPlanText === "維護廠商") {
      return (
        <ContactDetailItem
          key={props.data.name}
          content={props.data}
          color={'color-contact-11'}
          icon={icon7}
        />
      );
    } else {
      return (
        <ContactDetailItem
          key={props.data.name}
          content={props.data}
          color={'color-contact-10'}
          icon={icon10}
        />
      );
    }
    // return (
    //   <ContactDetailItem
    //     key={props.data.name}
    //     content={props.data}
    //     color={'color-contact-10'}
    //     icon={icon10}
    //   />
    // );
  };
  initState = () => {};

  render() {
    const { props, state } = this;
    // console.log(state.reasonCount);
    return (
      <div className="editor-modal">
        <SectionTitle title={'詳細資料'} />
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
