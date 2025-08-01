import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MultipleSelectInput from '../../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';
import SelectItem from '../../../../lib/components/inputs/MultipleSelectInput/SelectItem/SelectItem';

import './AccessControlListItem.scss';

class AccessControlListItem extends React.PureComponent {
  isModuleCheckboxSelected = (content) => {
    const { props } = this;
    const values = content
      .map((item) => item.options.map((option) => option.value))
      .flat();
    return values.every((item) =>
      props.values.rolePermissionGroupIdList.includes(item),
    );
  };

  isTaskCheckboxSelected = (options) => {
    const { props } = this;
    const values = options.map((item) => item.value);
    return values.every((item) =>
      props.values.rolePermissionGroupIdList.includes(item),
    );
  };

  handleModuleCheckboxOnClicked = (content) => {
    const { props } = this;
    const isSelected = this.isModuleCheckboxSelected(content);
    let newValue;
    const values = content
      .map((item) => item.options.map((option) => option.value))
      .flat();
    if (isSelected) {
      newValue = props.values.rolePermissionGroupIdList.filter(
        (item) => !values.includes(item),
      );
    } else {
      newValue = Array.from(
        new Set([...props.values.rolePermissionGroupIdList, ...values]),
      );
    }
    props.setFieldValue('rolePermissionGroupIdList', newValue);
  };

  handleTaskCheckboxOnClicked = (options) => {
    const { props } = this;
    const isSelected = this.isTaskCheckboxSelected(options);
    let newValue;
    const values = options.map((item) => item.value);
    if (isSelected) {
      newValue = props.values.rolePermissionGroupIdList.filter(
        (item) => !values.includes(item),
      );
    } else {
      newValue = Array.from(
        new Set([...props.values.rolePermissionGroupIdList, ...values]),
      );
    }
    props.setFieldValue('rolePermissionGroupIdList', newValue);
  };

  displayTask = () => {
    const { props } = this;
    const { content } = props.configItem;
    return content.map((item) => (
      <div className="task" key={item.title}>
        {!props.display ? (
          <SelectItem
            name=""
            selected={this.isTaskCheckboxSelected(item.options)}
            handleCheckboxOnClick={() =>
              this.handleTaskCheckboxOnClicked(item.options)
            }
          />
        ) : null}
        <div>{item.title}</div>
      </div>
    ));
  };

  displayAccess = () => {
    const { props } = this;
    const { content } = props.configItem;
    return content.map((item) => (
      <div className="access">
        <MultipleSelectInput
          horizontal
          zenMode
          title=""
          inputName="rolePermissionGroupIdList"
          inputValue={props.values.rolePermissionGroupIdList}
          setFieldValue={props.setFieldValue}
          options={item.options}
          display={props.display}
        />
      </div>
    ));
  };

  displayModule = () => {
    const { props } = this;
    const { content } = props.configItem;
    return (
      <>
        {!props.display ? (
          <SelectItem
            name=""
            selected={this.isModuleCheckboxSelected(content)}
            handleCheckboxOnClick={() =>
              this.handleModuleCheckboxOnClicked(content)
            }
          />
        ) : null}
        <div>{props.configItem.title}</div>
      </>
    );
  };

  render() {
    const { props } = this;

    return (
      <div className="access-control-list-item">
        <div className="module">{this.displayModule()}</div>
        <div className="task-container">{this.displayTask()}</div>
        <div className="access-container">{this.displayAccess()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

AccessControlListItem.defaultProps = {
  display: false,
};

AccessControlListItem.propTypes = {
  configItem: PropTypes.objectOf(Object).isRequired,
  values: PropTypes.objectOf(Object).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  display: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccessControlListItem);
