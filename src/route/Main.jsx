import React, { PureComponent } from "react";
import getGameData from "./services/service";
import Card from "../card/views/components/Card";
import Header from "../header/views/components/Header";
import "./main.scss";

class Main extends PureComponent {
  state = {
    isLoading: true,
    data: {},
    selectedAnswers: {},
    currentIndex: 0,
    questionsLength: 0,
    showResults: false,
    showAnswers: false,
  };

  componentDidMount() {
    getGameData()
      .then((data) => {
        const results = data.results.map((questionObj, index) => ({
          ...questionObj,
          id: index,
        }));
        this.setState({
          data: results,
          isLoading: false,
          questionsLength: results.length - 1,
        });
      });
  }

  handleAnswer = (id, answer) => {
    const { selectedAnswers } = this.state;
    this.setState({
      selectedAnswers: {
        ...selectedAnswers,
        [id]: answer,
      },
    });
  };

  handleSubmit = () => {
    this.setState({ showResults: true });
  };

  handleNext = () => {
    if (this.statequestionsLength !== this.state.currentIndex) {
      this.setState(prevState => ({ currentIndex: prevState.currentIndex + 1 }));
    }
  };

  handlePrevious = () => {
    if (this.state.currentIndex !== 0) {
      this.setState(prevState => ({ currentIndex: prevState.currentIndex - 1 }));
    }
  };

  handleShowResults = () => {
    this.setState({ showAnswers: true, showResults: false, currentIndex: 0 });
  };

  getView = () => {
    const {
      data, currentIndex, questionsLength, showResults, showAnswers,
    } = this.state;
    if (showResults) {
      const res = this.state.data
        .filter(questionObj => questionObj
          .correct_answer === this.state.selectedAnswers[questionObj.id]);
      return (
        <div className="react-trivial__wrapper react-trivial__wrapper--results">
          <div className="react-trivial__results">
            <p>{`You Scored: ${res.length} out of ${questionsLength}`}</p>
            <button onClick={this.handleShowResults} type="button" className="react-trivial__button">Show Answers</button>
          </div>
        </div>
      );
    }
    return (
      <div className="react-trivial__wrapper">
        <Card
          activeQuestion={data[currentIndex]}
          handleAnswer={this.handleAnswer}
          selectedAnswer={this.state.selectedAnswers[data[currentIndex].id]}
          showAnswers={showAnswers}
        />
        <div className="react-trivial__button-container">
          {currentIndex !== 0 && <button type="button" className="react-trivial__button" onClick={this.handlePrevious}>Previous</button>}
          {questionsLength !== currentIndex && <button className="react-trivial__button" type="button" onClick={this.handleNext}>Next</button>}
          {!showAnswers && questionsLength === currentIndex && <button className="react-trivial__button" type="button" onClick={this.handleSubmit}>Submit</button>}
        </div>
      </div>
    );
  };

  render() {
    const {
      data, isLoading, currentIndex, questionsLength,
    } = this.state;
    if (isLoading) {
      return (<div>Loading...</div>);
    }
    return (
      <div className="react-trivial__body">
        <Header
          category={data[currentIndex].category}
          type={data[currentIndex].type}
          difficulty={data[currentIndex].difficulty}
          activeQuestion={currentIndex}
          totalQuestions={questionsLength}
        />
        <h1 className="react-trivial__topic">{data[currentIndex].category}</h1>
        <div>
          {this.getView()}
        </div>
      </div>
    );
  }
}

export default Main;
