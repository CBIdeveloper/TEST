import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './CloudDataStateActionCell.scss';
import ApiService from '../../../../utils/api/ApiService';
class CloudDataStateActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    // console.log(props.cell.row.original.state)
  }
  render() {
    const { props, state } = this;
    let className;
    if (props.cell.row.original.state === '檢核中') {
      className = 'cloud-data-action-orange';
    } else if (props.cell.row.original.state === '檢核完成') {
      className = 'cloud-data-action-green';
    } else if (props.cell.row.original.state === '檢核失敗') {
      className = 'cloud-data-action-red';
    }
    return (
      <div className="cloud-data-action-cell2">
        <span className={className}>{props.cell.row.original.state}</span>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

CloudDataStateActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CloudDataStateActionCell),
);
