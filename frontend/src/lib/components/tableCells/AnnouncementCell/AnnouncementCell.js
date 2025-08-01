import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import ModalHelper from '../../../../utils/helper/ModalHelper';

import './AnnouncementCell.scss';

class AnnouncementCell extends React.PureComponent {
  openModal = () => {
    const { props } = this;
    ModalHelper.openAnnouncementModal({
      id: props.cell.row.original.id,
    });
  };

  render() {
    const { props } = this;

    return (
      <ButtonDiv className="announcement-cell" onClick={this.openModal}>
        {props.cell.value}
      </ButtonDiv>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

AnnouncementCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementCell);
