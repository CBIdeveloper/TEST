import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from "../../../../lib/components/ButtonDiv/ButtonDiv";
import Container from '../../../../lib/components/Container/Container';
import MobilizationExecutionTabPage from './MobilizationExecutionTabPage/MobilizationExecutionTabPage';
import PageTitle from '../../../../lib/components/PageTitle/PageTitle';
import Tabs from '../../../../lib/components/Tabs/Tabs';

import AreaCodeType from '../../../../utils/constants/AreaCodeType';
import QueryType from '../../../../utils/types/QueryType';

import './MobilizationExecution.scss';

class MobilizationExecution extends React.PureComponent {
  tabContentList = () =>
    AreaCodeType.map((item) => ({
      name: item.text,
      value: item.value,
      Component: MobilizationExecutionTabPage,
      componentProps: {
        districtId: item.value,
      },
    }));

  render() {
    const { props } = this;

    return (
      <Container breadcrumb={false}>
        <div className="mobilization-execution">
          <PageTitle
            title={
              props.language.retrievalService.subMenus.mobilizationExecution
            }
          />
          <Tabs
            queryKey={QueryType.TAB}
            tabContentList={this.tabContentList()}
            colorList={['orange']}
          />
          <ButtonDiv className="back-button" onClick={props.history.goBack}>
            {props.language.mobilizationExecution.back}
          </ButtonDiv>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

MobilizationExecution.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MobilizationExecution),
);
