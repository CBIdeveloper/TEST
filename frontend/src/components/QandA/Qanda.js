import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTitle from '../../lib/components/PageTitle/PageTitle';
import { setLoading } from '../../store/loading/slice';
import './Qanda.scss';
import Container from '../../lib/components/Container/Container';

class Qanda extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subtitleButtonIndex: 0,
      teachVideo: null,
      qandaContent: null,
      showAnswer: true,
      index: 0,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.showAnswer !== this.state.showAnswer) {
      this.callQandA(this.state.index);
    }
  }

  componentDidMount() {
    this.callQandA(0);
  }

  handleSubtitleButtonClick = (index) => {
    this.setState({ subtitleButtonIndex: index }, () => {
      this.callQandA(index);
    });
    this.setState({ teachVideo: null });
  };

  handleTeachButtonClick = (index) => {
    this.setState({ teachVideo: index });
  };

  toggleAnswer = (isShowAnswer, index) => {
    this.setState({ index: index });
    this.setState({ showAnswer: !isShowAnswer });
  };

  callQandA = (index) => {
    let qandaContent;
    switch (index) {
      case 0:
        qandaContent = this.accountApply();
        break;
      case 1:
        qandaContent = this.system();
        break;
      case 2:
        qandaContent = this.notify();
        break;
      case 3:
        qandaContent = this.transSystem();
        break;
    }
    this.setState({ qandaContent });
  };

  accountApply = () => {
    const { props, state } = this;
    const { teachVideo, showAnswer } = state;
    const buttonLabels = ['帳號綁定', '登入系統'];
    return (
      <div>
        <div className="accountTitle">
          <div className="teachVideo">教學影片下載:</div>
          <div className="button-container">
            {buttonLabels.map((label, index) => (
              <button
                key={index}
                className={`video-button ${
                  teachVideo === index ? 'clicked' : ''
                }`}
                onClick={() => this.handleTeachButtonClick(index)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <h1
          className="question"
          onClick={() => this.toggleAnswer(showAnswer, 0)}
        >
          <div className="inner">Q1.如何申請帳號?</div>
        </h1>
        {showAnswer && (
          <h1>
            <div className="inner">A1. 可於系統登入首頁點選下方的「帳號申請」按鈕</div>
          </h1>
        )}
      </div>
    );
  };

  system = () => {
    return (
      <div>
        <h3>系統功能的內容</h3>
        <p>這是關於系統功能的相關資訊。</p>
      </div>
    );
  };

  notify = () => {
    return (
      <div>
        <h3>通知功能的內容</h3>
        <p>這是關於通知功能的相關資訊。</p>
      </div>
    );
  };

  transSystem = () => {
    return (
      <div>
        <h3>傳輸系統的內容</h3>
        <p>這是關於傳輸系統的相關資訊。</p>
      </div>
    );
  };

  render() {
    const { props, state } = this;
    const { subtitleButtonIndex, qandaContent } = state;
    const buttonLabels = ['帳號申請', '系統功能', '通知功能', '傳輸系統'];
    return (
      <div className="q-and-a">
        <Container breadcrumb={false}>
          <PageTitle title={props.language.serve.subMenus.qanda} />
          <div className="button-container">
            {buttonLabels.map((label, index) => (
              <button
                key={index}
                className={`subtitle-button ${
                  subtitleButtonIndex === index ? 'clicked' : ''
                }`}
                onClick={() => this.handleSubtitleButtonClick(index)}
              >
                {label}
              </button>
            ))}
          </div>
          <div>{qandaContent}</div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

Qanda.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Qanda);
