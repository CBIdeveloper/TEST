import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import MultipleSelectInput from '../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';
import CertificateLogin from '../CertificateLogin/CertificateLogin';
import FidoLogin from '../FidoLogin/FidoLogin';

import './CertificateSwitch.scss';

class CertificateSwitch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: true,
    };
  }

  setStatetMode = (mode) => {
    console.log("mode", mode)
    this.setState({ mode });
  };

  displayContent = () => {
    const { state } = this;
    if (state.mode === true) {
      return <CertificateLogin />;
    }
    if (state.mode === false) {
      return <FidoLogin />;
    }
    return '';
  };

  render() {
    const { props, state } = this;

    return (
      <div className="certificate">
        <div className="certificate-switch">
          <MultipleSelectInput
            horizontal
            singleSelection
            zenMode
            title={props.language.login.certificateLogin}
            inputName="CertificateSwitch"
            inputValue={state.mode}
            setFieldValue={(field, value) => this.setStatetMode(value)}
            options={certificateType}
          />
        </div>
        {this.displayContent()}
      </div>
    );
  }
}

const certificateType = [
  { text: '自然人憑證', value: true },
  { text: '行動自然人憑證', value: false },
];

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

CertificateSwitch.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CertificateSwitch));
