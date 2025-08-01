import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NameCell extends React.PureComponent {
  displayName = () => {
    const { props } = this;
    const { value } = props.cell;
    if (value.length === 2) {
      return `${value[0]}O`;
    }
    return value
      .split('')
      .map((item, index) => {
        if (index === 0 || index === value.length - 1) return item;
        return 'O';
      })
      .join('');
  };

  render() {
    const { props } = this;

    return <div className="name-cell">{this.displayName()}</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

NameCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NameCell);
