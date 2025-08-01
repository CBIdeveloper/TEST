import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContactDetailTabPage from './ContactDetailTabPage/ContactDetailTabPage';
import Container from '../../../../lib/components/Container/Container';
import PageTitle from '../../../../lib/components/PageTitle/PageTitle';
import Tabs from '../../../../lib/components/Tabs/Tabs';

import ContactInformationConfig from '../../../../utils/config/ContactInformationConfig';
import QueryType from '../../../../utils/types/QueryType';

import './ContactDetail.scss';

class ContactDetail extends React.PureComponent {
  tabContentList = () =>
    ContactInformationConfig.map((item) => ({
      name: item.shortName,
      value: item.id.toString(),
      Component: ContactDetailTabPage,
      componentProps: {
        unitId: item.id,
        queryId: item.queryId,
        color: item.color,
        icon: item.contactIcon,
      },
    }));

  colorList = () => ContactInformationConfig.map((item) => item.color);

  render() {
    const { props } = this;

    return (
      <Container breadcrumb={false}>
        <div className="contact-detail">
          <PageTitle
            title={
              props.language.retrievalService.subMenus.contactInformationDetail
            }
          />
          <Tabs
            queryKey={QueryType.TAB}
            tabContentList={this.tabContentList()}
            colorList={this.colorList()}
          />
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

ContactDetail.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail);
