import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import './ContactInfomationActionCell.scss';
import { setLoading } from '../../../../store/loading/slice';
import ModalHelper from '../../../../utils/helper/ModalHelper';
class ContactInfomationActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  openModal = () => {
    const { props } = this;
    // console.log(props.cell.row.original);
    const fullnames = props.cell.row.original.braidingCategories
      .map((item) => item.fullName)
      .join(',');
    let data = {};
    data.name = props.cell.row.original.name;
    data.email = props.cell.row.original.email;
    data.agencyName = props.cell.row.original.agencyName;
    data.jobPosition = props.cell.row.original.jobPosition;
    data.workPlace = props.cell.row.original.workPlace;
    data.fullTelephone = props.cell.row.original.fullPhone;
    data.mobilizationPlanText = props.cell.row.original.mobilizationPlanText;
    ModalHelper.openContactModal(data);
  };
  render() {
    const { props, state } = this;
    return (
      <div className="contact-information-detail">
        <ButtonDiv
          className="contact-information-button"
          onClick={this.openModal}
        >
          詳細資料
        </ButtonDiv>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

ContactInfomationActionCell.defaultProps = {
  limitSize: true,
  sizeLimitInMb: 50,
};

ContactInfomationActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  sizeLimitInMb: PropTypes.number,
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactInfomationActionCell),
);
