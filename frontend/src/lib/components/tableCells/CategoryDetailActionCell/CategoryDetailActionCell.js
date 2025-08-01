import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import { createQuery } from '../../../../utils/parsers/queryParser';

import './CategoryDetailActionCell.scss';

class CategoryDetailActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    const { configId } = props.cell.column.getProps();
    this.configId = configId;
  }

  openDetailPage = () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    const query = createQuery({
      [QueryType.TYPE_ID]: this.configId,
      [QueryType.DETAIL_ID]: id,
    });
    props.history.push({
      pathname: `/${Path.dataSearchPath}/${Path.resultDetailPath}`,
      search: query,
    });
  };

  render() {
    const { props } = this;

    return (
      <div className="category-detail-action-cell">
        <div className="action-button-container">
          <ButtonDiv className="action-button" onClick={this.openDetailPage}>
            {props.language.categoryDetailActionCell.view}
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

CategoryDetailActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryDetailActionCell),
);
