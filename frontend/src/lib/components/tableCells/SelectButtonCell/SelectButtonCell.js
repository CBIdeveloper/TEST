import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import {
  addItemToSelectList,
  deleteItemFromSelectList,
} from '../../../../store/table/slice';

import './SelectButtonCell.scss';

import checkboxNone from '../../../../assets/images/icons/checkbox_none.png';
import checkboxChecked from '../../../../assets/images/icons/checkbox_check.png';

class SelectButtonCell extends React.PureComponent {
  isSelected = () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    return props.stateMode
      ? props.stateObject.selectList.includes(id)
      : props.tableSelect.selectList.includes(id);
  };

  handleClick = (event) => {
    event.stopPropagation();
    const { props } = this;
    const { id } = props.cell.row.original;
    if (this.isSelected()) {
      this.deleteItem(id);
    } else {
      this.addItem(id);
    }
  };

  addItem = (id) => {
    const { props } = this;
    if (props.stateMode) {
      props.stateObject.addItemToSelectList(id);
    } else {
      props.addItemToSelectList(id);
    }
  };

  deleteItem = (id) => {
    const { props } = this;
    if (props.stateMode) {
      props.stateObject.deleteItemFromSelectList(id);
    } else {
      props.deleteItemFromSelectList(id);
    }
  };

  displayCheck = () =>
    (this.isSelected() ? (
      <img src={checkboxChecked} className="icon" alt="radio" />
    ) : (
      <img src={checkboxNone} className="icon" alt="radio" />
    ));

  render() {
    return (
      <ButtonDiv className="select-button-container" onClick={this.handleClick}>
        {this.displayCheck()}
      </ButtonDiv>
    );
  }
}

const mapStateToProps = (state) => ({
  tableSelect: state.table.tableSelect,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToSelectList: (payload) => dispatch(addItemToSelectList(payload)),
  deleteItemFromSelectList: (payload) =>
    dispatch(deleteItemFromSelectList(payload)),
});

SelectButtonCell.defaultProps = {
  stateMode: false,
  stateObject: {},
};

SelectButtonCell.propTypes = {
  tableSelect: PropTypes.objectOf(Object).isRequired,
  addItemToSelectList: PropTypes.func.isRequired,
  deleteItemFromSelectList: PropTypes.func.isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  stateMode: PropTypes.bool,
  stateObject: PropTypes.objectOf(Object),
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectButtonCell);
