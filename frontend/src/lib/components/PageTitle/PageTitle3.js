import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import SectionTitle from '../SectionTitle/SectionTitle';
import ButtonDiv from '../ButtonDiv/ButtonDiv';

import './PageTitle2.scss';

class PageTitle extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="page-title">
        <SectionTitle title={props.title} />
        {props.breadcrumb ? <Breadcrumb /> : ''}
        {props.postfixComponent}
        <ButtonDiv
          className="video-link"
          children={<span>操作說明影片</span>}
          onClick={() => this.onVideo('https://drive.google.com/file/d/1Vg9yGPr7MAalv2SeohgtJQeD5TawVGnU/view?usp=drive_link')}
        ></ButtonDiv>
      </div>
    );
  }

  onVideo = (untrustedURL) => {
    var newWindow = window.open();
    newWindow.opener = null;
    newWindow.location = untrustedURL;
  };
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

PageTitle.defaultProps = {
  breadcrumb: true,
  postfixComponent: '',
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  postfixComponent: PropTypes.node,
  breadcrumb: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);
