import React, { memo } from "react";
import PropTypes from "prop-types";
import "../styles/header.scss";

const Header = (props) => {
  const {
    category, difficulty, activeQuestion, totalQuestions,
  } = props;
  return (
    <div className="react-trivial__header-wrapper">
      <span>{`Category: ${category}`}</span>
      <div className="react-trivial__header-progress">
        <p>Progress</p>
        <p>{`${activeQuestion + 1}/${totalQuestions + 1}`}</p>
      </div>
      <span className="react-trivial__header-difficulty">{`Difficulty: ${difficulty}`}</span>
    </div>
  );
};

Header.propTypes = {
  category: PropTypes.string,
  difficulty: PropTypes.string,
  activeQuestion: PropTypes.number,
  totalQuestions: PropTypes.number,
};

Header.defaultProps = {
  category: "",
  difficulty: "",
  activeQuestion: "",
  totalQuestions: "",
};

export default memo(Header);
