import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import './DateTimeInput.scss';
import DatePickerHeader from "../DatePickerHeader/DatePickerHeader";
import Year from "../../../../utils/constants/Year";

class DateTimeInput extends React.PureComponent {
    constructor(props) {
        super(props);
        const maxYear = new Date().getFullYear() + 3;
        this.state = { isDatePickerOpen: false, maxYear };
    }
    handleInlineDateChange = (event) => {
        const {props} = this;
        props.setFieldValue(props.inputName, event);
    };

    requiredClassname = () => {
        const {props} = this;
        return props.required ? 'required' : '';
    };

    displayClassname = () => {
        const {props} = this;
        return props.display ? 'display' : '';
    };

    render() {
        const {props, state} = this;

        return (
            <div className="date-time-input">
                {props.title && <div className={`input-title ${this.requiredClassname()}`}>
                    {props.title}
                </div>}
                <div className="input-container">
                    <DatePicker
                        className={`form-input ${this.displayClassname()}`}
                        name={props.inputName}
                        placeholderText={props.inputPlaceholder}
                        selected={props.inputValue}
                        onChange={this.handleInlineDateChange}
                        showTimeSelect
                        timeIntervals={15}
                        readOnly={props.display}
                        dateFormat="yyyy-MM-dd HH:mm"
                        timeFormat="HH:mm"
                        timeCaption="Select time"
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
                    {props.touched[props.inputName] && props.errors[props.inputName] && (
                        <div className="error-message">{props.errors[props.inputName]}</div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

DateTimeInput.defaultProps = {
    inputPlaceholder: '',
    inputValue: '',
    touched: {},
    errors: {},
    required: false,
    display: false,
    minDate: '',
    maxDate: '',
};

DateTimeInput.propTypes = {
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
    required: PropTypes.bool,
    display: PropTypes.bool,
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

export default connect(mapStateToProps, mapDispatchToProps)(DateTimeInput);
