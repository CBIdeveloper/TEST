import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';

import ModalHelper from '../../../../utils/helper/ModalHelper';

import './NewsItem.scss';

class NewsItem extends React.PureComponent {
  handleNewsOnClicked = () => {
    const { props } = this;
    ModalHelper.openAnnouncementModal({ id: props.id });
  };

  render() {
    const { props } = this;

    return (
      <ButtonDiv className="news-item" onClick={this.handleNewsOnClicked}>
        <div className="news-date">{props.date}</div>
        <div className="news-title">{props.title}</div>
      </ButtonDiv>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

NewsItem.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);
