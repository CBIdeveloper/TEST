import React from 'react';
import { connect } from 'react-redux';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import { setLoading } from '../../../../../store/loading/slice';
import { getUserId } from '../../../../auth/auth';
import '../DataformModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: '',
      datafrom: '',
      nonReasonCount: '',
    };
  }

  setDatafrom = (datafrom) => {
    this.setState({ datafrom });
  };

  setTotalCount = (totalCount) => {
    this.setState({ totalCount });
  };

  setNonReasonCount = (nonReasonCount) => {
    this.setState({ nonReasonCount });
  };

  componentDidMount() {
    this.initState();
  }

  initState = () => {
    const { props } = this;
    let totalCount =
      Number(props.cloudDataCount) +
      Number(props.transCount) +
      Number(props.troadCount) +
      Number(props.sftpCount);
    let datafrom = 0;
    if (props.cloudDataCount != 0) {
      datafrom++;
    }
    if (props.transCount != 0) {
      datafrom++;
    }
    if (props.troadCount != 0) {
      datafrom++;
    }
    if (props.sftpCount != 0) {
      datafrom++;
    }
    const nonReasonCount = props.resultArray.reduce(
      (acc, curr) => acc + curr.item2,
      0,
    );
    this.setDatafrom(datafrom);
    this.setTotalCount(totalCount);
    // console.log(nonReasonCount)
    this.setNonReasonCount(nonReasonCount);
  };

  render() {
    const { props, state } = this;
    return (
      <div className="Not-correct-modal">
        <SectionTitle title={'資料來源分析'} />
        {props.troadCount != 0 && (
          <div className="reason-box">
            <div className="reason">
              <span>部會傳輸系統資料</span>
            </div>
            <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
              <div
                className="bar"
                style={{
                  width: `${
                    (Number(props.troadCount) / Number(state.totalCount)) * 100
                  }%`,
                }}
              ></div>
              <span style={{ fontSize: '1.6rem' }}>{props.troadCount}</span>
            </div>
          </div>
        )}
        {props.transCount != 0 && (
          <div className="reason-box">
            <div className="reason">
              <span>地方政府傳輸系統資料</span>
            </div>
            <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
              <div
                className="bar"
                style={{
                  width: `${
                    (Number(props.transCount) / Number(state.totalCount)) * 100
                  }%`,
                }}
              ></div>
              <span style={{ fontSize: '1.6rem' }}>{props.transCount}</span>
            </div>
          </div>
        )}
        {props.cloudDataCount != 0 && (
          <div className="reason-box">
            <div className="reason">
              <span>雲端編輯資料</span>
            </div>
            <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
              <div
                className="bar2"
                style={{
                  width: `${
                    (Number(props.cloudDataCount) / Number(state.totalCount)) *
                    100
                  }%`,
                }}
              ></div>
              <span style={{ fontSize: '1.6rem' }}>{props.cloudDataCount}</span>
            </div>
          </div>
        )}
        {props.sftpCount != 0 && (
          <div className="reason-box">
            <div className="reason">
              <span>跨系統介接資料</span>
            </div>
            <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
              <div
                className="bar2"
                style={{
                  width: `${
                    (Number(props.sftpCount) / Number(state.totalCount)) * 100
                  }%`,
                }}
              ></div>
              <span style={{ fontSize: '1.6rem' }}>{props.sftpCount}</span>
            </div>
          </div>
        )}
        <div className="under">
          資料來源:{state.datafrom} &nbsp; 傳輸筆數:{props.count}
        </div>
        <hr />
        <hr />
        <SectionTitle title={'不合規原因分析'} />
        {props.resultArray.length > 0 && (
          <div>
            {props.resultArray.map(({ item1, item2 }) => (
              <div key={item1} className="reason-box">
                <div className="reason">
                  <span>{item1}</span>
                </div>
                <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
                  <div
                    className="bar3"
                    style={{
                      width: `${
                        (Number(item2) / Number(state.nonReasonCount)) * 100
                      }%`,
                    }}
                  ></div>
                  <span style={{ fontSize: '1.6rem' }}>{item2}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="under">不合規筆數:{props.resultArray.length}項{props.count2}筆</div>
        <div className="underline">
          <div className="button-group">
            <ButtonDiv className="confirm-button" onClick={props.onClose}>
              {'確認'}
            </ButtonDiv>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
