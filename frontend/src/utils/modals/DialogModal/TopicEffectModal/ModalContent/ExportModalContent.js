import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';
import SelectInput from '../../../../../lib/components/inputs/SelectInput/SelectInput';

import { setLoading } from '../../../../../store/loading/slice';
import QueryHelper from '../../../../../utils/helper/QueryHelper';
import DateHelper from '../../../../../utils/helper/DateHelper';
import ApiService from '../../../../api/ApiService';
import ExcelJS from 'exceljs';

import '../TopicEffectModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      yearList: []
    };
  }

  componentDidMount() {
    this.initState();
  }

  setYear = (year) => {
    this.setState({ year });
  };

  setYearList = (yearList) => {
    this.setState({ yearList });
  };

  initState = async () => {
    const { props } = this;

    props.setLoading(true);

    //撈取年度資料
    const queryList = [];
    queryList.push(
      QueryHelper.equal(
        'isSign',
        true,
        'bool',
      )
    )
    const query = QueryHelper.singleQuery(QueryHelper.andQuery(queryList));
    const response = await ApiService.businessManagement.readBusinessManagementQuery({ query: query });
    const years = response.map((item) => { return new Date(item.meetingEndDate).getFullYear() });
    const uniqueYears = [...new Set(years)].map((item) => {
      return {
        text: item,
        value: item,
      }
    });
    this.setYearList(uniqueYears);
    // console.log('uniqueYears', uniqueYears)
    props.setLoading(false);
  }

  exportToExcel = async () => {
    const { props, state } = this;

    props.setLoading(true);

    const queryList = [];

    queryList.push(
      QueryHelper.equal(
        'isSign',
        true,
        'bool',
      )
    )

    queryList.push(
      QueryHelper.greater(
        'meetingEndDate',
        state.year + '-01-01T00:00:00Z',
      ),
    );

    queryList.push(
      QueryHelper.less(
        'meetingStartDate',
        state.year + '-12-31T23:59:59Z',
      ),
    );

    const query = QueryHelper.singleQuery(QueryHelper.andQuery(queryList));

    const response = await ApiService.businessManagement.readBusinessManagementQuery({ query: query });
    // console.log('response', response)

    // 工具函數：計算會議期間的天數
    const getDaysInRange = (startDate, endDate) => {
      const uniqueDays = new Set();
      let currentDate = new Date(startDate);

      while (currentDate <= new Date(endDate)) {
        uniqueDays.add(currentDate.toDateString()); // 確保日期唯一
        currentDate.setDate(currentDate.getDate() + 1); // 移動到下一天
      }
      return uniqueDays;
    };

    // 初始化月份資料
    const initializeMonths = () => {
      const months = {};
      for (let i = 1; i <= 12; i++) {
        const month = `${String(i).padStart(2, "0")}`;
        months[month] = {
          days: 0,
          meetings: 0,
          topics: 0,
          units: 0,
          attendees: 0,
        };
      }
      return months;
    };

    // 按月份統計
    const months = initializeMonths();

    const meetings = response.map((item) => {
      return {
        startDate: DateHelper.changeDate(item.meetingStartDate),
        endDate: DateHelper.changeDate(item.meetingEndDate),
        topics: item.topicList.length,
        units: new Set(item.businessManagementTestSigns.map(item => item.unit)).size,
        attendees: item.businessManagementTestSigns.length,
      };
    });

    // console.log('meetings', meetings)

    meetings.forEach(({ startDate, endDate, topics, units, attendees }) => {
      const end = new Date(endDate);

      if (end.getFullYear() === state.year) {
        const endMonth = `${String(end.getMonth() + 1).padStart(2, "0")}`;

        // 使用 getDaysInRange 返回的 Set
        const uniqueDays = getDaysInRange(startDate, endDate);

        // 更新月份統計資料
        if (months[endMonth]) {
          months[endMonth].days += uniqueDays.size; // 唯一天數
          months[endMonth].meetings += 1; // 每個會議只計算一次
          months[endMonth].topics += topics;
          months[endMonth].units += units;
          months[endMonth].attendees += attendees;
        }
      }
    });

    // 將統計結果映射為 Excel 資料
    const excelData = Object.entries(months)
      .sort(([monthA], [monthB]) => monthA - monthB) // 按月份排序
      .map(([month, data]) => {
        return {
          "月份": `${parseInt(month)}月`,  // 將月份顯示為 1月, 2月, ...
          "日期(天數)": data.days,
          "會議(次數)": data.meetings,
          "研討議題(項)": data.topics,
          "與會單位(個)": data.units,
          "人次": data.attendees,
        };
      });

    // 增加合計行
    const totals = {
      days: 0,
      meetings: 0,
      topics: 0,
      units: 0,
      attendees: 0,
    };

    Object.values(months).forEach((data) => {
      totals.days += data.days;
      totals.meetings += data.meetings;
      totals.topics += data.topics;
      totals.units += data.units;
      totals.attendees += data.attendees;
    });

    excelData.push({
      "月份": "合計",
      "日期(天數)": totals.days,
      "會議(次數)": totals.meetings,
      "研討議題(項)": totals.topics,
      "與會單位(個)": totals.units,
      "人次": totals.attendees,
    });

    // console.log('excelData', excelData)

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('統計表');
    const headers = [
      '月份',
      '日期(天數)',
      '會議(次數)',
      '研討議題(項)',
      '與會單位(個)',
      '人次',
    ];
    worksheet.columns = headers.map((header) => ({ header, key: header }));
    excelData.forEach((row) => worksheet.addRow(row));
    worksheet.columns.forEach((column) => {
      column.width = column.header.length + 5;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '合署成果統計表.xlsx';
    link.click();

    props.setLoading(false);
  };

  render() {
    const { props } = this;

    return (
      <div className="topic-effect-modal width-auto">
        <SectionTitle title={props.title} />
        <div className="info-section">
          <SelectInput
            title="年度"
            inputName="年度"
            inputPlaceholder="請選擇年度"
            inputValue={this.state.year}
            setFieldValue={(field, value) => this.setYear(value)}
            options={this.state.yearList}
          />
          <div className="action-button-container">
            <ButtonDiv className="approve-button" onClick={this.exportToExcel}>
              匯出
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

ModalContent.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
