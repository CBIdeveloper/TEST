import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Container from '../../../lib/components/Container/Container';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import DateInput from '../../../lib/components/inputs/DateInput/DateInput';
import SelectInput from '../../../lib/components/inputs/SelectInput/SelectInput';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';
import MultiTableSearch from '../../../lib/components/MultiTableSearch/MultiTableSearch';
import Pagination from '../../../lib/components/Pagination/Pagination';

import TopicEffectTable from '../../../utils/tables/businessManagement/TopicEffectTable';
import QueryHelper from '../../../utils/helper/QueryHelper';
import { dateObjectToDateString } from '../../../utils/parsers/dateParser';

import ModalHelper from '../../../utils/helper/ModalHelper';
import DateHelper from '../../../utils/helper/DateHelper';
import ApiService from '../../../utils/api/ApiService';
import { setLoading } from '../../../store/loading/slice';
import ExcelJS from 'exceljs';

import './TopicEffect.scss';

class TopicEffect extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            meetingType: '',
            announcementUnit: '',
            startDate: '',
            endDate: '',
            tableData: [],
            announcementUnitList: [],
            meetingTypeList: [],
            tableCount: 0,
            Count: 0,
        };
        this.table = new TopicEffectTable(
            this.setTableData,
            this.setTableCount,
        );

        this.table.typeId = 1;
    }

    componentDidMount() {
        this.initState();
        this.table.fetchTableData();
    }

    setTableData = (tableData) => {
        const data = tableData.map((item, index) => ({
            ...item,
            index: index + this.table.currentSkip() + 1,
        }));
        this.setState({ tableData: data });
        let Count = this.state.Count;
        if (Count == 0) {
            const announcementUnits = Array.from(
                new Set(data.map((item) => item.announcementUnit)),
            ).map((announcementUnit) => ({
                text: announcementUnit,
                value: announcementUnit,
            }));
            this.setAnnouncementUnitList(announcementUnits);
        }
        this.setState({ Count: Count + 1 });
    };

    setTableCount = (tableCount) => {
        this.setState({ tableCount });
    };

    setTitle = (title) => {
        this.setState({ title });
    };

    setAnnouncementUnit = (announcementUnit) => {
        this.setState({ announcementUnit });
    };

    setAnnouncementUnitList = (announcementUnitList) => {
        this.setState({ announcementUnitList });
    };

    setStartDate = (startDate) => {
        this.setState({ startDate });
    };

    setEndDate = (endDate) => {
        this.setState({ endDate });
    };

    setMeetingType = (meetingType) => {
        this.setState({ meetingType });
    };

    setMeetingTypeList = (meetingTypeList) => {
        this.setState({ meetingTypeList });
    };

    initState = () => {
        ApiService.codefile.getMeetingTypeList().then((response) => {
            const meetingTypeList = response.codefileList.map((item) => ({
                text: item.name,
                value: item.id,
            }));
            this.setMeetingTypeList(meetingTypeList);
        });
    }

    resetSearch = () => {
        this.setTitle('');
        this.setMeetingType('');
        this.setAnnouncementUnit('');
        this.setStartDate('');
        this.setEndDate('');
    };

    search = () => {
        const { state } = this;
        // console.log(state);
        let queryList = [];
        if (state.title !== '') {
            queryList.push(QueryHelper.contains('title', state.title, 'string'));
        }
        if (state.meetingType !== '') {
            queryList.push(
                QueryHelper.equal(
                    'meetingType',
                    state.meetingType,
                    'string',
                ),
            );
        }
        if (state.announcementUnit !== '') {
            queryList.push(
                QueryHelper.contains(
                    ['announcedUnit'],
                    state.announcementUnit,
                    'string',
                ),
            );
        }
        if (state.startDate !== '') {
            queryList.push(
                QueryHelper.greater(
                    'meetingStartDate',
                    dateObjectToDateString(state.startDate),
                ),
            );
        }
        if (state.endDate !== '') {
            queryList.push(
                QueryHelper.less(
                    'meetingEndDate',
                    dateObjectToDateString(state.endDate),
                ),
            );
        }
        this.table.query = QueryHelper.multipleAndQuery([
            ...queryList,
            this.table.queryPrefix(),
        ]);
        this.table.currentPage = 1;
        this.table.queryTableData();
    };

    searchInput = () => {
        const { state } = this;
        return (
            <div className="search-containers">
                <div className="text-containers">
                    <TextInput
                        title=""
                        inputName=""
                        inputPlaceholder="會議事由(講習名稱)"
                        inputValue={state.title}
                        inputOnChange={(event) => this.setTitle(event.target.value)}
                        zenMode
                    />
                    <SelectInput
                        title=""
                        inputName=""
                        inputPlaceholder="講習類型"
                        inputValue={state.meetingType}
                        setFieldValue={(field, value) => this.setMeetingType(value)}
                        options={state.meetingTypeList}
                        zenMode
                    />
                    <SelectInput
                        title=""
                        inputName=""
                        inputPlaceholder="承辦單位"
                        inputValue={state.announcementUnit}
                        setFieldValue={(field, value) => this.setAnnouncementUnit(value)}
                        options={state.announcementUnitList}
                        zenMode
                    />
                </div>
                <div className="date-containers">
                    <DateInput
                        title=""
                        inputName=""
                        inputPlaceholder="會議開始日期"
                        inputValue={state.startDate}
                        setFieldValue={(field, value) => this.setStartDate(value)}
                        // maxDate={state.endDate || new Date()}
                        zenMode
                    />
                    <DateInput
                        title=""
                        inputName=""
                        inputPlaceholder="會議結束日期"
                        inputValue={state.endDate}
                        setFieldValue={(field, value) => this.setEndDate(value)}
                        minDate={state.startDate}
                        // maxDate={new Date()}
                        zenMode
                    />
                </div>
            </div>
        );
    };



    exportToExcel = async () => {
        const response = await ApiService.businessManagement.readBusinessManagementQuery({ query: this.table.query });
        const excelData = response.map((item) => {
            return {
                "會議事由(講習名稱)": item.title,
                類別區分: item.meetingTypeName,
                地點: item.meetingPlace,
                承辦單位: item.announcementUnit,
                承辦人員: item.announcedUserAccount,
                會議日期: item.meetingDate,
                研討議題: item.topicListString,
                執行成效: item.topicListEffectString,
            };
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('統計表');
        const headers = [
            '會議事由(講習名稱)',
            '類別區分',
            '地點',
            '承辦單位',
            '承辦人員',
            '會議日期',
            '研討議題',
            '執行成效',
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
        link.download = '合署作業統計表.xlsx';
        link.click();
    };

    openExportModal = () => {
        ModalHelper.openTopicEffectExportModal({
            title: '合署成果統計表',
        });
    };

    render() {
        const { props, state } = this;
        return (
            <Container breadcrumb={false}>
                <div className="topic-effect">
                    <PageTitle
                        title={props.language.businessManagement.subMenus.topicEffect}
                    />
                    <MultiTableSearch
                        searchInput={this.searchInput()}
                        resetFunction={this.resetSearch}
                        searchFunction={this.search}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <TableCount count={state.tableCount} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <ButtonDiv
                                className="approve-button"
                                onClick={this.exportToExcel}
                            >
                                合署作業統計表
                            </ButtonDiv>
                            <ButtonDiv
                                className="approve-button"
                                onClick={this.openExportModal}
                            >
                                合署成果統計表
                            </ButtonDiv>
                        </div>
                    </div>
                    <Table data={state.tableData} columns={this.table.getTableHeader()} />
                    <Pagination
                        tableInstance={this.table}
                        currentPage={this.table.currentPage}
                        totalPage={this.table.totalPage}
                    />
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({
    setLoading: (payload) => dispatch(setLoading(payload)),
});

TopicEffect.propTypes = {
    language: PropTypes.objectOf(Object).isRequired,
    history: PropTypes.objectOf(Object).isRequired,
    location: PropTypes.objectOf(Object).isRequired,
    setLoading: PropTypes.func.isRequired,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TopicEffect),
);
