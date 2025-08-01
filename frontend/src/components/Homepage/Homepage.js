import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BackgroundCarousel from '../BackgroundCarousel/BackgroundCarousel';
import LatestNews from './LatestNews/LatestNews';
import FeaturePanel from './FeaturePanel/FeaturePanel';
import { userHasRole } from '../../utils/auth/auth';

import './Homepage.scss';

// import '@progress/kendo-theme-default/dist/all.css';
// import { Spreadsheet } from '@progress/kendo-react-spreadsheet';
// import { data } from '../DataSearch/basic-data';

class Homepage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { imageSize: 0 };
  }

  componentDidMount() {
    this.initImageSize();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { props } = this;
    if (
      props.windowSize.height !== prevProps.windowSize.height ||
      props.windowSize.width !== prevProps.windowSize.width
    ) {
      this.initImageSize();
    }
  }

  setImageSize = (imageSize) => {
    this.setState({ imageSize });
  };

  initImageSize = () => {
    const { props } = this;
    const imageSize =
      props.windowSize.height > props.windowSize.width
        ? props.windowSize.height
        : props.windowSize.width;
    this.setImageSize(imageSize);
  };

  render() {
    const { props, state } = this;

    return (
      <div className="homepage" style={{ height: `${state.imageSize}px` }}>
        {userHasRole(87) ? (
          <>
            {/* <Spreadsheet style={{
              width: '100%',
              height: 680
            }} defaultProps={{
              sheets: data
            }} /> */}
            <LatestNews />
            <FeaturePanel />
          </>
        ) : (
          ''
        )}
        <BackgroundCarousel size={state.imageSize} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  windowSize: state.window.windowSize,
});

const mapDispatchToProps = (dispatch) => ({});

Homepage.propTypes = {
  windowSize: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
