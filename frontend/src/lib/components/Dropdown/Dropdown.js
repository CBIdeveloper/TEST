import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

import ButtonDiv from '../ButtonDiv/ButtonDiv';

import './Dropdown.scss';

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isDropdownOpen: false, dropdownMenuRef: null };
  }

  onDisplayDropdownMenu = (node) => {
    this.setState({ dropdownMenuRef: node });
  };

  displayDropdown = () => {
    const { dropdownContentList, currentIndex } = this.props;
    return (
      <>
        <ButtonDiv className="dropdown-button" onClick={this.toggleDropdown}>
          <div className="content">{dropdownContentList[currentIndex]}</div>
          {this.displayArrow()}
        </ButtonDiv>
        {this.displayDropdownMenu()}
      </>
    );
  };

  activeStyle = (index) => {
    const { currentIndex } = this.props;
    return currentIndex === index ? 'active' : '';
  };

  dropdownMenuClassname = () => {
    const { props, state } = this;
    if (state.dropdownMenuRef != null) {
      const menuBottom = state.dropdownMenuRef.getBoundingClientRect().bottom;
      return menuBottom > props.windowSize.height - 60
        ? 'dropdown-menu bottom'
        : 'dropdown-menu';
    }
    return 'dropdown-menu';
  };

  displayArrow = () => {
    const { isDropdownOpen } = this.state;
    return isDropdownOpen ? (
      <MdArrowDropUp size={25} className="icon" />
    ) : (
      <MdArrowDropDown size={25} className="icon" />
    );
  };

  displayDropdownMenu = () => {
    const { isDropdownOpen } = this.state;
    return isDropdownOpen ? (
      <>
        <div
          className={this.dropdownMenuClassname()}
          ref={this.onDisplayDropdownMenu}
        >
          {this.listDropdownMenu()}
        </div>
        <ButtonDiv className="outside-area" onClick={this.toggleDropdown} />
      </>
    ) : (
      ''
    );
  };

  listDropdownMenu = () => {
    const { props } = this;
    return props.dropdownContentList.map((item, index) => (
      <ButtonDiv
        className={`dropdown-menu-item ${this.activeStyle(index)}`}
        key={item}
        onClick={() => this.selectDropdownItem(index)}
      >
        {item}
      </ButtonDiv>
    ));
  };

  toggleDropdown = () => {
    const { isDropdownOpen } = this.state;
    this.setState({ isDropdownOpen: !isDropdownOpen });
  };

  selectDropdownItem = (index) => {
    const { props } = this;
    props.onClick(index);
    this.toggleDropdown();
  };

  render() {
    const { props } = this;

    return <div className="dropdown">{this.displayDropdown()}</div>;
  }
}

const mapStateToProps = (state) => ({
  windowSize: state.window.windowSize,
});

const mapDispatchToProps = (dispatch) => ({});

Dropdown.propTypes = {
  windowSize: PropTypes.objectOf(Object).isRequired,
  dropdownContentList: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
