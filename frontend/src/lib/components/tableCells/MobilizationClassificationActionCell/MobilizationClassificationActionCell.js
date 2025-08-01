import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import UrlParser from '../../../../utils/parsers/urlParser';
import { createQuery } from '../../../../utils/parsers/queryParser';

import './MobilizationClassificationActionCell.scss';

class MobilizationClassificationActionCell extends React.PureComponent {
  handleOnClicked = () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    const query = createQuery({
      [QueryType.ID]: id,
    });
    props.history.push({
      pathname: UrlParser([
        props.location.pathname,
        Path.mobilizationClassificationDetailManagementPath,
      ]),
      search: query,
    });
  };

  render() {
    const { props } = this;

    return (
      <div className="mobilization-classification-action-cell">
        <div className="action-button-container">
          <ButtonDiv className="edit-button" onClick={this.handleOnClicked}>
            {props.language.mobilizationClassificationActionCell.edit}
          </ButtonDiv>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

MobilizationClassificationActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MobilizationClassificationActionCell),
);
