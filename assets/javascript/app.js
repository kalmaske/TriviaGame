//	gobal variables
var rightAns;
var wrongAns;
var ansTime;//time to guess the answer
var timer;
var questionsFile;//a file with all the questions in an array
var questionToAns;//current question
var questionTime=10;//10sec per question
var timeToNext=3;//time between questions
var gameTime;//depends on number of questins


function startGame(){
	//intro
	$("#intro").html('WELCOME to the Disney Movies Trivia Game; When you start playinng you have only 10 seconds to answer each question .. Have fun and Good Luck! .');
	$("#finalAns").hide();
	$("#choices").hide();
	$("choices li").empty();
	$(".totalScore").empty();
	//listners
	$("#choices .ans").off().on("click", guess);
	$("#startNow").off().on("click", newQuestion);

	rightAns=0;
	wrongAns=0;

	questionsFile = questionsFileArray.slice();
	ansTime = questionTime;
	gameTime = quest.length;

}

function newQuestion(){
	if(rightAns + wrongAns >= gameTime){
		gameOver();
	} else {
		//pick a random question that hasn't been asked already
		var questionNumber = Math.floor(Math.random() * questionsFile.length);
		questionToAns = questionsFile[questionNumber];
		questionsFile.splice(questionNumber, 1);
		resetTimer();
		$("#finalAns").empty().hide();
		$("##intro").html(questionToAns.question);

		$("#choices").show().find(".ans").each(function(i){
			$(this).html(questionToAns.answers[i]);
			});

		$("body").css("background-image", "url('"+questionToAns.image+"')");
		// start Question Timer
		timer = setInterval(showTimer, 1000);
	}
}

function guess(){
	if ($(this).data("choice") == questionToAns.rightAns){
		rightAns++;
		printResult("Correct!", "correctResult");
	} else {
		wrongAns++;
		showResult("Wrong. The correct answer was " + questionToAns.answers[questionToAns.rightAns], "wrongResult");
	}
}

function printResult(msg, addThisClass){
	resetTimer();
	$("#finalAns")
		.html(msg)
		.show()
		.removeClass()
		.addClass(addThisClass);
	setTimeout(newQuestion, timeToNext*1000);
	$("#score").html("correct: " + rightAns + " <br> incorrect: " + wrongAns);

}

function ShowTimer(){
	if (ansTime >= 0){
		$("#timer").html(ansTime + " seconds left");
		ansTime--;
	} else {
		timeIsUp();
	}
}

function timeIsUp(){
	wrongAns++;
	resetTimer();
	showResult("Time is Up! The correct answer was " + questionToAns.answers[questionToAns.rightAns], "timeIsUp");
}
function resetTimer(){
	clearInterval(timer);
	ansTime = questionTime;
	$("#timer").empty();
}

function gameOver(){
	$("body").css("background-image", 'url("assets/images/BG.png")');
	var score = (rightAns/gameTime);

	$("#finalAns").removeClass().html("You got " + rightAns + " questions right and " + numberWrong + " wrong. " + praise + "</div><button id='newGame'>Play Again</button>");
	$("#newGame").on("click", startGame);
}

$(document).ready(startGame);