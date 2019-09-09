//-------- global variables--------------
var correctAnswer;
var incorrectAnswer;
var currentQ;
var attemptedQ;
var remainingQ;
var time;
var sec;
var userChoice;
var txtMsg = {
    correct: "Ding, ding! Correct answer choice!",
    wrong: "Whoops--incorrect answer!",
    noTime:"AH! Out of time!",
    lastQ: "You answered all the questions--time to tally up the scores"
}

// ----------questions/answers array index---------
var triviaQ = [{
    question: "What year did Volkswagen introduce the Golf GTI model?",
    answerChoices: ["1976", "1965", ],
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


        //Start button rendering
$("#pressStart").on("click", function(){
    $(this).hide();
    refreshGame();
});

        // Restart button rendering
$("#pressRestart").on("click", function(){
    $(this).hide();
    resfreshGame();
});
        // clears the Trivia Game by initializing all global variables on the 'Scoreboard Tally Area'
function resfreshGame() {
    $("#lastMsg").empty();
    $("#correctAnswer").empty();
    $("#incorrectAnswer").empty();
    $("#remainingQ").empty();
    currentQ = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    remainingQ = 0;
    forumulateQ();
}

function forumulateQ() {
    $("#txtMsg").empty();
    $("#rightAnswer").empty();
    $("#imgAnswer").empty();
    attemptedQ = true;
}



//-----creating Questions & Answers rendering-----

$("#currentQ").html("Question #" + (currentQ + 1) + "/" + triviaQ.length);
$(".question").html("<h2>" + triviaQ[currentQ].question + "</h2>");
    for(var j = 0; j < 4; j++) {
        //created a local variable 'options' 
        var options = ("<div>");
        options.text(triviaQ[currentQ].answerChoices[j]);
        // created new dynamic variable'array-index' to temporarily hold the user choice answer
        options.attr({"array-index": j});
        // created new dynamic variable 'playerChoice' to 
        options.addClass("playerChoice");
        //appends the userchoice back to the the html ID element 'answerChoices' so the answer is visible on the browser
        $(".answerChoices").append(options);
    }


//--------timer countdown rendering-------

function manipulateTime () {
    //intially set the timer for the player/user to answer all Trivia Questions at 10 seconds
    sec = 10;
    //append the user with an alert message of the remaining time by connecting with the dynamic variable 'remainingTime' within index.html
    $("#remainingTime").html("<h3> Time Left: " + sec + "</h3>");
    attemptedQ = true;
    //sets global variable 'time' to excecute the 'countDown" function within the set time interval of 1 second
    time = setInterval(countDown, 1000);
}

function countDown() {
    //decreement the seconds
    sec--;
    $("#remainingTime").html("<h3>")
}

//------trivia scoreboard rendering-----








