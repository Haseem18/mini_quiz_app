const questions = [
    {
        question: "Which is the largest animal in the world",
        options: ["Shark", "Blue Whale", "Elephant", "Giraffe"],
        correctAnswers: "Blue Whale"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswers: "Mars"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "J.K. Rowling", "Leo Tolstoy"],
        correctAnswers: "William Shakespeare"
    },
    {
        question: "What is the boiling point of water at sea level?",
        options: ["100°C", "90°C", "80°C", "120°C"],
        correctAnswers: "100°C"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        correctAnswers: "Carbon Dioxide"
    }
];

const quizContainer = document.querySelector(".quiz_container")
const questionElement = document.querySelector("h2");
const quizOptions = document.querySelector(".quiz_options");
const questionNumber = document.querySelector("p");
const nextBtn = document.querySelector(".next_btn");
const resultBtn = document.querySelector(".result_btn");
const resultContainer = document.querySelector(".result_container");
const result = document.querySelector(".result");
const playAgain = document.querySelector(".play_again");

let questionIndex = 0;
let correctCount = 0;

const renderQuestion = () => {
    const { question, options } = questions[questionIndex];
    questionElement.innerHTML = `${questionIndex + 1}. ${question}`;
    
    quizOptions.innerHTML = "";
    options.forEach((opt) => {
        const option = document.createElement("button");
        option.innerHTML = opt;
        option.value = opt;

        quizOptions.appendChild(option);
    })

    questionNumber.innerHTML = `${questionIndex + 1} of ${questions.length} Questions` 
};

renderQuestion();

const upateQuestion = () => {
    quizOptions.addEventListener("click", onOption);
    if (questionIndex === questions.length - 1) {
        nextBtn.classList.add("hidden");
        resultBtn.classList.remove("hidden");
        return;
    }
    questionIndex++;
    renderQuestion();
}

nextBtn.addEventListener("click", upateQuestion);

const displayResult = () => {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    result.innerHTML = `${correctCount} out of ${questions.length} is correct`;
}

resultBtn.addEventListener("click", displayResult);

const onOption = (event) => {
    if (event.target.tagName === "BUTTON") {
        const button = event.target;
        const correctAnswer = questions[questionIndex].correctAnswers;
        
        if (button.value === correctAnswer) {
            button.classList.add("correct");
            correctCount++;
        } else {
            button.classList.add("wrong");
            button.parentElement.querySelectorAll("button").forEach((btn) => {
                if (btn.value === correctAnswer) {
                    btn.classList.add("correct");
                }
            })
        }

        quizOptions.removeEventListener("click", onOption)
    }
}

quizOptions.addEventListener("click", onOption);

const displayQuiz = () => {
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    resultBtn.classList.add("hidden");

    document.querySelectorAll(".quiz_options button").forEach((btn) => {
        btn.className = "";
    })

    questionIndex = 0;
    renderQuestion();
    
}

playAgain.addEventListener("click", displayQuiz);
