import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import SelectInput from '../SelectInput/SelectInput';
import FormikHelper from '../../../../utils/helper/FormikHelper';

import './ThreeCheckBoxAddTitle.scss';

class ThreeCheckBoxAddTitle extends React.PureComponent {
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
        <ButtonDiv
          className={`trailing-icon-three ${this.disabledClassname()}`}
          onClick={props.iconOnClick2}
          tabIndex={-1}
        >
          {props.trailingIcon2}
        </ButtonDiv>
        <ButtonDiv
          className={`trailing-icon-three ${this.disabledClassname()}`}
          onClick={props.iconOnClick3}
          tabIndex={-1}
        >
          {props.trailingIcon3}
        </ButtonDiv>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ThreeCheckBoxAddTitle.defaultProps = {
  trailingIcon: '',
  trailingIcon2: '',
  trailingIcon3: '',
  iconOnClick: () => {},
  iconOnClick2: () => {},
  iconOnClick3: () => {},
  inputRef: () => {},
  disabled: false,
};

ThreeCheckBoxAddTitle.propTypes = {
  trailingIcon: PropTypes.node,
  trailingIcon2: PropTypes.node,
  trailingIcon3: PropTypes.node,
  iconOnClick: PropTypes.func,
  iconOnClick2: PropTypes.func,
  iconOnClick3: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  disabled: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreeCheckBoxAddTitle);
