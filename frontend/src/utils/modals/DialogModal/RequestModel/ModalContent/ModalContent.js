import React from 'react';
import { connect } from 'react-redux';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import { setLoading } from '../../../../../store/loading/slice';
import { getUserId } from '../../../../auth/auth';
import '../RequestModal.scss';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import MultipleSelectInput from '../../../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';
import ModalHelper from '../../../../helper/ModalHelper';
import ApiService from '../../../../api/ApiService';
import PropTypes from 'prop-types';
class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      answers: [],
    };
  }
  componentDidMount = () => {
    this.initState();
  };
  initState = () => {
    const { response, id, filteredData } = this.props.data;
    const updateResponse = response.map((item) => {
      if (item.option != null) {
        return {
          ...item,
          option: item.option.split(',').map((opt, index) => ({
            text: opt,
            value: index+1,
          })),
        };
      }
      return item;
    });
    console.log(updateResponse)
    this.setState({ response: updateResponse });
  };

  handleAnswerChange = (index, value) => {
    this.setState((prevState) => {
      const answers = [...prevState.answers];
      answers[index] = value;
      return { answers };
    });
  };

  handleMultiSelectChange = (index, value, isChecked) => {
    this.setState((prevState) => {
      const answers = [...prevState.answers];
      const currentAnswers = answers[index] || [];
      if (isChecked) {
        answers[index] = [...currentAnswers, value];
      } else {
        answers[index] = currentAnswers.filter((v) => v !== value);
      }
      return { answers };
    });
  };

  displayRequestList = () => {
    const { filteredData } = this.props.data;
    const { response } = this.state;
  
    // 如果 filteredData 不为 null，初始化 answers
    if (filteredData) {
      response.forEach((item, index) => {
        if (filteredData[index] && !this.state.answers[index]) {
          const answerValue = filteredData[index].answer;
          if (item.question_type === 1) {
            // 文字类型直接赋值
            this.state.answers[index] = answerValue || '';
          } else if (item.question_type === 2) {
            // 单选类型，匹配选项的 value
            const matchedOption = item.option.find(
              (option) => option.text === answerValue
            );
            this.state.answers[index] = matchedOption
              ? matchedOption.value
              : null;
          } else if (item.question_type === 3) {
            // 多选类型，匹配选项的 value
            const selectedValues = answerValue
              ?.split(',') // 假设多选答案以逗号分隔
              .map((answerText) =>
                item.option.find((option) => option.text === answerText)?.value
              )
              .filter(Boolean); // 过滤掉未匹配的值
            this.state.answers[index] = selectedValues || [];
          }
        }
      });
    }
  
    if (response.length !== 0) {
      return (
        <div>
          {response.map((item, index) => (
            <div key={index}>
              {item.question_type === 1 && (
                <div>
                  <div>
                    {index + 1 + '.'}
                    {item.question}
                    {item.is_required && (
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    )}
                    <div>
                      {item.is_required && (
                        <span style={{ color: 'red', fontSize: '14px' }}>
                          *此為必填項目
                        </span>
                      )}
                    </div>
                  </div>
                  <textarea
                    className="large-textarea"
                    placeholder="請輸入文字"
                    value={this.state.answers[index] || ''}
                    onChange={(e) =>
                      this.handleAnswerChange(index, e.target.value)
                    }
                  />
                </div>
              )}
              {item.question_type === 2 && (
                <div>
                  <div>
                    {index + 1 + '.'}
                    {item.question}(單選)
                    {item.is_required && (
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    )}
                    <div>
                      {item.is_required && (
                        <span style={{ color: 'red', fontSize: '14px' }}>
                          *此為必填項目
                        </span>
                      )}
                    </div>
                  </div>
                  {item.option.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type="radio"
                        name={`question_${index}`}
                        value={option.value}
                        checked={this.state.answers[index] === option.value}
                        onChange={() =>
                          this.handleAnswerChange(index, option.value)
                        }
                      />
                      {option.text}
                    </label>
                  ))}
                </div>
              )}
              {item.question_type === 3 && (
                <div>
                  <div>
                    {index + 1 + '.'}
                    {item.question}(可複選)
                    {item.is_required && (
                      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                    )}
                    <div>
                      {item.is_required && (
                        <span style={{ color: 'red', fontSize: '14px' }}>
                          *此為必填項目
                        </span>
                      )}
                    </div>
                  </div>
                  {item.option.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type="checkbox"
                        name={`question_${index}`}
                        value={option.value}
                        checked={
                          this.state.answers[index]?.includes(option.value) ||
                          false
                        }
                        onChange={(e) =>
                          this.handleMultiSelectChange(
                            index,
                            option.value,
                            e.target.checked,
                          )
                        }
                      />
                      {option.text}
                    </label>
                  ))}
                </div>
              )}
              {index < response.length - 1 && (
                <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />
              )}
            </div>
          ))}
        </div>
      );
    } else {
      return <div>無回饋表單</div>;
    }
  };
  

  uploadRequest = () => {
    const { answers, response } = this.state;
    let resCount = 0;
    const processedAnswers = Object.keys(response).map((key, index) => {
      const value = answers[key];
      const id = response[resCount]?.id;
      let formattedValue;

      if (Array.isArray(value)) {
        if (value.length === 0) {
          formattedValue = undefined;
        } else {
          formattedValue = value
            .sort((a, b) => a - b)
            .map((v) => {
              const option = response[index]?.option?.find(
                (item) => item.value === v,
              );
              return option ? option.text : v;
            })
            .join(',');
        }
      } else if (value === undefined || value === null || value === '') {
        formattedValue = undefined;
      } else {
        const option = response[index]?.option?.find(
          (item) => item.value === value,
        );
        formattedValue = option ? option.text : value;
      }

      resCount++;
      return {
        business_management_test_id: this.props.data.id,
        request_id: id,
        answer: formattedValue,
      };
    });
    let count = 0;
    for (let i = 0; i < response.length; i++) {
      if (
        response[i].is_required === true &&
        processedAnswers[i].answer === undefined
      ) {
        count++;
        break;
      }
    }
    if (count > 0) {
      alert('仍有必填項目未填');
    } else {
      this.props.setLoading(true);
      ApiService.businessManagement
        .createResponseAnswer(processedAnswers)
        .then(() => {
          this.props.setLoading(false);
          ModalHelper.openUploadSuccessModal();
        });
    }
  };

  render() {
    const { props, state } = this;
    const { response } = this.state;
    // console.log(state.reasonCount);
    return (
      <div className="request-modal">
        <SectionTitle title={'回饋表單'} />
        <div className="contact-item-container">
          {this.displayRequestList()}
        </div>
        <div className="button-group">
          <ButtonDiv className="confirm-button" onClick={props.onClose}>
            {'關閉視窗'}
          </ButtonDiv>
          {response.length !== 0 && (
            <ButtonDiv className="confirm-button" onClick={this.uploadRequest}>
              {'送出資料'}
            </ButtonDiv>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});
ModalContent.propTypes = {
  setLoading: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
