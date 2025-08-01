import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import './SingleSelection.scss';

import radioNone from '../../../../assets/images/icons/radio_none.png';
import radioSelected from '../../../../assets/images/icons/radio_selected.png';

class SingleSelection extends React.PureComponent {
  displayIcon = () => {
    const { props } = this;
    const icon = props.selected ? radioSelected : radioNone;
    return (
      <div className="icon-container">
        <img src={icon} className="icon" alt="option" />
      </div>
    );
  };

  handleIconOnClicked = () => {
    const { props } = this;
    props.handleOnClicked(props.optionValue);
  };

  render() {
    const { props } = this;

    return (
      <ButtonDiv
        className="single-selection"
        onClick={this.handleIconOnClicked}
      >
        {this.displayIcon()}
        <div className="single-selection-text">{props.optionText}</div>
      </ButtonDiv>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

SingleSelection.propTypes = {
  optionText: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
  handleOnClicked: PropTypes.func.isRequired,
  optionValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  selected: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleSelection);
