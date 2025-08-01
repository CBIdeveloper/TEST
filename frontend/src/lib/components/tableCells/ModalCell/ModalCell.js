import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import ModalHelper from '../../../../utils/helper/ModalHelper';

import './ModalCell.scss';

class ModalCell extends React.PureComponent {
  constructor(props) {
    super(props);
    const { modalTitle } = props.cell.column.getProps();
    this.modalTitle = modalTitle;
  }

  openModal = () => {
    const { props } = this;
    ModalHelper.openBusinessManagementModal({
      title: this.modalTitle,
      id: props.cell.row.original.id,
    });
  };

  render() {
    const { props } = this;

    return (
      <ButtonDiv className="modal-cell" onClick={this.openModal}>
        {props.cell.value}
      </ButtonDiv>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ModalCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCell);
