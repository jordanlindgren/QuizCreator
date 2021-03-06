const gameContainer = document.getElementById("game")
const playBtn = document.getElementById("play")
const question = document.querySelector("#question");
const btn1 = document.getElementById("button1")
const btn2 = document.getElementById("button2")
const btn3 = document.getElementById("button3")
const btn4 = document.getElementById("button4")
const enterHS = document.getElementById("enterHS")
const scoreEl = document.getElementById("score")
const timerEl = document.getElementById("timer")

const saveuserEl = document.getElementById("saveuser")

const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progress-text");
const scoreText = document.querySelector("#score");
//const question = document.querySelector("#question");
gameContainer.style.display = "none"
enterHS.style.display = "none"
let currentQuestion = {};
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
var timerCount = 100;
var timerObj;
btn1.addEventListener("click", clickStart)
btn2.addEventListener("click", clickStart)
btn3.addEventListener("click", clickStart)
btn4.addEventListener("click", clickStart)
saveuserEl.addEventListener("click", saveuser)

let questions = [
    {

        question: "What color is the ocean?",
        choice1: "blue",
        choice2: "red",
        choice3: "yellow",
        choice4: "pink",
        answer: 1,
    },
    {

        question: "What is the garden state?",
        choice1: "alabama",
        choice2: "new jersey",
        choice3: "minnesota",
        choice4: "florida",
        answer: 2,
    },
    {

        question: "What color is lava?",
        choice1: "blue",
        choice2: "green",
        choice3: "red",
        choice4: "pink",
        answer: 3,
    },
    {

        question: "Who is the POTUS",
        choice1: "lincoln",
        choice2: "bush",
        choice3: "nixon",
        choice4: "biden",
        answer: 4,
    }
]

let SCORE_POINTS = 0

playBtn.addEventListener("click", () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    gameContainer.style.display = "block"
    playBtn.style.display = "none"
    timerObj = setInterval(() => {
        timerEl.innerText = timerCount;
        if(timerCount > 1){
            timerCount--;
        }else{
          endQuiz()
        }
    }, 1000);
})
getItem = () => {
    var previousDetails = localStorage.getItem("codequiz-user") || "First time user"
    var previousscore = localStorage.getItem("codequiz-score") || "Hope you get the max score"
    var text = `Previous Score: User + ${previousDetails} Score : ${previousscore}`
    document.getElementById("pScore").innerText= text
}
getItem()

getNewQuestion = () => {
    // if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    //     localStorage.setItem("mostRecentScore", score)

    //     return window.location.assign("/end.html")

    // }

    // questionCounter++
    // progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    
    let currentQuestion = availableQuestions[questionCounter]
    question.innerText = currentQuestion.question

    btn1.innerText = currentQuestion.choice1
    btn2.innerText = currentQuestion.choice2
    btn3.innerText = currentQuestion.choice3
    btn4.innerText = currentQuestion.choice4

}

function clickStart() {
    let userChoice = this.getAttribute("data-number")
    console.log(userChoice)
    if (userChoice == availableQuestions[questionCounter].answer){
        SCORE_POINTS += 10
    } else{
        SCORE_POINTS -= 5;
        timerCount--;
    }
    if (questionCounter < availableQuestions.length-1){
        questionCounter++;
        getNewQuestion()
    }else{
      endQuiz()
    } 

}

function endQuiz(){
    clearInterval(timerObj)
    gameContainer.style.display = "none"  
    enterHS.style.display = "block"
    console.log(SCORE_POINTS)
    scoreEl.innerText = "Current Score"+(SCORE_POINTS+timerCount)
}
function saveuser(){
    const userEl = document.getElementById("user")
    var user = userEl.value
    localStorage.setItem("codequiz-user",user);
    localStorage.setItem("codequiz-score",SCORE_POINTS)
    location.reload()
      
}

// choices.forEach(choice => {
//     choice.addEventListener("click", e => {
//         if(!acceptingAnswers) return

//         acceptingAnswers = false
//         const selectedChoice = e.target
//         const selectedAnswer = selectedChoice.dataset["number"]

//         let classToApply = selectedAnswer == currentQuestion.answer ? "correct" :
//         "incorrect"

//         if(classToApply === "correct") {
//             incrementScore(SCORE_POINTS)
//         }

//         selectedChoice.parentElement.classList.add(classToApply)

//         setTimeout(() => {
//             selectedChoice.parentElement.classList.remove(classToApply)
//             getNewQuestion()

//         }, 1000)
//     })
// })

// incrementScore = num => {
//     score +=num
//     scoreText.innerText = score
// }

