import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdOutlineCloseFullscreen,
  MdOutlineOpenInFull,
} from 'react-icons/md';

import ButtonDiv from '../ButtonDiv/ButtonDiv';

import './Card.scss';

class Card extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showContent: true, expand: props.expand };
  }

  componentDidMount() {}

  modifyShowContent = (showContent) => {
    this.setState({ showContent });
  };

  modifyExpand = (expand) => {
    this.setState({ expand });
  };

  toggleCollapse = () => {
    const { state } = this;
    this.modifyShowContent(!state.showContent);
  };

  toggleExpand = () => {
    const { props, state } = this;
    this.modifyExpand(!state.expand);
    props.setExpandFunction(!state.expand);
  };

  displayArrow = () => {
    const { props, state } = this;
    if (props.collapse) {
      return state.showContent ? (
        <MdKeyboardArrowUp className="arrow-icon" size={18} />
      ) : (
        <MdKeyboardArrowDown className="arrow-icon" size={18} />
      );
    }
    return '';
  };

  displayExpand = () => {
    const { props, state } = this;
    if (props.fullScreen) {
      return state.expand ? (
        <MdOutlineCloseFullscreen className="expand-icon" size={18} />
      ) : (
        <MdOutlineOpenInFull className="expand-icon" size={18} />
      );
    }
    return '';
  };

  displayContent = () => {
    const { props, state } = this;
    if (props.collapse && !state.showContent) {
      return '';
    }
    return <div className="card-content">{props.children}</div>;
  };

  fullScreenClassname = () => {
    const { props, state } = this;
    return props.fullScreen && state.expand ? 'full-screen' : '';
  };

  titleClassname = () => {
    const { props } = this;
    const pointer = props.collapse || props.fullScreen ? 'pointer' : '';
    return `card-title ${pointer}`;
  };

  handleHeaderOnClick = () => {
    const { props } = this;
    if (props.collapse) {
      this.toggleCollapse();
    }
    if (props.fullScreen) {
      this.toggleExpand();
    }
  };

  render() {
    const { props } = this;

    return (
      <div
        className={`card ${props.className} ${this.fullScreenClassname()}`}
        ref={props.cardRef}
      >
        <ButtonDiv
          className={this.titleClassname()}
          onClick={this.handleHeaderOnClick}
        >
          <div>{props.title}</div>
          {this.displayExpand()}
          {this.displayArrow()}
        </ButtonDiv>
        {this.displayContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

Card.defaultProps = {
  className: '',
  collapse: false,
  fullScreen: false,
  expand: false,
  setExpandFunction: () => {},
  cardRef: () => {},
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  collapse: PropTypes.bool,
  fullScreen: PropTypes.bool,
  expand: PropTypes.bool,
  setExpandFunction: PropTypes.func,
  cardRef: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
