import React from 'react';
import { connect } from 'react-redux';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import { setLoading } from '../../../../../store/loading/slice';
import { getUserId } from '../../../../auth/auth';
import '../RequestAnswerModal.scss';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import MultipleSelectInput from '../../../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';
import ModalHelper from '../../../../helper/ModalHelper';
import ApiService from '../../../../api/ApiService';
import PropTypes from 'prop-types';
import ExcelJS from 'exceljs';
class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      requestResponse: [],
      answers: [],
    };
  }

  componentDidMount = () => {
    this.initState();
  };

  initState = () => {
    const { requestResponse, signResponse } = this.props.data;
    console.log(requestResponse);
  };

  displayRequestAnswerList = () => {
    const { requestResponse } = this.props.data;
    const users = [
      ...new Set(requestResponse.map((item) => item.sys_user_account)),
    ];
    const requests = [...new Set(requestResponse.map((item) => item.request))];
    const tableData = users.map((user) => {
      const firstEntry = requestResponse.find(
        (item) => item.sys_user_account === user,
      );
      const row = {
        sys_user_account: user,
        job_position: firstEntry ? firstEntry.job_position || '' : '',
        unit: firstEntry ? firstEntry.unit || '' : '',
      };
      requests.forEach((request) => {
        const entry = requestResponse.find(
          (item) => item.sys_user_account === user && item.request === request,
        );
        row[request] = entry ? entry.answer : '';
      });
      return row;
    });
    const totalUsers = users.length;
    return (
      <div>
        {requestResponse.length > 0 ? (
          <>
            <div className="table-container">
              <div className="button-context-group">
                <span className="field-people">填寫人數: {totalUsers}</span>
                <ButtonDiv
                  className="confirm-button"
                  onClick={this.downloadAnswerExcel}
                >
                  下載回饋統計表
                </ButtonDiv>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>回饋單位</th>
                    <th>職稱</th>
                    <th>填寫人員</th>
                    {requests.map((request) => (
                      <th key={request}>{request}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.sys_user_account}>
                      <td>{row.unit}</td>
                      <td>{row.job_position}</td>
                      <td>{row.sys_user_account}</td>
                      {requests.map((request) => (
                        <td key={request}>{row[request]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div>無人填寫回饋表單</div>
        )}
      </div>
    );
  };

  displayRequestSignList = () => {
    const { signResponse } = this.props.data;
    const tableData = signResponse.map((item) => ({
      unit: item.unit,
      jobPosition: item.job_position,
      name: item.name,
      telephone: item.telephone,
      food: item.food,
      place: item.place,
      traffic: item.traffic,
      license: item.license,
    }));
    const totalUsers = signResponse.length;
    return (
      <div>
        {signResponse.length > 0 ? (
          <>
            <div className="table-container">
              <div className="button-context-group">
                <span className="field-people">填寫人數: {totalUsers}</span>
                <ButtonDiv
                  className="confirm-button"
                  onClick={this.downloadSignExcel}
                >
                  下載報名統計表
                </ButtonDiv>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>報名單位</th>
                    <th>職稱</th>
                    <th>與會人員姓名</th>
                    <th>連絡電話</th>
                    <th>用餐</th>
                    <th>留宿</th>
                    <th>交通方式</th>
                    <th>車號</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.unit}</td>
                      <td>{row.jobPosition}</td>
                      <td>{row.name}</td>
                      <td>{row.telephone}</td>
                      <td>{row.food}</td>
                      <td>{row.place}</td>
                      <td>{row.traffic}</td>
                      <td>{row.license}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div>無人報名</div>
        )}
      </div>
    );
  };

  downloadAnswerExcel = async () => {
    const { requestResponse } = this.props.data;
    const users = [
      ...new Set(requestResponse.map((item) => item.sys_user_account)),
    ];
    const requests = [...new Set(requestResponse.map((item) => item.request))];
    const tableData = users.map((user) => {
      const firstEntry = requestResponse.find(
        (item) => item.sys_user_account === user,
      );
      const row = {
        sys_user_account: user,
        job_position: firstEntry ? firstEntry.job_position || '' : '',
        unit: firstEntry ? firstEntry.unit || '' : '',
      };
      requests.forEach((request) => {
        const entry = requestResponse.find(
          (item) => item.sys_user_account === user && item.request === request,
        );
        row[request] = entry ? entry.answer : '';
      });
      return row;
    });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('回饋統計表');
    const header = ['回饋單位', '職稱', '填寫人員', ...requests];
    worksheet.addRow(header);
    tableData.forEach((row) => {
      const rowData = [
        row.unit,
        row.job_position,
        row.sys_user_account,
        ...requests.map((request) => row[request]),
      ];
      worksheet.addRow(rowData);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), '回饋統計表.xlsx');
  };

  downloadSignExcel = async () => {
    const { signResponse } = this.props.data;
    const tableData = signResponse.map((item) => ({
      unit: item.unit,
      jobPosition: item.job_position,
      name: item.name,
      telephone: item.telephone,
      food: item.food,
      place: item.place,
      traffic: item.traffic,
      license: item.license,
    }));
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('報名統計表');
    const header = [
      '報名單位',
      '職稱',
      '與會人員姓名	',
      '連絡電話',
      '用餐',
      '留宿',
      '交通方式',
      '車號',
    ];
    worksheet.addRow(header);
    tableData.forEach((row) => {
      worksheet.addRow(Object.values(row));
    });
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), '報名統計表.xlsx');
  };

  render() {
    const { props, state } = this;
    const { requestResponse } = this.state;
    // console.log(state.reasonCount);
    return (
      <div className="request-answer-modal">
        <SectionTitle title={'報名統計'} />
        <div className="contact-item-container">
          {this.displayRequestSignList()}
        </div>
        <SectionTitle title={'回饋統計'} />
        <div className="contact-item-container">
          {this.displayRequestAnswerList()}
        </div>
        <div className="button-group">
          <ButtonDiv className="confirm-button" onClick={props.onClose}>
            {'關閉視窗'}
          </ButtonDiv>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});
ModalContent.propTypes = {
  setLoading: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
