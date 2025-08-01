import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import SelectInput from '../SelectInput/SelectInput';
import FormikHelper from '../../../../utils/helper/FormikHelper';

import './CheckBox.scss';

class CheckBoxAddTitle extends React.PureComponent {
  zenModeClassname = () => {
    const { props } = this;
    return props.zenMode ? 'zen' : '';
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  disabledClassname = () => {
    const { props } = this;
    return props.disabled ? 'disabled' : '';
  };
  render() {
    const { props } = this;
    return (
      <div className={`text-input ${this.zenModeClassname()}`}>
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <ButtonDiv
          className={`trailing-icon-three ${this.disabledClassname()}`}
          onClick={props.iconOnClick}
          tabIndex={-1}
        >
          {props.trailingIcon}
        </ButtonDiv>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

CheckBoxAddTitle.defaultProps = {
  trailingIcon: '',
  iconOnClick: () => {},
  inputRef: () => {},
  disabled: false,
};

CheckBoxAddTitle.propTypes = {
  trailingIcon: PropTypes.node,
  iconOnClick: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  disabled: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxAddTitle);
