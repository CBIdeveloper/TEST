import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class IdentityNumberCell extends React.PureComponent {
  displayIdentityNumber = () => {
    const { props } = this;
    const { value } = props.cell;
    return value
      .split('')
      .map((item, index) => {
        if (
          index === 0 ||
          index === 1 ||
          index === 2 ||
          index === value.length - 1
        ) {
          return item;
        }
        return '*';
      })
      .join('');
  };

  render() {
    const { props } = this;

    return (
      <div className="identity-number-cell">{this.displayIdentityNumber()}</div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

IdentityNumberCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IdentityNumberCell),
);
