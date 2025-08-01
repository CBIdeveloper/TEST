import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { MdRemoveCircle } from 'react-icons/md';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import DatePickerHeader from '../DatePickerHeader/DatePickerHeader';

import Year from '../../../../utils/constants/Year';
import { dateObjectToDateString } from '../../../../utils/parsers/dateParser';

import './MultipleDateInput.scss';

class MultipleDateInput extends React.PureComponent {
  constructor(props) {
    super(props);
    const maxYear = new Date().getFullYear() + 3;
    this.state = { maxYear };
  }

  handleDateOnChange = (date) => {
    const { props } = this;
    if (
      props.inputValue.some(
        (item) => dateObjectToDateString(item) === dateObjectToDateString(date),
      )
    ) {
      this.removeDate(date);
    } else {
      this.addDate(date);
    }
  };

  addDate = (date) => {
    const { props } = this;
    const value = [...props.inputValue, date].sort(
      (a, b) => a.getTime() - b.getTime(),
    );
    props.setFieldValue(props.inputName, value);
  };

  removeDate = (date) => {
    const { props } = this;
    const value = props.inputValue.filter(
      (item) => dateObjectToDateString(item) !== dateObjectToDateString(date),
    );
    props.setFieldValue(props.inputName, value);
  };

  displayDateItem = () => {
    const { props } = this;
    return props.inputValue.map((date) => (
      <ButtonDiv
        className="date-button"
        onClick={() => this.removeDate(date)}
        key={dateObjectToDateString(date)}
      >
        <div>{dateObjectToDateString(date)}</div>
        <MdRemoveCircle className="icon" />
      </ButtonDiv>
    ));
  };

  displaySelectedDates = () => {
    const { props } = this;
    return props.inputValue.length !== 0 ? (
      <div className="selected-dates">{this.displayDateItem()}</div>
    ) : (
      ''
    );
  };

  displayError = () => {
    const { props } = this;
    return (
      props.touched[props.inputName] &&
      props.errors[props.inputName] && (
        <div className="error-message">{props.errors[props.inputName]}</div>
      )
    );
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  render() {
    const { props, state } = this;

    return (
      <div className="multiple-date-input">
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <div className="input-container">
          <DatePicker
            className="form-input"
            dateFormat="yyyy-MM-dd"
            name={props.inputName}
            placeholderText={props.inputPlaceholder}
            selected=""
            highlightDates={props.inputValue}
            onChange={this.handleDateOnChange}
            inline
            minDate={new Date(`${Year.minYear}-01-01`)}
            maxDate={new Date(`${state.maxYear}-12-31`)}
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
            }) => (
              <DatePickerHeader
                date={date}
                changeYear={changeYear}
                changeMonth={changeMonth}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
              />
            )}
          />
        </div>
        {this.displaySelectedDates()}
        {this.displayError()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

MultipleDateInput.defaultProps = {
  inputPlaceholder: '',
  inputValue: '',
  touched: {},
  errors: {},
  required: false,
};

MultipleDateInput.propTypes = {
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.arrayOf(Object),
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  required: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleDateInput);
