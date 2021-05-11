class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("orange");

    //write code to show a heading for showing the result of Quiz
    var resultHeading = createElement('h1');
    resultHeading.html("RESULT OF THE QUIZ");
    resultHeading.position(270, 0);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined) {
      //write code to add a note here
      push();
      fill("blue");
      textSize(17);
      text("NOTE: The names of the contestants, who have answered correctly, are highlighted in green.", 90, 380);
      pop();
      var displayPos = 230;
      //write code to highlight contest who answered correctly
      for(var plr in allContestants) {
        var correctAns = 2;
        if(correctAns === allContestants[plr].answer) {
          fill("Green");
        }
        else {
          fill("Red");
        }
        displayPos += 20;
        textSize(20);
        text(allContestants[plr].name+" : "+allContestants[plr].answer, 180, displayPos);
      }
    }    
  }
}
