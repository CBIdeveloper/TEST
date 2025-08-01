import React from "react";
import ButtonDiv from "../../../../lib/components/ButtonDiv/ButtonDiv";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import "./MaintainManufacturerContact.scss"
import {createQuery} from "../../../../utils/parsers/queryParser";
import QueryType from "../../../../utils/types/QueryType";
import UrlParser from "../../../../utils/parsers/urlParser";
import Path from "../../../../utils/path/path";

class MaintainManufacturerContact extends React.PureComponent {
    
    handleClick = () => {
        const { props } = this;
        const query = createQuery({
            [QueryType.TAB]: 11,
        });
        props.history.push({
            pathname: UrlParser([
                props.location.pathname,
                Path.contactInformationDetailPath,
            ]),
            search: query,
        });
    }
    
    render() {
        return (
            <div className="maintain-manufacturer-contact-container">
                <ButtonDiv className="maintain-manufacturer-contact" onClick={this.handleClick}>維運廠商聯絡資訊</ButtonDiv>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

MaintainManufacturerContact.propTypes = {
    language: PropTypes.objectOf(Object).isRequired,
    history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MaintainManufacturerContact),
);