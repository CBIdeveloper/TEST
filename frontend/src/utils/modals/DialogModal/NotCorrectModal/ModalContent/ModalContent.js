import React from 'react';
import { connect } from 'react-redux';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import { setLoading } from '../../../../../store/loading/slice';
import { getUserId } from '../../../../auth/auth';
import '../NotCorrectModal.scss';
import ApiService from '../../../../api/ApiService';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reasonCount: [],
      totalCount: '',
    };
  }
  setReasonCount = (reasonCount) => {
    this.setState({ reasonCount });
  };
  setTotalCount = (totalCount) => {
    this.setState({ totalCount });
  };
  componentDidMount() {
    this.initState();
  }

  initState = async () => {
    const { props } = this;
    const id = props.id;
    if (id != null) {
      ApiService.cloudDataEditService.nonReason(id).then((response) => {
        // console.log(response.nonResponseList);
        if (response.nonResponseList.length > 0) {
          const maxCountObject = response.nonResponseList.reduce(
            (max, item) => {
              return item.count > max.count ? item : max;
            },
            response.nonResponseList[0],
          );
          // console.log(maxCountObject.count)
          this.setReasonCount(response.nonResponseList);
          this.setTotalCount(maxCountObject.count);
        }
      });
    }
  };

  render() {
    const { props, state } = this;
    // console.log(state.reasonCount);
    return (
      <div className="Not-correct-modal">
        <SectionTitle title={'不合規原因分析'} />
        {state.reasonCount.length > 0 && (
          <div>
            {state.reasonCount.map(({ reason, count }) => (
              <div key={reason} className="reason-box">
                <div className="reason">
                  <span>{reason}</span>
                </div>
                <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
                  <div
                    className="bar3"
                    style={{
                      width: `${
                        (Number(count) / Number(state.totalCount)) * 100
                      }%`,
                    }}
                  ></div>
                  <span style={{ fontSize: '1.6rem' }}>{count}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="under">不合規筆數:{props.nonComplianceQuantity}項</div>
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
