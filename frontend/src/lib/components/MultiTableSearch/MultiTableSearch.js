import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../ButtonDiv/ButtonDiv';

import './MultiTableSearch.scss';

class MultiTableSearch extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="multi-table-search">
        <div className="search-input-container">{props.searchInput}</div>
        <div className="action-button-container">
          <ButtonDiv className="action-button" onClick={props.resetFunction}>
            {props.language.multiTableSearch.reset}
          </ButtonDiv>
          <ButtonDiv className="action-button" onClick={props.searchFunction}>
            {props.language.multiTableSearch.search}
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

MultiTableSearch.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  resetFunction: PropTypes.func.isRequired,
  searchFunction: PropTypes.func.isRequired,
  searchInput: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiTableSearch);
