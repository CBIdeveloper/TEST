import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormDescription from '../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import FormSectionTitle from '../../../../lib/components/FormSectionTitle/FormSectionTitle';

import './ResultItem.scss';

class ResultItem extends React.PureComponent {
  displayContent = () => {
    const { props } = this;
    const { keyList } = props.config;
    let currentRow = [];
    return keyList.reduce((accum, current, index) => {
      const { key, keyTitle } = current;
      currentRow.push(
        <FormDescription key={keyTitle} title={keyTitle} content={props.content[key]} />,
      );
      if (index % 2 === 1 || index === keyList.length - 1) {
        accum.push(<FormRow key={keyTitle}>{currentRow}</FormRow>);
        currentRow = [];
      }
      return accum;
    }, []);
  };

  render() {
    const { props } = this;

    return (
      <div className="result-item">
        <FormSectionTitle title={props.config.sectionTitle} />
        {this.displayContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ResultItem.propTypes = {
  content: PropTypes.objectOf(Object).isRequired,
  config: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultItem);
