

var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  


  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);


//===========global variables=======================================================
var correctAnswer;
var incorrectAnswer;
var currentQ;
var attemptedQ;
var unanswerQ;
var time;
var sec;
var userChoice;
var graphicAnswer = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"];
var txtMsg = {
    correct: "Ding, ding! Correct answer choice!",
    wrong: "Sorry! Incorrect answer!",
    timeBreak:"AHH! You ran out of time!",
    lastQ: "Good job answering all the questions...time to tally up your total score!!"
}


//===========questions/answers array index=============================================================================
var triviaQ = [{
    question: "What year did Volkswagen introduce the Golf GTI model?",
    answerChoices: ["1976", "1965", "1965", "1979"],
    answer: 0
},{
    question: "The original Legoland opened in which country in 1968?",
    answerChoices: ["USA", "Denmark","Sweden", "Portugal"],
    answer: 1
},{
    question:"Who did sports fans know as 'the Wizard of Westwood'?",
    answerChoices:["John Wooden", "Bob Knight", "Bill Walton", "Kareem Abdul Jabbar"],
    answer: 0
},{
    question:"Triple Sec is a clear liqueur of what flavor?",
    answerChoices:["Cherries", "Apples", "Oranges", "Watermelon"],
    answer: 2
},{
    question:"What is traditionally the main fruit ingredient in Black Forest cake?",
    answerChoices:["Oranges", "Black Berries", "Cherries", "Apples"],
    answer: 2
},{
    question: "What type of foodstuff is traditionally eaten on Shrove Tuesday?",
    answerChoices:["Corned Beef", "Sausage Links", "French Toast", "Pancakes"],
    answer: 3
},{
    question:"What do you get when you mix whiskey, sweet vermouth and angostura bitters?",
    answerChoices:["Bloody Mary", "Manhatten", "Gin & Tonic", "Raging Bull"],
    answer: 1
},{
    question:"What was the first sport to be televised in the US?",
    answerChoices:["Baseball", "Football", "Basketball", "Soccer"],
    answer: 0
},{
    question:"What car company introduced the Pinto in the 1970s?",
    answerChoices:["Volvo", "Volkswagon", "Chevrolet", "Ford Motor Company"],
    answer: 3
},{
    question: "Bill Gates dropped out of which of educational institution?",
    answerChoices:["Stanford", "Princeton", "Harvard", "Yale"],
    answer:  2
},

]

//===========Start/restart button rendering======================================================================================
        //Start button rendering!
$('#pressStart').on('click', function(){
    //the start button will hide on the browser
    $(this).hide();
    //after the start button is hidden, then the function 'refreshGame' will soon run to start the game up
    refreshGame();
});

        // Restart button rendering!
$('#pressRestart').on('click', function(){
    //the restart button is will be hidden right when this function runs so the user doesn't press on it repeatedly
    $(this).hide();
    //the function to start the game is initalized
    refreshGame();
});



//============clear Trivia Game questions/answers/messages renderings===========================================================
        // clears the Trivia Game by initializing all global variables on the 'Scoreboard Tally Area'
function refreshGame() {
    $("#lastMsg").empty();
    $("#correctAnswer").empty();
    $("#incorrectAnswers").empty();
    $("#unanswerQ").empty();
        currentQ = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswerQ = 0;
    forumulateQ();
}
        //clears the dynamic class ID elements withing the 'Trivia Answers/Results' portion of the html page
function forumulateQ() {
    //empties any values of from the alert messages to the user
        $("#txtMsg").empty();
    //empties any value of the correct answers count
        $("#rightAnswer").empty();
    //empties all images 
        $("#imgAnswer").empty();
        attemptedQ = true;

//==========creating Questions & Answers rendering===============================================================================

$("#currentQ").html("Question #" + (currentQ + 1)+"/"+triviaQ.length);
$('.question').html("<h2>" + triviaQ[currentQ].question + "</h2>");
        //created a for loops withing the parameters where the user choice variable 'j' is set 
        //at the starting index of the array [0]...with the length of the 4 available answers choices
        //and the count it goes through the array index increment of 1 by going through each index element
    for(var j = 0; j < 4; j++) {
        //created a local variable 'options' to help create the new dynmical variables 'data-index' & 'playerChoice'
        //on lines 106 & 109 respectively
        var options = $('<div>');
        // created new dynamic div class variable'data-index' to temporarily hold the user choice answer
                options.attr({'data-index': j});
        // created new dynamic div class 'playerChoice' has been creating within this loop
                options.addClass('playerChoice');
                options.text(triviaQ[currentQ].answerChoices[j]);
        //appends the userchoice back to the the html ID element 'answerChoices' so the answer is visible on the browser
        $('.answerChoices').append(options);
    }

        manipulateTime();
        $(".playerChoice").on("click", function(){
            userChoice = $(this).data('index');
        clearInterval(time);
        clearAnswerArea();
    });

}

//=============time rendering========================================================================================
    //'manipulateTime' is a function that runs for the timer countdown when the quesiton for the user for each trivia question
