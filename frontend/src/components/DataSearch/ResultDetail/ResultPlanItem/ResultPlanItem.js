import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormDescription from '../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import FormSectionTitle from '../../../../lib/components/FormSectionTitle/FormSectionTitle';

import './ResultPlanItem.scss';

class ResultPlanItem extends React.PureComponent {
  displayPlanList = () => {
    const { props } = this;
    const { keyList } = props.planConfig;
    return props.planList.map((item) => {
      let currentRow = [];
      return keyList.reduce((accum, current, index) => {
        const { key, keyTitle } = current;
        currentRow.push(
          <FormDescription
            key={keyTitle}
            title={keyTitle}
            content={item[key]}
          />,
        );
        if (index % 2 === 1 || index === keyList.length - 1) {
          accum.push(<FormRow key={keyTitle}>{currentRow}</FormRow>);
          currentRow = [];
        }
        return accum;
      }, []);
    });
  };

  render() {
    const { props } = this;

    return (
      <div className="result-plan-item">
        <FormSectionTitle title={props.planConfig.sectionTitle} />
        {this.displayPlanList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ResultPlanItem.propTypes = {
  planList: PropTypes.arrayOf(Object).isRequired,
  planConfig: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPlanItem);
