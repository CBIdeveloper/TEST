import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import DatePickerHeader from '../DatePickerHeader/DatePickerHeader';

import Year from '../../../../utils/constants/Year';
import { dateObjectToDateString } from '../../../../utils/parsers/dateParser';

import './DateInput.scss';

class DateInput extends React.PureComponent {
  constructor(props) {
    super(props);
    const maxYear = new Date().getFullYear() + 3;
    this.state = { isDatePickerOpen: false, maxYear };
  }

  zenClassname = () => {
    const { props } = this;
    return props.zenMode ? 'zen' : '';
  };

  dateInputClassname = () => {
    const { props } = this;
    return props.button ? 'date-input button' : 'date-input';
  };

  disableClassname = () => {
    const { props } = this;
    return props.disable ? 'disable' : '';
  };

  displayClassname = () => {
    const { props } = this;
    return props.display ? 'display' : '';
  };

  toggleDatePicker = () => {
    const { isDatePickerOpen } = this.state;
    this.setState({ isDatePickerOpen: !isDatePickerOpen });
  };

  formatDate = () => {
    const { props } = this;
    if (props.range) {
      if (
        props.inputValue.startDate === null &&
        props.inputValue.endDate === null
      ) {
        return '';
      }
      return `${dateObjectToDateString(
        props.inputValue.startDate,
      )} - ${dateObjectToDateString(props.inputValue.endDate)}`;
    }
    return dateObjectToDateString(props.inputValue);
  };

  handleInlineDateChange = (event) => {
    const { props } = this;

    if (props.range) {
      const date = { startDate: event[0], endDate: event[1] };
      props.setFieldValue(props.inputName, date);
      if (props.button && event[1]) {
        this.toggleDatePicker();
      }
    } else {
      props.setFieldValue(props.inputName, event);
      if (props.button) {
        this.toggleDatePicker();
      }
    }
  };

  handleDateChangeRaw = (event) => {
    event.preventDefault();
  };

  displayInlineDatepicker = () => {
    const { props, state } = this;
    if (state.isDatePickerOpen) {
      return props.range ? (
        <DatePicker
          className={`form-input ${this.disableClassname()} ${this.displayClassname()}`}
          dateFormat="yyyy-MM-dd"
          name={props.inputName}
          placeholderText={props.inputPlaceholder}
          startDate={props.inputValue.startDate}
          endDate={props.inputValue.endDate}
          onChange={this.handleInlineDateChange}
          onChangeRaw={this.handleDateChangeRaw}
          readOnly={props.disable || props.display}
          selectsRange
          inline
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
      ) : (
        <DatePicker
          className={`form-input ${this.disableClassname()} ${this.displayClassname()}`}
          dateFormat="yyyy-MM-dd"
          name={props.inputName}
          placeholderText={props.inputPlaceholder}
          selected={props.inputValue}
          onChange={this.handleInlineDateChange}
          onChangeRaw={this.handleDateChangeRaw}
          readOnly={props.disable || props.display}
          inline
          minDate={
            props.minDate === ''
              ? new Date(`${Year.minYear}-01-01`)
              : props.minDate
          }
          maxDate={
            props.maxDate === ''
              ? new Date(`${state.maxYear}-12-31`)
              : props.maxDate
          }
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
      );
    }
    return '';
  };

  displayInput = () => {
    const { props, state } = this;
    if (props.button) {
      return (
        <input
          className={`form-input ${this.disableClassname()} ${this.displayClassname()}`}
          readOnly
          name={props.inputName}
          value={this.formatDate()}
          placeholder={props.inputPlaceholder}
        />
      );
    }
    return props.range ? (
      <>
        <DatePicker
          className={`form-input ${this.disableClassname()} ${this.displayClassname()}`}
          dateFormat="yyyy-MM-dd"
          name={props.inputName}
          placeholderText={props.inputPlaceholder}
          startDate={props.inputValue.startDate}
          endDate={props.inputValue.endDate}
          onChange={this.handleInlineDateChange}
          onChangeRaw={this.handleDateChangeRaw}
          readOnly={props.disable || props.display}
          withPortal={props.withPortal}
          selectsRange
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
        <img src={calendar} alt="calendar" className="calendar-icon" />
      </>
    ) : (
      <DatePicker
        className={`form-input ${this.disableClassname()} ${this.displayClassname()}`}
        dateFormat="yyyy-MM-dd"
        name={props.inputName}
        placeholderText={props.inputPlaceholder}
        selected={props.inputValue}
        onChange={this.handleInlineDateChange}
        onChangeRaw={this.handleDateChangeRaw}
        readOnly={props.disable || props.display}
        withPortal={props.withPortal}
        minDate={
          props.minDate === ''
            ? new Date(`${Year.minYear}-01-01`)
            : props.minDate
        }
        maxDate={
          props.maxDate === ''
            ? new Date(`${state.maxYear}-12-31`)
            : props.maxDate
        }
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
    );
  };

  displayButton = () => {
    const { props } = this;
    return props.button ? (
      <ButtonDiv className="select-button" onClick={this.toggleDatePicker}>
        {props.buttonText}
      </ButtonDiv>
    ) : (
      ''
    );
  };

  // displayError = () => {
  //   const { props } = this;
  //   if (props.range) {
  //     return (
  //       props.touched[props.inputName] &&
  //       props.errors[props.inputName] && (
  //         <>
  //           <div className="error-message">
  //             {props.errors[props.inputName].startDate}
  //           </div>
  //           <div className="error-message">
  //             {props.errors[props.inputName].endDate}
  //           </div>
  //         </>
  //       )
  //     );
  //   }
  //   return (
  //     props.touched[props.inputName] &&
  //     props.errors[props.inputName] && (
  //       <div className="error-message">{props.errors[props.inputName]}</div>
  //     )
  //   );
  // };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  render() {
    const { props } = this;

    return (
      <div className={`${this.dateInputClassname()} ${this.zenClassname()}`}>
        {props.title && (
          <div className={`input-title ${this.requiredClassname()}`}>
            {props.title}
          </div>
        )}
        <div className="input-container">
          {this.displayInput()}
          {this.displayButton()}
          {this.displayInlineDatepicker()}
          {/* {this.displayError()} */}
          <div className="message-section">
            {props.touched[props.inputName] &&
              props.errors[props.inputName] && (
                <div className="error-message">
                  {props.errors[props.inputName]}
                </div>
              )}
            {props.errorMessage && (
              <div className="error-message">{props.errorMessage}</div>
            )}
            {props.description !== '' && (
              <div className="input-description">{props.description}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

DateInput.defaultProps = {
  inputPlaceholder: '',
  inputValue: '',
  touched: {},
  errors: {},
  errorMessage: '',
  description: '',
  withPortal: false,
  range: false,
  button: false,
  buttonText: '選擇',
  disable: false,
  display: false,
  required: false,
  zenMode: false,
  minDate: '',
  maxDate: '',
};

DateInput.propTypes = {
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.objectOf(Object),
  ]),
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  errorMessage: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  withPortal: PropTypes.bool,
  range: PropTypes.bool,
  button: PropTypes.bool,
  buttonText: PropTypes.string,
  disable: PropTypes.bool,
  display: PropTypes.bool,
  required: PropTypes.bool,
  zenMode: PropTypes.bool,
  minDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.objectOf(Object),
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.objectOf(Object),
  ]),
};

export default connect(mapStateToProps, mapDispatchToProps)(DateInput);
