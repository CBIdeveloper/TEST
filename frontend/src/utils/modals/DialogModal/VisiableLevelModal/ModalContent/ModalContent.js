import React from 'react';
import { connect } from 'react-redux';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import { setLoading } from '../../../../../store/loading/slice';
import { getUserId } from '../../../../auth/auth';
import '../VisiableLevelModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.initState();
  }

  initState = () => {
    const { props } = this;
  };

  render() {
    const { props } = this;
    return (
      <div className="visiable-level-modal">
        <SectionTitle title={'已選單位列表'} />
        <div className="detail">●已選單位包含以下單位及其內部單位</div>
        {props.isVisibleToAll === true ? (
          <table>
            <tr>
              <th className="column-left">中央機關</th>
              <th className="column-right">{props.firstlevelAgencyList}</th>
            </tr>
            <tr>
              <th className="column-left">地方政府</th>
              <th className="column-right">{props.cityList}</th>
            </tr>
            <tr>
              <th className="column-left">國軍單位</th>
              <th className="column-right">{props.militaryList}</th>
            </tr>
          </table>
        ) : (
          <table>
            <tr>
              <th className="column-left">中央機關</th>
              {props.isOrganizationClear === true ? (
                <th className="column-right">{props.firstlevelAgencyList}</th>
              ) : (
                <th className="column-right">{props.visOrganizationList}</th>
              )}
            </tr>
            <tr>
              <th className="column-left">地方政府</th>
              {props.isGovernmentClear === true ? (
                <th className="column-right">{props.cityList}</th>
              ) : (
                <th className="column-right">{props.visGovermentList}</th>
              )}
            </tr>
            <tr>
              <th className="column-left">國軍單位</th>
              {props.isMilitaryClear === true ? (
                <th className="column-right">{props.militaryList}</th>
              ) : (
                <th className="column-right">{props.visMilitaryList}</th>
              )}
            </tr>
          </table>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