function manipulateTime () {
    //intially set the timer for the player/user to answer all Trivia Questions at 10 seconds
                sec = 15;
    //append the user with an alert message of the remaining time by connecting with the dynamic variable 'remainingTime' within index.html
        $("#remainingTime").html("<h1> Time Left: " + sec + "</h1>");
                attemptedQ = true;
    //sets global variable 'time' to excecute the 'countDown" function within the set time interval of 1 second
                time = setInterval(countdownTimer, 1000);
}


    //the countdownTimer function is ran when the player/user does NOT answer within the 10 second limit
function countdownTimer() {
    //decreement the seconds count
            sec--;
        $("#remainingTime").html("<h1> Time Left: " + sec + "</h1>");
    //this important if loop function runs within the parements when the seconds left for the player/user hits 0
        if(sec < 1) {
            //the first thing this function will do is clear the time
                clearInterval(time);
            //then return a boolean value of false for their current attempt
                attemptedQ = false;
            //finally the function will clear the trivia questions portion area for the next upcoming question for the player/user
                clearAnswerArea();
        }
}


    //clearAnswerArea is important in rendering everytime after the user makes a click answer, this function will empty the gameboard for the next question
function clearAnswerArea() {
    //empties the current question variable ID within index.html
        $("#currentQ").empty();
    //empties the dynamic class ID 'playerChoice'
        $(".playerChoice").empty();
    //empties the current question for the user in the array index
        $(".question").empty();
//=========Correct/Incorrect/Unanswered questions rendering======================================================
        //created the variables to output the right answer for the specific question  
var rightMsg = triviaQ[currentQ].answerChoices[triviaQ[currentQ].answer];
var rightArrList = triviaQ[currentQ].answer;
        $("#imgAnswer").html("<img src = 'assets/images/"+ graphicAnswer[currentQ] +".gif' width = '400px'>");

        //created an if else loop with the parameters if player/user's choice is equal to the current right answer AND there are more questions left, 
    if((userChoice == rightArrList) && (attemptedQ == true)) {
        //then, increment the number of correctAnswers
            correctAnswer++;
        //directs the 'correct' message to the user within the dynamic class ID "txtMsg" within index.html file
        $('#txtMsg').html(txtMsg.correct);
    }
        //Else if, given the conditions that the player/user's choice is not a choice of the 4 given choice
        //and that the player/user's choice is a valid option within the array index choices,
        else if ((userChoice != rightArrList) && (attemptedQ == true)) {
        //then, the first thing it will run is to: increment the count number of the 'incorrectAnswer' global variable by a count of +1
            incorrectAnswer++;
        //used the .html DOM method by pointing the location of the 'message of the incorrect current answer' to the dynamic div class ID 'txtMsg' 
        $('#txtMsg').html(txtMsg.wrong);
        //used the .html DOM method by ponting a message, that contained the variable of the right answer to the current quesiton, to the unique ID 'rightAnswer' that's located within index.html file
        $('#rightAnswer').html("Incorrect! The answer is: " + rightMsg);
        }
        //Finally, if it doesn't fit the above conditions, else label the result as an unanswered question that was not answered on time
        else {
        //then, increment the variable unanswerQ count by +1
            unanswerQ++;
        $("#txtMsg").html(txtMsg.timeBreak);
        //and output the message to the player/user the result of being unanswered and the correct answer of the current question
        $("#rightAnswer").html("Time's up! The answer is: " + rightMsg);
            attemptedQ = true;
        }
//=========trivia scoreTallyUp portion area rendering====================================================================================
    //created and if else loop function that uses the setTimeout method in creating the time interval setting placed after the correct answer has been been
    // outputed on the browser to when it slides to the next question
    if(currentQ == (triviaQ.length-1)) {
        setTimeout(scoreTallyUp, 1000 * 8)
    }
        else {
            currentQ++;
            setTimeout(forumulateQ, 1000 * 8);
        }
}

    //scoreTallyUp runs at the end of the trivia once all 10 questions have been ran, this function will then run
function scoreTallyUp () {
    //line 217-221 empties the variables that were set throughout the game in the Trivia Answers Results Area to its initialized settings
    $("#remainingTime").empty();
    $("#txtMsg").empty();
    $("#rightAnswer").empty();
    $("#imgAnswer").empty();
    //lines 223-226 points the variables (goodbyeMsg + totals of player's correct/incorrect/unanswered questions) needed to give the player/user
    //the scores all tallied up in the scoreTallyUp portion Area within the html browser
    $("#lastMsg").html(txtMsg.lastQ);
    $("#correctAnswer").html("Final Total of Correct Answers: " + correctAnswer + "!");
    $("#incorrectAnswers").html("Final Total of Incorrect Answers: " + incorrectAnswer + "!");
    $("#unanswerQ").html("Final Total of Unanswered Questions: " + unanswerQ + "!");


    $("#pressRestart").addClass("reset");
    $("#pressRestart").show();
    $("#pressRestart").html("Restart Game");
    $("#pressRestart").on("click", function(){
    //the restart button is will be hidden right when this function runs so the user doesn't press on it repeatedly
    $(this).hide();

    })
    

}

