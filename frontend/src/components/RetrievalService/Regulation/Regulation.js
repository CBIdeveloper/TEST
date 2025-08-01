import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '../../../lib/components/Container/Container';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import RegulationItem from './RegulationItem/RegulationItem';

import RegulationConfig from '../../../utils/config/RegulationConfig';

import './Regulation.scss';

class Regulation extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <Container breadcrumb={false}>
        <div className="regulation">
          <PageTitle
            title={props.language.retrievalService.subMenus.regulation}
          />
          <div className="regulation-container">
            {RegulationConfig.map((item) => (
              <RegulationItem
                key={item.type}
                normalImage={item.normalImage}
                hoverImage={item.hoverImage}
                type={item.type}
              />
            ))}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

Regulation.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Regulation);
