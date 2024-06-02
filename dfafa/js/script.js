//This is a function that runs once everything is loaded
window.onload = function () {
  //This is the area for global variables that are 'grabbed' from the HTML file

  //****************Here you will need to create a new instance of the Game class **************/
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  //This is an example of a event listener so when you click the start button, you call the function start game
  startButton.addEventListener("click", function () {
    startGame();
  });

  //inside the start game you will need to call the new game method named .start()
  function startGame() {
    console.log("start game");
  }
};
//Remember to have fun and good luck !!!! :)
