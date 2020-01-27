let questionIndex = 0;
let minutes = 0;
let seconds = 0;
let time = 50;
let clock, name, currentScore;
let score = 0;


$(".btn-success").on("click", function () {
    $(".btn-success").hide();
    $(".lead").hide();

    runTimer($(".timer"));
    askQuestion();
});

function runTimer(display) {
    let timer = time
    
    clock = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        score = seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            display.text("Times up!");
            clearInterval(clock);
        }

    }, 1000);
    
    if (timer === 0) {
        display.text("Times up!");
        clearInterval(clock);
        clear();
        quizOver();
    }
};


function askQuestion() {  
  if(questionIndex < questionList.length) {  
        $(".questions").html(`
            <h2>${questionList[questionIndex].question}</h2>
        `);

        for (let answerKey in questionList[questionIndex].answers) {
            $(".answers").append(`
            <button type="button" class="ansBtn btn btn-primary">${questionList[questionIndex].answers[answerKey]}</button>
            `);
        }

    }
}

$(document).on("click", ".ansBtn", function () {
    let userChoice = $(this).text();
    let correct = questionList[questionIndex].correct;

    if (time !== 0)
        if (userChoice === correct) {
            questionIndex++;
            clear();
            askQuestion();

            if(questionIndex === questionList.length) {
                quizOver();
            }
        }

        else {
            $(".feedback").html(`<h4>Wrong answer! -10 seconds! Try Again!</h4>`);
            time -= 10;
            clearInterval(clock);
            runTimer($(".timer"));
        }
    
    else {
        clear();
        quizOver();
    }
})

function clear() {
    $(".questions").empty();
    $(".answers").empty();
    $(".feedback").empty();
}

function quizOver() {
    $(".timer").hide();
    addForm();
}

function addForm() {
    let $label = $("<label>");
    let $input = $("<input>");
    let $button = $("<button>");
    let $formGroup = $("<div>")
    
    $label.text("Enter Initials");
    $label.attr({
        class: "label"
    })
    $input.attr({
        type: "text",
        class: "form-control",
        id: "initials",
        value: "",
        placeholder: "Your Initials"
    })
    $button.attr({
        type: "button",
        class: "submit-btn btn btn-success mb-2"
    })
    $button.text("Submit")
    $formGroup.addClass("form-group");
    
    
    $formGroup.append($label, $input);
    $(".initials").append($formGroup, $button);
}

$(document).on("click", ".submit-btn", function() {
    $(".label").hide();
    $(".submit-btn").hide();
    $(".form-control").hide();

    setScore();
});

function setScore() {
    let initials = $("#initials").val();
    localStorage.setItem("name", JSON.stringify(initials).trim());
    localStorage.setItem("currentScore", JSON.stringify(score));
    name = JSON.parse(localStorage.getItem("name"));
    currentScore = JSON.parse(localStorage.getItem("currentScore"));
    
    displayScore();

}
    
function displayScore() {
    $(".scores").html(`<h4>High Scores:</h4>`);
    
    $(".scores").html(`<h6> Name: ${name} Score: ${currentScore} </h6>`);    
}



const questionList = [
    {
        question: "What does HTML stand for?",
        answers: {
            a: "Hyper Text Markup Language",
            b: "Hyperlinks and Text Markup Language",
            c: "Hyper Text Markdown Listener",
        },
        correct: "Hyper Text Markup Language"
    },
    {
        question: "What does DOM stand for?",
        answers: {
            a: "Definitive Object Modeling",
            b: "Do-Over Mode",
            c: "Document Object Model",
        },
        correct: "Document Object Model"
    },
    {
        question: "Which of the following are NOT examples of a boolean?",
        answers: {
            a: "True",
            b: "John",
            c: "0",
        },
        correct: "John"
    },
    {
        question: "What is the HTML tag inside which one can write the JavaScript code?",
        answers: {
            a: "javascript",
            b: "js",
            c: "script",
        },
        correct: "script"
    },
    {
        question: "Which of the following is NOT a type of JavaScript pop up box?",
        answers: {
            a: "Check",
            b: "Prompt",
            c: "Alert",
        },
        correct: "Check"
    },

];