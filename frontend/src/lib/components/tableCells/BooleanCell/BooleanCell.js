import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class BooleanCell extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="">
        {props.cell.value
          ? props.language.booleanCell.true
          : props.language.booleanCell.false}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

BooleanCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooleanCell);
