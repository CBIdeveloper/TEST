import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import ModalHelper from '../../../../utils/helper/ModalHelper';

import './ActionCell.scss';

class ActionCell extends React.PureComponent {
  handleDeleteOnClicked = () => {
    const { props } = this;
    ModalHelper.openDeleteModal({
      deleteFunction: props.deleteFunction,
    });
  };

  render() {
    const { props } = this;

    return (
      <div className="action-cell">
        <div className="action-button-container">
          {props.displayEdit ? (
            <ButtonDiv className="modify-button" onClick={props.openEditPage}>
              {props.editText}
            </ButtonDiv>
          ) : (
            ''
          )}
          {props.displayDelete ? (
            <ButtonDiv
              className="delete-button"
              onClick={this.handleDeleteOnClicked}
            >
              {props.deleteText}
            </ButtonDiv>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

ActionCell.defaultProps = {
  editText: '修改',
  deleteText: '刪除',
  displayEdit: true,
  displayDelete: true,
};

ActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  editText: PropTypes.string,
  openEditPage: PropTypes.func.isRequired,
  deleteText: PropTypes.string,
  deleteFunction: PropTypes.func.isRequired,
  displayEdit: PropTypes.bool,
  displayDelete: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionCell);
