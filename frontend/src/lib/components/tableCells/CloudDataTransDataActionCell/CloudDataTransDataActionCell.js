import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import ApiService from '../../../../utils/api/ApiService';
import './CloudDataTransDataActionCell.scss';
import { getUserId, getFirstlevelUnitId } from '../../../../utils/auth/auth';
import CloudDataTable from '../../../../utils/tables/dataSearch/CloudDataTable/CloudDataTable';
import { setLoading } from '../../../../store/loading/slice';

class CloudDataTransDataActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    // console.log(getFirstlevelUnitId());
    this.state = {
      time: null,
    };
  }

  setTime = (time) => {
    if (time != null) {
      time = time.replace('T', ' ');
      time = time.split('.')[0];
    }
    this.setState({ time });
  };

  componentDidMount() {
    if (this.props.cell.row.original.transAt != undefined) {
      this.setTime(this.props.cell.row.original.transAt);
    }
  }

  chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  updatDataStatus = async () => {
    const { props, state } = this;
    props.setLoading(true);
    const code = props.cell.row.original.code;
    const response = await ApiService.cloudDataEditService.cloudDataEditData(
      code,
    );
    let cloudData = [];
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].FirstlevelUnitId == getFirstlevelUnitId()) {
        cloudData.push(response.data[i]);
      }
    }
    let id = [];
    let count = 0;
    let nonCount = 0;
    for (let i = 0; i < cloudData.length; i++) {
      id.push(cloudData[i].Id);
      if (cloudData[i].NonComplianceReason == '') {
        count++;
      } else {
        nonCount++;
      }
    }
    if (id != '') {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('code', code);
      await ApiService.cloudDataEditService.updateStatusById(formData);
    }
    props.setLoading(false);
    if (getFirstlevelUnitId() != '') {
      ApiService.fileUpload.getDataByCode(code).then((res) => {
        const id = res.fileUploadList[0].id;
        const formData = new FormData();
        formData.append('id', id);
        formData.append('code', code);
        formData.append('count', count);
        formData.append('nonCount', nonCount);
        ApiService.cloudDataEditService.updateLog(formData).then(async () => {
          let res2 = await ApiService.fileUpload.getDataByCode(code);
          await ApiService.fileUpload.sendEmailByCode(
            res2.fileUploadList[0].id,
          );
          window.location.reload();
        });
      });
    }
  };

  render() {
    const { props, state } = this;
    return (
      <div className="upload-data-action-cell">
        <div className="upload-data-action-cell2">
          <div className="box">
            <ButtonDiv className="upload-button" onClick={this.updatDataStatus}>
              {'傳輸'}
            </ButtonDiv>
          </div>
          <span className="text">{state.time}</span>
        </div>
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

CloudDataTransDataActionCell.defaultProps = {
  limitSize: true,
  sizeLimitInMb: 50,
};

CloudDataTransDataActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  sizeLimitInMb: PropTypes.number,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CloudDataTransDataActionCell),
);
