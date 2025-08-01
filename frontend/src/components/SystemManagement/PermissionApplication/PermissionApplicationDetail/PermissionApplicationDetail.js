import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import FormDescription from '../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import PageTitle from '../../../../lib/components/PageTitle/PageTitle';

import {setLoading} from '../../../../store/loading/slice';

import ApiService from '../../../../utils/api/ApiService';
import QueryType from '../../../../utils/types/QueryType';

import './PermissionApplicationDetail.scss';

class PermissionApplicationDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {formInitialValue: null, id: ''};
    }

    componentDidMount() {
        this.initState();
    }

    componentDidUpdate(prevProps) {
        const {props} = this;
        if (props.query.queryObject !== prevProps.query.queryObject) {
            this.initState();
        }
    }

    setId = (id) => {
        this.setState({id});
    };

    setFormInitialValue = (formInitialValue) => {
        this.setState({formInitialValue});
    };

    initState = () => {
        const {props} = this;
        const id = props.query.queryObject.get(QueryType.ID);
        if (id !== null) {
            this.setId(id);
            ApiService.permissionApplication.readPermissionApplicationById(id).then((response) => {
                this.setFormInitialValue(response);
            });
        }
    };

    render() {
        const {props, state} = this;

        if (state.formInitialValue === null) return '';

        return (
            <Container className="permission-application-detail">
                <div>
                    <PageTitle
                        title={props.language.systemManagement.subMenus.permissionApplicationDetail}
                        breadcrumb={false}
                    />
                    <FormRow>
                        <FormDescription
                            leftBorder
                            title={props.language.permissionApplicationDetail.name}
                            content={state.formInitialValue.name}
                        />
                    </FormRow>
                    <FormRow>
                        <FormDescription
                            leftBorder
                            title={props.language.permissionApplicationDetail.unitName}
                            content={state.formInitialValue.unitName}
                        />
                    </FormRow>
                    <FormRow>
                        <FormDescription
                            leftBorder
                            title={props.language.permissionApplicationDetail.applyDate}
                            content={state.formInitialValue.createdAt}
                        />
                    </FormRow>
                    <FormRow>
                        <FormDescription
                            leftBorder
                            title={props.language.permissionApplicationDetail.applyDate}
                            content={`${state.formInitialValue.useStartDate}~${state.formInitialValue.useEndDate}`}
                        />
                    </FormRow>
                    <FormRow>
                        <FormDescription
                            leftBorder
                            title={props.language.permissionApplicationDetail.requirements}
                            content={state.formInitialValue.requirements}
                        />
                    </FormRow>
                    <FormRow>
                        <FormDescription
                            leftBorder
                            title={props.language.permissionApplicationDetail.braidingCategory}
                            content={state.formInitialValue.braidingCategory}
                        />
                    </FormRow>
                    {state.formInitialValue.status !== 0 && state.formInitialValue.status !== 3 && <FormRow>
                        <FormDescription
                            leftBorder
                            title={props.language.permissionApproveDetail.auditOpinion}
                            content={state.formInitialValue.auditOpinion}
                        />
                    </FormRow>
                    }
                </div>
                <div className="action-button-container">
                    <ButtonDiv
                        className="normal-button"
                        onClick={props.history.goBack}
                    >
                        {props.language.permissionApplicationDetail.back}
                    </ButtonDiv>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.language.languageInfo.languageObject,
    query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({
    setLoading: (payload) => dispatch(setLoading(payload)),
});

PermissionApplicationDetail.propTypes = {
    language: PropTypes.objectOf(Object).isRequired,
    query: PropTypes.objectOf(Object).isRequired,
    setLoading: PropTypes.func.isRequired,
    history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PermissionApplicationDetail),
);
