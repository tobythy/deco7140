
// Interaction 4: Snap Scroll on the quiz part

// When user enter into quiz page, it will not directly start quiz, 
// instead of wait user to scroll down to begin. 
// This gives user the preparation time.

// When they scroll on the waiting part, the page will snap into the quiz.

const targets = document.querySelectorAll('[data-observer]')
const images = document.querySelectorAll('[data-img]')

const options = {
  rootMargin: '0px',
  threshold: 1.0
}

const addClass = (el) => {
	if (!el.classList.contains('is-visible')) {
		el.classList.add('is-visible')
	}
}

const removeClass = (el) => {
	if (el.classList.contains('is-visible')) {
		el.classList.remove('is-visible')
	}
}

const doThings = (entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			addClass(entry.target)
		} else {
			removeClass(entry.target)
		}
  })
}

const observer = new IntersectionObserver(doThings, options)

const observer2 = new IntersectionObserver(doThings, { ...options, threshold: 0.4 })

targets.forEach(target => {
	observer.observe(target)
})

images.forEach(target => {
	observer2.observe(target)
})




// Interaction 5: Quiz

// This part will generate questions, check the answers, and display the final score.

// Quiz controller
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
  
    this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
};


// Questions
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};

// Main Program
function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
}

// Show Progress
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

// Display Final Score
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
}

// Create Questions
var questions = [
    new Question("1. Which of the following could be an IoT device?", ["a lamp", "a couch", "a pen", "all of the above"], "all of the above"), 
    new Question("2. An IoT device can most easily be differentiated from a standard computer based on", ["computational performance", "memory capacity", "interface with the user and the world", "weight/size"], "interface with the user and the world"), 
	new Question("3. The following trend is NOT related to the growth in IoT technology:", ["Increase in computer monitor size over time.", "Increase in computer performance over time.", "Decrease in computer size over time.", "Decrease in computer cost over time."], "Increase in computer monitor size over time."), 
	new Question("4. Which of these security approaches is feasible for most IoT devices?", ["Use of anti-virus software.", "Use of an internal firewall.", "Regular installation of product firmware updates.", "Complete separation of the device from the Internet."], "Regular installation of product firmware updates."), 
	new Question("5. IoT devices gather private information about users. Which statement is most true about the security of that data?", ["Users can ensure security of collected data by encrypting it manually.", "Users must rely on data-collecting agencies to securely store and transmit their data.", "Users can sue data collecting agencies if their data is not held securely.", "Most data gathered by IoT devices is safe because IoT devices are not a target of hackers."], "Users must rely on data-collecting agencies to securely store and transmit their data."), 
    
];

//create quiz
var quiz = new Quiz(questions);

// display quiz
populate();

