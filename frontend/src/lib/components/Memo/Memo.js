import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Memo.scss';

class Memo extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className={`memo ${props.color}`}>
        <div className="sticky">
          <svg width="0" height="0">
            <defs>
              <clipPath
                className="path"
                id="stickyClip"
                clipPathUnits="objectBoundingBox"
              >
                <path
                  d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                  strokeLinejoin="round"
                  strokeLinecap="square"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="sticky-content">{props.content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

Memo.defaultProps = {
  color: 'blue',
};

Memo.propTypes = {
  color: PropTypes.string,
  content: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Memo);
