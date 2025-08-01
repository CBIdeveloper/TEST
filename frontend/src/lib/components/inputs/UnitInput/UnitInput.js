import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import SelectInput from '../SelectInput/SelectInput';
import TextInput from '../TextInput/TextInput';

import './UnitInput.scss';

class UnitInput extends React.PureComponent {
  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  render() {
    const { props } = this;

    return (
      <div className="unit-input">
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <div className="input-container">
          <div className="unit-input-container">
            <div className="first-level">
              <div className="level-title">{props.firstLevelTitle}</div>
              <SelectInput
                zenMode
                title=""
                inputName={props.firstLevelName}
                inputValue={props.firstLevelValue}
                inputPlaceholder={props.firstLevelPlaceholder}
                options={props.firstLevelOptions}
                setFieldValue={(field, value) => {
                  props.firstLevelOnChanged({
                    value,
                    field,
                    setFieldValue: props.setFieldValue,
                    index: props.index,
                  });
                }}
                touched={props.touched}
                errors={props.errors}
                disable={props.disable}
              />
            </div>

            <div className="second-level">
              <div className="level-title">{props.secondLevelTitle}</div>
              <SelectInput
                zenMode
                title=""
                inputName={props.secondLevelName}
                inputValue={props.secondLevelValue}
                inputPlaceholder={props.secondLevelPlaceholder}
                options={props.secondLevelOptions}
                // setFieldValue={props.setFieldValue}
                setFieldValue={(field, value) => {
                  props.secondLevelOnChanged({
                    value,
                    field,
                    setFieldValue: props.setFieldValue,
                    index: props.index,
                  });
                }}
                touched={props.touched}
                errors={props.errors}
                disable={props.disable || props.firstLevelValue === ''}
              />
            </div>

            {props.hideThird ? (
              ''
            ) : (
              <div className="third-level">
                <div className="level-title">{props.thirdLevelTitle}</div>
                <TextInput
                  zenMode
                  title=""
                  inputName={props.thirdLevelName}
                  inputValue={props.thirdLevelValue}
                  inputPlaceholder={props.thirdLevelPlaceholder}
                  inputOnChange={(event) =>
                    props.setFieldValue(
                      props.thirdLevelName,
                      event.target.value,
                    )
                  }
                  touched={props.touched}
                  errors={props.errors}
                  disable={props.disable}
                />
              </div>
            )}
          </div>
        </div>
        {props.errorMessage && (
          <div className="error-message">{props.errorMessage}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

UnitInput.defaultProps = {
  thirdLevelTitle: '',
  thirdLevelName: '',
  thirdLevelValue: '',

  firstLevelPlaceholder: '',
  secondLevelPlaceholder: '',
  thirdLevelPlaceholder: '',
  touched: {},
  errors: {},
  errorMessage: '',
  required: false,
  disable: false,
  hideThird: false,
  index: 0,
};

UnitInput.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  firstLevelTitle: PropTypes.string.isRequired,
  secondLevelTitle: PropTypes.string.isRequired,
  thirdLevelTitle: PropTypes.string,

  firstLevelName: PropTypes.string.isRequired,
  secondLevelName: PropTypes.string.isRequired,
  thirdLevelName: PropTypes.string,

  firstLevelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  secondLevelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  thirdLevelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  firstLevelPlaceholder: PropTypes.string,
  secondLevelPlaceholder: PropTypes.string,
  thirdLevelPlaceholder: PropTypes.string,

  firstLevelOptions: PropTypes.arrayOf(Object).isRequired,
  secondLevelOptions: PropTypes.arrayOf(Object).isRequired,

  firstLevelOnChanged: PropTypes.func.isRequired,
  secondLevelOnChanged: PropTypes.func.isRequired,

  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  disable: PropTypes.bool,
  hideThird: PropTypes.bool,
  index: PropTypes.number,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UnitInput),
);
