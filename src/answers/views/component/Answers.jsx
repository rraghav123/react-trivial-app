import React, { useEffect, useState } from "react";
import "../styles/answers.scss";

const Answers = (props) => {
  const [answers, handleAnswers] = useState([]);
  const {
    correctAnswer, incorrectAnswers, handleAnswer, id, selectedAnswer, showAnswers,
  } = props;

  useEffect(() => {
    // mix incorrect answers and correct answers
    const temp = [...incorrectAnswers];
    const genrateRandomIndex = Math.floor(Math.random() * temp.length);
    temp.splice(genrateRandomIndex, 0, correctAnswer);
    handleAnswers(temp);
  }, [""]);

  return (
    <div className="trivial__answer--label">
      {answers.map(answer => (
        <label
          htmlFor={answer}
          onChange={() => handleAnswer(id, answer)}
        >
          <input id={answer} type="radio" checked={answer === selectedAnswer} />
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </label>
      ))}
      {showAnswers && (
      <p
        className="trivial__answer--label__correct-answer"
        dangerouslySetInnerHTML={{ __html: `Correct answer is: ${correctAnswer}` }}
      />
      )}
    </div>
  );
};

export default Answers;
