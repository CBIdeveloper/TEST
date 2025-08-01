import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ButtonDiv.scss';

class ButtonDiv extends React.PureComponent {
  disabledClassname = () => {
    const { props } = this;
    return props.disabled ? 'disabled' : '';
  };

  handleOnChange = (event) => {
    const { props } = this;
    if (!props.display && !props.disable) {
      props.inputOnChange(event);
    }
  };

  render() {
    const { props } = this;

    if (!props.display) return '';

    return (
      <div
        role="button"
        className={`button-div ${props.className} ${this.disabledClassname()}`}
        onClick={props.onClick}
        onChange={this.handleOnChange}
        onFocus={props.onFocus}
        onKeyDown={props.onKeyDown}
        tabIndex={props.tabIndex}
        key={props.key}
        onMouseDown={props.onMouseDown}
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}
        ref={props.elementRef}
        style={props.style}
      >
        {props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ButtonDiv.defaultProps = {
  className: '',
  children: '',
  onClick: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onMouseDown: () => {},
  onMouseOver: () => {},
  onMouseLeave: () => {},
  key: '',
  tabIndex: 0,
  elementRef: null,
  style: {},
  disabled: false,
  display: true,
};

ButtonDiv.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  inputOnChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseLeave: PropTypes.func,
  key: PropTypes.string,
  tabIndex: PropTypes.number,
  elementRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  style: PropTypes.objectOf(Object),
  disabled: PropTypes.bool,
  display: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonDiv);
