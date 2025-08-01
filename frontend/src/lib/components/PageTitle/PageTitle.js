import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import SectionTitle from '../SectionTitle/SectionTitle';

import './PageTitle.scss';

class PageTitle extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="page-title">
        <SectionTitle title={props.title} />
        {props.breadcrumb ? <Breadcrumb /> : ''}
        {props.postfixComponent}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

PageTitle.defaultProps = {
  breadcrumb: true,
  postfixComponent: '',
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  postfixComponent: PropTypes.node,
  breadcrumb: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);
