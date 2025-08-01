import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './TableCount.scss';

class TableCount extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="table-count">
        {`${props.language.total}${props.count}${props.language.unit}`}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject.tableCount,
});

const mapDispatchToProps = (dispatch) => ({});

TableCount.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  count: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCount);
