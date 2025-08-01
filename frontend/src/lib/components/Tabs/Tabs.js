import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import TabItem from './TabItem/TabItem';

import { createQuery } from '../../../utils/parsers/queryParser';

import './Tabs.scss';

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: -1 };
  }

  componentDidMount() {
    this.processQueryKey();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props.query.queryObject !== prevProps.query.queryObject) {
      this.processQueryKey();
    }
  }

  processQueryKey = () => {
    const { props } = this;
    if (props.queryKey !== '') {
      const { queryObject } = props.query;
      const tab = queryObject.get(props.queryKey);
      if (tab !== null) {
        this.setIndexAccordingToValue(tab);
      } else {
        this.setSelectedIndex(0);
      }
    }
  };

  setIndexAccordingToValue = (value) => {
    const { props } = this;
    const selectedTabIndex = props.tabContentList.findIndex(
      (tab) => value === tab.value.toString(),
    );
    if (selectedTabIndex !== -1) {
      this.setSelectedIndex(selectedTabIndex);
    }
  };

  setSelectedIndex = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  tabLink = (tabValue) => {
    const { props } = this;
    const queryObject = {};
    if (!props.resetPath) {
      props.query.queryObject.forEach((value, key) => {
        if (key !== props.queryKey) {
          queryObject[key] = value;
        }
      });
    }
    const query = createQuery({
      ...queryObject,
      [props.queryKey]: tabValue,
    });
    if (props.queryKey !== '') {
      return `${props.history.location.pathname}${query}`;
    }
    return '';
  };

  tabColor = (index) => {
    const { props } = this;
    const colorIndex = index % props.colorList.length;
    return props.colorList[colorIndex];
  };

  displayTabs = () => {
    const { props, state } = this;
    return props.tabContentList.map((tab, index) => (
      <TabItem
        key={tab.value}
        name={tab.name}
        isSelected={index === state.selectedIndex}
        link={this.tabLink(tab.value)}
        color={this.tabColor(index)}
      />
    ));
  };

  displayComponent = () => {
    const { props, state } = this;
    if (props.tabContentList.length > 0 && state.selectedIndex !== -1) {
      const { Component, componentProps } =
        props.tabContentList[state.selectedIndex];
      return <Component {...componentProps} />;
    }
    return '';
  };

  render() {
    const { props } = this;

    return (
      <>
        <div className="tabs">{this.displayTabs()}</div>
        {this.displayComponent()}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({});

Tabs.defaultProps = {
  queryKey: '',
  handleTabOnSelect: () => {},
  resetPath: false,
  colorList: [''],
};

Tabs.propTypes = {
  query: PropTypes.objectOf(Object).isRequired,
  queryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabContentList: PropTypes.arrayOf(Object).isRequired,
  handleTabOnSelect: PropTypes.func,
  resetPath: PropTypes.bool,
  colorList: PropTypes.arrayOf(Object),
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tabs));
