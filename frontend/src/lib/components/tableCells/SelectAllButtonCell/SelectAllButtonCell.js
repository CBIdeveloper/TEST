import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import { setSelectList, resetSelectList } from '../../../../store/table/slice';

import './SelectAllButtonCell.scss';

import checkboxNone from '../../../../assets/images/icons/checkbox_none.png';
import checkboxChecked from '../../../../assets/images/icons/checkbox_check.png';

class SelectAllButtonCell extends React.PureComponent {
  isSelectAll = () => {
    const { props } = this;
    const { tableSelect } = this.props;
    return props.stateMode
      ? props.data.every((item) =>
        props.stateObject.selectList.includes(item.id),
      )
      : props.data.every((item) => tableSelect.selectList.includes(item.id));
  };

  displayCheck = () =>
    (this.isSelectAll() ? (
      <img src={checkboxChecked} className="icon" alt="radio" />
    ) : (
      <img src={checkboxNone} className="icon" alt="radio" />
    ));

  handleClick = () => {
    const { props } = this;
    if (this.isSelectAll()) {
      this.resetSelectList();
    } else {
      const idList = props.data.map((item) => item.id);
      this.selectAllList(idList);
    }
  };

  selectAllList = (idList) => {
    const { props } = this;
    if (props.stateMode) {
      props.stateObject.setSelectList(idList);
    } else {
      props.setSelectList(idList);
    }
  };

  resetSelectList = () => {
    const { props } = this;
    if (props.stateMode) {
      props.stateObject.setSelectList([]);
    } else {
      props.resetSelectList();
    }
  };

  render() {
    const { props } = this;

    return (
      <ButtonDiv
        className="select-all-button-container"
        onClick={this.handleClick}
      >
        {this.displayCheck()}
      </ButtonDiv>
    );
  }
}

const mapStateToProps = (state) => ({
  tableSelect: state.table.tableSelect,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectList: (payload) => dispatch(setSelectList(payload)),
  resetSelectList: (payload) => dispatch(resetSelectList(payload)),
});

SelectAllButtonCell.defaultProps = {
  stateMode: false,
  stateObject: {},
};

SelectAllButtonCell.propTypes = {
  tableSelect: PropTypes.objectOf(Object).isRequired,
  setSelectList: PropTypes.func.isRequired,
  resetSelectList: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  stateMode: PropTypes.bool,
  stateObject: PropTypes.objectOf(Object),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectAllButtonCell);
