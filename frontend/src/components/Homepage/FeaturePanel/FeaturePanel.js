import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import FeatureItem from './FeatureItem/FeatureItem';
import SectionTitle from '../../../lib/components/SectionTitle/SectionTitle';

import FeatureConfig from '../../../utils/config/FeatureConfig';

import './FeaturePanel.scss';

class FeaturePanel extends React.PureComponent {
  displayFeature = () =>
    FeatureConfig.map((item) => (
      <FeatureItem
        key={item.name}
        type={item.type}
        className={item.className}
        featureName={item.name}
        image={item.image}
        link={item.link}
        onClick={item.onClick}
        access={item.access}
      />
    ));

  render() {
    const { props } = this;

    return (
      <div className="feature-panel">
        <SectionTitle title={props.language.featurePanel.title} />
        <div className="feature-grid">{this.displayFeature()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

FeaturePanel.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FeaturePanel),
);
