import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import NewsItem from './NewsItem/NewsItem';
import SectionTitle from '../../../lib/components/SectionTitle/SectionTitle';

import AnnouncementTable from '../../../utils/tables/systemManagement/AnnouncementTable/AnnouncementTable';
import ApiService from '../../../utils/api/ApiService';
import Path from '../../../utils/path/path';
import QueryHelper from '../../../utils/helper/QueryHelper';
import { userHasRole } from '../../../utils/auth/auth';

import './LatestNews.scss';

class LatestNews extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { newsList: [] };
    this.table = new AnnouncementTable();
  }

  componentDidMount() {
    ApiService.announcement
      .readAnnouncementQueryPagination({
        query: QueryHelper.singleQuery(this.table.todayQueryPrefix()),
        take: 10,
        skip: 0,
      })
      .then((response) => {
        this.setNewsList(response.items);
      });
  }

  setNewsList = (newsList) => {
    this.setState({ newsList });
  };

  displayNews = () => {
    const { state } = this;
    return state.newsList.map((item) => (
      <NewsItem
        key={item.id}
        id={item.id}
        date={item.announcementBeganAtString}
        title={item.displayedTitle}
      />
    ));
  };

  render() {
    const { props } = this;

    return userHasRole(88) ? (
      <div className="latest-news">
        <SectionTitle title={props.language.latestNews.title} />
        <div className="news-container">{this.displayNews()}</div>
        <NavLink className="more-button" to={Path.announcementPath}>
          {props.language.latestNews.more}
        </NavLink>
      </div>
    ) : (
      ''
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

LatestNews.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestNews);
