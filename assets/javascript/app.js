$(document).ready(function() {
//	gobal variables
var rightAns;
var wrongAns;
var ansTime;//time to guess the answer
var timer;
var questionsFile;//questions in an array
var questionToAns;//current question
var questionTime=10;//10sec per question
var timeToNext=3;//time between questions
var gameTime;//depends on number of questins
var counter = 0;

var questionsFileArray = [

	{
	 	question: "In the Lion King 2, in the song we are one, what comes next 'If there's so much I must be.....' ",
	 	answers: ["Can you please teach me ?", "Can I still just be me ?", "Must I be everything ?", "How can I just be me ?"],
	 	correctAnswer: 1,
	 	image: "assets/images/1.png"
	},
	{
	 	question: "In the Hunchback of Notre Dame, which other Disney character can be seen about to be roasted ?",
	 	answers: ["Zazo", "Belle", "Pumbaa", "The beast"],
	 	correctAnswer: 2,
	 	image: "assets/images/2.png"
	},
	{
	 	question: "In Toy Story, after Woody says, 'Now Buzz, what could Andy possibly get that's worse than you ?', what does Andy say ?",
	 	answers: ["Wow an action figure!", "Wow a GI Joe!", "Wow a puppy!", "Wow a kitten!"],
	 	correctAnswer: 2,
	 	image: "assets/images/3.png"
	},
	{
	 	question: "In 101 Dalmatians (cartoon), what shape is hidden on nearly all of the dalmatians (except spots obviously)",
	 	answers: ["It's not a shape it's Walt Disney's signature", "A walt Disney", "A mickey mouse head", "A goofy head"],
	 	correctAnswer: 2,
	 	image: "assets/images/4.png"
	},
	{
	 	question: "In Cinderella what is the prince's name ?",
	 	answers: ["Prince Charming", "It's never actually mentioned in the film", "Prince Handsome", "Prince Happy"],
	 	correctAnswer: 1,
	 	image: "assets/images/5.png"
	},
	{
	 	question: "In Sleeping Beauty, in the film's second half what doesn't Sleeping Beauty do ?",
	 	answers: ["Talks", "Sleep", "Walk", "Blink"],
	 	correctAnswer: 0,
	 	image: "assets/images/6.png"
	},
	{
	 	question: "In Pirates of the Caribbean at World's end, who owns the parrot ?",
	 	answers: ["Pintel", "Jack Sparrow", "Davy Jones", "Cotton"],
	 	correctAnswer: 3,
	 	image: "assets/images/7.png"
	},
	{
	 	question: " In the movie Tangled, Flynn Rider is wanted dead or alive according to his wanted poster because he's a...",
	 	answers: ["Robber", "Bandit", "Treasonist", "Thief"],
	 	correctAnswer: 3,
	 	image: "assets/images/8.png"
	},
	{
	 	question: "In Pocahontas, what did Pocahontas see in her dream that made her believe that a change was coming?",
	 	answers: ["A burning blue fire", "A hawk circling her village", "A strange cloud formation", "A spinning arrow"],
	 	correctAnswer: 3,
	 	image: "assets/images/9.png"
	},
	{
	 	question: " In Aladdin, what does Aladdin, and a reluctant Abu, give to the poor children to eat?",
	 	answers: ["Dates", "Apples", "Bread", "Cheese"],
	 	correctAnswer: 2,
	 	image: "assets/images/10.png"
	}];



$("#startGame").click(startGame);

function startGame() {
	//intro
	// $("#intro").html('WELCOME to the Disney Movies Trivia Game; When you start playinng you have only 10 seconds to answer each question .. Have fun and Good Luck! .');
	$("#intro").empty();
	$("#finalAns").hide();
	$("#choices").hide();
	$("choices li").empty();
	$(".totalScore").empty();

	//listners
	$("#choices .ans").off().on("click", guess);
	$("#start").off().on("click", newQuestion);
		 $('button').hide();


	rightAns=0;
	wrongAns=0;
	console.log(questionsFileArray);
	questionsFile = questionsFileArray.slice(0,1);
	ansTime = questionTime;
	gameTime = questionTime * questionsFileArray.length;
	//$("button").empty();
	// $('button').hide();
	newQuestion();
}


function newQuestion(){
	
	if(rightAns + wrongAns >= gameTime){
		gameOver();
	} else {
		//pick a random question that hasn't been asked already
		// var questionNumber = Math.floor(Math.random() * questionsFile.length);
		questionToAns = questionsFileArray[counter].question;
		
		resetTimer();
		$("#finalAns").empty().hide();
		$("#intro").html(questionToAns);

		$("#choices").show().find(".ans").each(function(i){
			$(this).html(questionsFileArray[counter].answers[i]);
			});

		$("body").css("background-image", "url('"+questionToAns.image+"')");
		// start Question Timer
		timer = setInterval(showTimer, 1000);
		counter++;
	}
}

function guess(){
	if ($(this).data("choice") == questionToAns.rightAns){
		rightAns++;
		printResult("Correct!", "correctResult");
	} else {
		wrongAns++;
		var index = questionsFileArray[counter].correctAnswer;
		printResult("The correct answer is " + questionsFileArray[counter-1].answers[index]);
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

function showTimer(){
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
	var index = questionsFileArray[counter].correctAnswer;
	printResult("Time is Up! The correct answer was " + questionsFileArray[counter].answers[index]+"timeIsUp");
}
function resetTimer(){
	clearInterval(timer);
	ansTime = questionTime;
	$("#timer").empty();
}

function gameOver(){
	$("body").css("background-image", 'url("assets/images/BG.png")');
	var score = (rightAns/questionsFileArray.length);

	$("#finalAns").removeClass().html("You got " + score + " questions right and " + wrongAns + " wrong. " + "</div><button id='newGame'>Play Again</button>");
	$("#newGame").on("click", startGame);
}

});
