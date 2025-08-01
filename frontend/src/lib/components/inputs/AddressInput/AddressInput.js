import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import SelectInput from '../SelectInput/SelectInput';

import CountyType from '../../../../utils/constants/CountyType';
import FormikHelper from '../../../../utils/helper/FormikHelper';

import './AddressInput.scss';

class AddressInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      county: '',
      city: '',
      // district: '',
      road: '',
      // neighborhood: '',
      lane: '',
      alley: '',
      number: '',
      floor: '',
      room: '',
    };
  }

  componentDidMount() {
    this.initState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { props, state } = this;
    if (
      state.county !== prevState.county ||
      state.city !== prevState.city ||
      // state.district !== prevState.district ||
      state.road !== prevState.road ||
      // state.neighborhood !== prevState.neighborhood ||
      state.lane !== prevState.lane ||
      state.alley !== prevState.alley ||
      state.number !== prevState.number ||
      state.floor !== prevState.floor ||
      state.room !== prevState.room
    ) {
      this.handleValueOnChange();
    }
    if (props.inputValue !== prevProps.inputValue) {
      this.initState();
    }
  }

  initState = () => {
    const { props } = this;
    if (props.inputValue !== null) {
      const splitAddressList = props.inputValue.split('|');
      if (splitAddressList[0] !== undefined) {
        this.setCounty(splitAddressList[0]);
      }
      if (splitAddressList[1] !== undefined) {
        this.setCity(splitAddressList[1]);
      }
      // if (splitAddressList[2] !== undefined) {
      //   this.setDistrict(splitAddressList[2]);
      // }
      if (splitAddressList[2] !== undefined) {
        this.setRoad(splitAddressList[2]);
      }
      // if (splitAddressList[4] !== undefined) {
      //   this.setNeighborhood(splitAddressList[4]);
      // }
      if (splitAddressList[3] !== undefined) {
        this.setLane(splitAddressList[3]);
      }
      if (splitAddressList[4] !== undefined) {
        this.setAlley(splitAddressList[4]);
      }
      if (splitAddressList[5] !== undefined) {
        this.setNumber(splitAddressList[5]);
      }
      if (splitAddressList[6] !== undefined) {
        this.setFloor(splitAddressList[6]);
      }
      if (splitAddressList[7] !== undefined) {
        this.setRoom(splitAddressList[7]);
      }
    }
  };

  setCounty = (county) => {
    this.setState({ county });
  };

  setCity = (city) => {
    this.setState({ city });
  };

  // setDistrict = (district) => {
  //   this.setState({ district });
  // };

  setRoad = (road) => {
    this.setState({ road });
  };

  // setNeighborhood = (neighborhood) => {
  //   this.setState({ neighborhood });
  // };

  setLane = (lane) => {
    this.setState({ lane });
  };

  setAlley = (alley) => {
    this.setState({ alley });
  };

  setNumber = (number) => {
    this.setState({ number });
  };

  setFloor = (floor) => {
    this.setState({ floor });
  };

  setRoom = (room) => {
    this.setState({ room });
  };

  handleValueOnChange = () => {
    const { props, state } = this;
    const value = `${state.county}|${state.city}|${state.road}|${state.lane}|${state.alley}|${state.number}|${state.floor}|${state.room}`;
    props.setFieldValue(props.inputName, value);
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  displayClassname = () => {
    const { props } = this;
    return props.display ? 'display' : '';
  };

  inputPlaceholder = (value) => {
    const { props } = this;
    return props.display ? '-' : value;
  };

  cityOptions = () => {
    const { state } = this;
    const city = CountyType.find((item) => item.value === state.county);
    return city === undefined ? [] : city.district;
  };

  displayInput = () => {
    const { props, state } = this;
    return (
      <div className="address-input-container">
        <SelectInput
          title=""
          inputName="county"
          inputValue={state.county}
          inputPlaceholder={this.inputPlaceholder(
            props.language.addressInput.countyHint,
          )}
          setFieldValue={(field, value) => this.setCounty(value)}
          options={CountyType}
          zenMode
          display={props.display}
        />
        <SelectInput
          title=""
          inputName="city"
          inputValue={state.city}
          inputPlaceholder={this.inputPlaceholder(
            props.language.addressInput.cityHint,
          )}
          setFieldValue={(field, value) => this.setCity(value)}
          options={this.cityOptions()}
          zenMode
          display={props.display}
        />
        {/* <input */}
        {/*  className={`city ${this.displayClassname()}`} */}
        {/*  name="city" */}
        {/*  placeholder={this.inputPlaceholder( */}
        {/*    props.language.addressInput.cityHint, */}
        {/*  )} */}
        {/*  value={state.city} */}
        {/*  onChange={(event) => this.setCity(event.target.value)} */}
        {/*  onKeyUp={props.onKeyUp} */}
        {/*  autoComplete="off" */}
        {/* /> */}
        {/* <input */}
        {/*   className={`district ${this.displayClassname()}`} */}
        {/*   name="district" */}
        {/*   placeholder={this.inputPlaceholder( */}
        {/*     props.language.addressInput.districtHint, */}
        {/*   )} */}
        {/*   value={state.district} */}
        {/*   onChange={(event) => this.setDistrict(event.target.value)} */}
        {/*   onKeyUp={props.onKeyUp} */}
        {/*   autoComplete="off" */}
        {/* /> */}
        <input
          className={`road ${this.displayClassname()}`}
          name="road"
          placeholder={this.inputPlaceholder(
            props.language.addressInput.roadHint,
          )}
          value={state.road}
          onChange={(event) => this.setRoad(event.target.value)}
          onKeyUp={props.onKeyUp}
          autoComplete="off"
        />
        {/* <input */}
        {/*   className={`neighborhood ${this.displayClassname()}`} */}
        {/*   name="neighborhood" */}
        {/*   placeholder={this.inputPlaceholder( */}
        {/*     props.language.addressInput.neighborhoodHint, */}
        {/*   )} */}
        {/*   value={state.neighborhood} */}
        {/*   onChange={(event) => this.setNeighborhood(event.target.value)} */}
        {/*   onKeyUp={props.onKeyUp} */}
        {/*   autoComplete="off" */}
        {/* /> */}
        <input
          className={`lane ${this.displayClassname()}`}
          name="lane"
          placeholder={this.inputPlaceholder(
            props.language.addressInput.laneHint,
          )}
          value={state.lane}
          onChange={(event) => this.setLane(event.target.value)}
          onKeyUp={props.onKeyUp}
          autoComplete="off"
        />
        <input
          className={`alley ${this.displayClassname()}`}
          name="alley"
          placeholder={this.inputPlaceholder(
            props.language.addressInput.alleyHint,
          )}
          value={state.alley}
          onChange={(event) => this.setAlley(event.target.value)}
          onKeyUp={props.onKeyUp}
          autoComplete="off"
        />
        <input
          className={`number ${this.displayClassname()}`}
          name="number"
          placeholder={this.inputPlaceholder(
            props.language.addressInput.numberHint,
          )}
          value={state.number}
          onChange={(event) => this.setNumber(event.target.value)}
          onKeyUp={props.onKeyUp}
          autoComplete="off"
        />
        <input
          className={`floor ${this.displayClassname()}`}
          name="floor"
          placeholder={this.inputPlaceholder(
            props.language.addressInput.floorHint,
          )}
          value={state.floor}
          onChange={(event) => this.setFloor(event.target.value)}
          onKeyUp={props.onKeyUp}
          autoComplete="off"
        />
        <input
          className={`room ${this.displayClassname()}`}
          name="room"
          placeholder={this.inputPlaceholder(
            props.language.addressInput.roomHint,
          )}
          value={state.room}
          onChange={(event) => this.setRoom(event.target.value)}
          onKeyUp={props.onKeyUp}
          autoComplete="off"
        />
      </div>
    );
  };

  render() {
    const { props } = this;

    return (
      <div className="address-input">
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <div className="input-container">
          {this.displayInput()}
          <div className="message-section">
            {props.touched[props.inputName] &&
              props.errors[props.inputName] && (
                <div className="error-message">
                  {props.errors[props.inputName]}
                </div>
              )}
            {props.errorMessage && (
              <div className="error-message">{props.errorMessage}</div>
            )}
            {props.description !== '' && (
              <div className="input-description">{props.description}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddressInput.defaultProps = {
  touched: {},
  errors: {},
  errorMessage: '',
  description: '',
  onKeyUp: FormikHelper.handleEnterKeyUp,
  disable: false,
  display: false,
  required: false,
};

AddressInput.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  errorMessage: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onKeyUp: PropTypes.func,
  disable: PropTypes.bool,
  display: PropTypes.bool,
  required: PropTypes.bool,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddressInput),
);
