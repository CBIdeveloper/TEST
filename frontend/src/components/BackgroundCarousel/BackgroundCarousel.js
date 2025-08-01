import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';

import ButtonDiv from '../../lib/components/ButtonDiv/ButtonDiv';

import BackgroundImage from '../../utils/constants/BackgroundImage';

import './BackgroundCarousel.scss';

class BackgroundCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.setCurrentIndex(0);
    setInterval(this.nextImage, 10000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { state } = this;
    if (state.currentIndex !== prevState.currentIndex) {
      this.showSlide();
    }
  }

  setCurrentIndex = (currentIndex) => {
    this.setState({ currentIndex });
  };

  activeClassname = (index) => {
    const { state } = this;
    return state.currentIndex === index ? 'active' : '';
  };

  displayImages = () => (
    <ul className="slides-container" id="slides-container">
      {BackgroundImage.map((item) => (
        <img
          src={item}
          key={item}
          className="slide fade"
          alt="carousel slide"
        />
      ))}
    </ul>
  );

  displayDots = () => (
    <div className="dot-container">
      {BackgroundImage.map((item, index) => (
        <ButtonDiv
          key={item}
          className={`dot ${this.activeClassname(index)}`}
          onClick={() => this.setCurrentIndex(index)}
        />
      ))}
    </div>
  );

  previousImage = () => {
    const { state } = this;
    if (state.currentIndex === 0) {
      this.setCurrentIndex(BackgroundImage.length - 1);
    } else {
      this.setCurrentIndex(state.currentIndex - 1);
    }
  };

  nextImage = () => {
    const { state } = this;
    if (state.currentIndex === BackgroundImage.length - 1) {
      this.setCurrentIndex(0);
    } else {
      this.setCurrentIndex(state.currentIndex + 1);
    }
  };

  showSlide = () => {
    const { state } = this;
    const slides = document.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i += 1) {
      slides[i].style.display = 'none';
    }
    slides[state.currentIndex].style.display = 'block';
  };

  render() {
    const { props } = this;

    return (
      <div
        className="background-carousel"
        style={{
          height: `${props.size}px`,
          width: `${props.size}px`,
        }}
      >
        {this.displayImages()}
        <div className="action-button-container">
          <ButtonDiv className="previous-button" onClick={this.previousImage}>
            <IoIosArrowDropleftCircle className="icon" />
          </ButtonDiv>
          <ButtonDiv className="next-button" onClick={this.nextImage}>
            <IoIosArrowDroprightCircle className="icon" />
          </ButtonDiv>
          <div className="left-shadow" />
          {this.displayDots()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

BackgroundCarousel.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  size: PropTypes.number.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BackgroundCarousel),
);
