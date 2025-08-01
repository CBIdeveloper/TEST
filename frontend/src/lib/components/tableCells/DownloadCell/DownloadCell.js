import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import { setLoading } from '../../../../store/loading/slice';

import './DownloadCell.scss';

class DownloadCell extends React.PureComponent {
  constructor(props) {
    super(props);
    const { downloadFunction, isLink } = props.cell.column.getProps();
    this.downloadFunction = downloadFunction;
    if (isLink === true || isLink === false) {
      this.isLink = isLink;
    } else {
      this.isLink = true;
    }
  }

  handleDownloadOnClicked = () => {
    const { props } = this;
    props.setLoading(true);
    this.downloadFunction(props.cell)
      .then(() => {
        props.setLoading(false);
      })
      .catch(() => {
        props.setLoading(false);
      });
  };

  render() {
    const { props } = this;

    return this.isLink ? (
      <ButtonDiv
        className="download-cell"
        onClick={this.handleDownloadOnClicked}
      >
        {props.cell.value}
      </ButtonDiv>
    ) : (
      <div>{props.cell.value}</div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

DownloadCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadCell);
