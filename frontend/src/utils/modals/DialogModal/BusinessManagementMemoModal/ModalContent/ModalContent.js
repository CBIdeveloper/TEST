import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import GreySectionTitle from '../../../../../lib/components/GreySectionTitle/GreySectionTitle';
import Memo from '../../../../../lib/components/Memo/Memo';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';

import ApiService from '../../../../api/ApiService';
import BusinessManagementType from '../../../../constants/BusinessManagementType';

import '../BusinessManagementMemoModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    ApiService.businessManagement
      .getResponsibleBusinessManagementInfoList()
      .then((response) => {
        this.setData(response.data);
      });
  }

  setData = (data) => {
    this.setState({ data });
  };

  displayMemo = () => {
    const { props, state } = this;
    if (state.data === null) return '';
    const keys = Object.keys(state.data);
    return keys.map((item) => {
      const typeString = BusinessManagementType.find(
        (type) => type.value === Number(item),
      ).text;
      return (
        <Fragment key={item}>
          <GreySectionTitle title={typeString} />
          <div className="memo-section">
            {state.data[item].map((data) => (
              <Memo
                key={data.title}
                color="yellow"
                content={
                  <div className="memo-content">
                    <div className="memo-title">{data.title}</div>
                    <div className="memo-unit">{`回饋單位：${data.unitName}`}</div>
                    <div className="memo-status">
                      {props.language.businessManagementMemoModal.uploaded}
                    </div>
                  </div>
                }
              />
            ))}
          </div>
        </Fragment>
      );
    });
  };

  render() {
    const { props } = this;

    return (
      <div className="business-management-memo-modal">
        <SectionTitle
          title={props.language.businessManagementMemoModal.title}
        />
        <div className="memo-section-container">{this.displayMemo()}</div>
        <div className="action-button-container">
          <ButtonDiv className="close-button" onClick={props.onClose}>
            {props.language.tableModal.close}
          </ButtonDiv>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ModalContent.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContent),
);
