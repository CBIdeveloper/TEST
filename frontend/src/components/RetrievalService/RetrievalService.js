import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Routes from '../../lib/components/Routes/Routes';

import RetrievalServiceMenu from '../../utils/menu/retrievalService/retrievalServiceMenu';

import './RetrievalService.scss';

class RetrievalService extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="retrieval-service">
        <Routes
          path={props.menu.getMenuPath([RetrievalServiceMenu.path])}
          menu={RetrievalServiceMenu}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu.menu.menuInstance,
});

const mapDispatchToProps = (dispatch) => ({});

RetrievalService.propTypes = {
  menu: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RetrievalService);
