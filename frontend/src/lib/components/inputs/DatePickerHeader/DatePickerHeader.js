import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import SelectInput from '../SelectInput/SelectInput';

import Months from '../../../../utils/constants/Months';
import Year from '../../../../utils/constants/Year';

import './DatePickerHeader.scss';

class DatePickerHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { years: [] };
  }

  componentDidMount() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = Year.minYear; year <= currentYear + 3; year += 1) {
      years.push({
        text: year,
        value: year,
      });
    }
    this.setState({ years });
  }

  disableLastYearButton = () => {
    const { props } = this;
    const isFirstYear = props.date.getFullYear() <= Year.minYear;
    return isFirstYear ? 'disabled' : '';
  };

  disableNextYearButton = () => {
    const { props } = this;
    const currentYear = new Date().getFullYear();
    const isLastYear = props.date.getFullYear() >= currentYear + 3;
    return isLastYear ? 'disabled' : '';
  };

  disablePreviousButton = () => {
    const { props } = this;
    const isFirstYear = props.date.getFullYear() <= Year.minYear;
    const isJanuary = props.date.getMonth() === 0;
    return isFirstYear && isJanuary ? 'disabled' : '';
  };

  disableNextButton = () => {
    const { props } = this;
    const currentYear = new Date().getFullYear();
    const isLastYear = props.date.getFullYear() >= currentYear + 3;
    const isDecember = props.date.getMonth() === 11;
    return isLastYear && isDecember ? 'disabled' : '';
  };

  handleLastYearOnClicked = () => {
    const { props } = this;
    const currentYear = props.date.getFullYear();
    props.changeYear(currentYear - 1);
  };

  handleNextYearOnClicked = () => {
    const { props } = this;
    const currentYear = props.date.getFullYear();
    props.changeYear(currentYear + 1);
  };

  render() {
    const { props, state } = this;

    return (
      <div className="date-picker-header">
        <div className="date-button-container">
          <ButtonDiv
            className={`previous-year-button ${this.disableLastYearButton()}`}
            onClick={this.handleLastYearOnClicked}
          >
            <HiChevronDoubleLeft size={18} className="icon" />
          </ButtonDiv>

          <ButtonDiv
            className={`previous-month-button ${this.disablePreviousButton()}`}
            onClick={props.decreaseMonth}
          >
            <MdNavigateBefore size={24} className="icon" />
          </ButtonDiv>
        </div>

        <div className="year-selector">
          <SelectInput
            title=""
            inputName=""
            placeHolder={false}
            inputValue={props.date.getFullYear()}
            setFieldValue={(field, value) => {
              props.changeYear(value);
            }}
            options={state.years}
          />
        </div>

        <div className="month-selector">
          <SelectInput
            title=""
            inputName=""
            placeHolder={false}
            inputValue={props.date.getMonth()}
            setFieldValue={(field, value) => {
              props.changeMonth(value);
            }}
            options={Months}
          />
        </div>

        <div className="date-button-container">
          <ButtonDiv
            className={`next-month-button ${this.disableNextButton()}`}
            onClick={props.increaseMonth}
          >
            <MdNavigateNext size={24} className="icon" />
          </ButtonDiv>

          <ButtonDiv
            className={`next-year-button ${this.disableNextYearButton()}`}
            onClick={this.handleNextYearOnClicked}
          >
            <HiChevronDoubleRight size={18} className="icon" />
          </ButtonDiv>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

DatePickerHeader.propTypes = {
  date: PropTypes.objectOf(Object).isRequired,
  changeYear: PropTypes.func.isRequired,
  changeMonth: PropTypes.func.isRequired,
  decreaseMonth: PropTypes.func.isRequired,
  increaseMonth: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerHeader);
