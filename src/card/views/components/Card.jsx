import React, { memo } from "react";
import Question from "../../../questions/views/components/Question";
import Answers from "../../../answers/views/component/Answers";
import "../styles/card.scss";

const Card = (props) => {
  const {
    question, correct_answer, incorrect_answers, id,
  } = props.activeQuestion;
  const { handleAnswer, selectedAnswer } = props;
  return (
    <div className="react-trivial__card-wrapper">
      <div>
        <Question
          question={question}
        />
        <Answers
          key={id}
          correctAnswer={correct_answer}
          incorrectAnswers={incorrect_answers}
          handleAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          id={id}
          showAnswers={props.showAnswers}
        />
      </div>
    </div>
  );
};


export default memo(Card);
