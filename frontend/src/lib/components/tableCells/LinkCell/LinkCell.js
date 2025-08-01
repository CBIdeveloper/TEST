import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import './LinkCell.scss';

class LinkCell extends React.PureComponent {
  handleLinkOnClicked = () => {
    const { props } = this;
    window.open(props.link, '_blank');
  };

  render() {
    const { props } = this;

    return (
      <ButtonDiv className="link-cell" onClick={this.handleLinkOnClicked}>
        {props.title}
      </ButtonDiv>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

LinkCell.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkCell);
