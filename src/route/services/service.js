const raiseStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  const error = new Error(response.status);
  throw error;
};

const getGameData = () => fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
  .then(raiseStatus);

export default getGameData;
