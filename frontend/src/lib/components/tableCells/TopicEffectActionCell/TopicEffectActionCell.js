import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import ModalHelper from '../../../../utils/helper/ModalHelper';

import './TopicEffectActionCell.scss';

class TopicEffectActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      modalTitle,
      fetchDataFunction,
      editPagePath,
      displayEdit,
      displayDelete,
      displayEvaluation,
    } = props.cell.column.getProps();
    this.modalTitle = modalTitle;
    this.fetchDataFunction = fetchDataFunction;
    this.editPagePath = editPagePath;
    if (displayEdit === true || displayEdit === false) {
      this.displayEdit = displayEdit;
    } else {
      this.displayEdit = true;
    }
    if (displayDelete === true || displayDelete === false) {
      this.displayDelete = displayDelete;
    } else {
      this.displayDelete = true;
    }
    if (displayEvaluation === true || displayEvaluation === false) {
      this.displayEvaluation = displayEvaluation;
    } else {
      this.displayEvaluation = true;
    }
  }

  openModifyModal = () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    ModalHelper.openTopicEffectModifyModal({
      title: this.modalTitle,
      id,
    });
  };

  openOpenModal = () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    ModalHelper.openTopicEffectOpenModal({
      title: this.modalTitle,
      id,
    });
  };

  displayContent = () => {
    const { props } = this;
    const { isSelfCreated } = props.cell.row.original;
    return isSelfCreated ? (
      <>        
        <ButtonDiv className="modify-button" onClick={this.openModifyModal}>
          {props.language.topicEffectActionCell.modify}
        </ButtonDiv>
        <ButtonDiv className="evaluation-button" onClick={this.openOpenModal}>
          {props.language.topicEffectActionCell.open}
        </ButtonDiv>
      </>
    ) : (
      <ButtonDiv className="evaluation-button" onClick={this.openOpenModal}>
        {props.language.topicEffectActionCell.open}
      </ButtonDiv>
    );
  };

  render() {
    return (
      <div className="topic-effect-action-cell">
        <div className="action-button-container">
          {this.displayContent()}
        </div>
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

TopicEffectActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopicEffectActionCell),
);
