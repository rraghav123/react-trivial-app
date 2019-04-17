import React, { memo } from "react";
import PropTypes from "prop-types";
import "../styles/question.scss";


const Question = (props) => {
  const { question } = props;
  return (
    <div dangerouslySetInnerHTML={{ __html: question }} className="react-trivial__question" />
  );
};

Question.propTypes = {
  question: PropTypes.string,
};

Question.defaultProps = {
  question: "",
};

export default memo(Question);
