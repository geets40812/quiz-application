const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion ={}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which type of language JavaScript is ____',
        choice1: 'Object-Oriented',
        choice2: 'Object-Based',
        choice3: 'Assembly-Language',
        choice4: 'High-Level',
        answer: 2,
    },
    {
        question: 'Which one of the following is also known as Conditional Expression?',
        choice1: 'Alternative to if-else',
        choice2: 'Switch Statement',
        choice3: 'If-then-else statement',
        choice4: 'immediate if',
        answer: 4,
    },
    {
        question: 'In JavaScript, what is block of statement called?',
        choice1: 'Conditional Block',
        choice2: 'Block that combines a number of statements into a single compouns statement',
        choice3: 'Both conditional block and a single statement',
        choice4: 'Black that contains a single statement',
        answer: 2,
    },
    {
        question: 'What interpreter encounters an empty statements, what it will do: ',
        choice1: 'Shows a warning',
        choice2: 'Prompts to complete the statement',
        choice3: 'Throws an error',
        choice4: 'Ignores the statements',
        answer: 4,
    },
    {
        question: 'Which one of the following is the correct way for calling the Javascript code?',
        choice1: 'Preprocessor',
        choice2: 'Triggering Event',
        choice3: 'RMI',
        choice4: 'Function/Method',
        answer: 4,
    },
    {
        question: 'The "function" and "var" are known as:',
        choice1: 'Keywords',
        choice2: 'Data types',
        choice3: 'Declaration statements',
        choice4: 'Prototypes',
        answer: 3,
    },
    {
        question: 'Which of the following type of variable is volatile?',
        choice1: 'Mutable Variable',
        choice2: 'Dynamic Variable',
        choice3: 'Volatile Variable',
        choice4: 'Immutable Variable',
        answer: 1,
    },
    {
        question: 'When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints _____',
        choice1: 'Prints an exception error',
        choice2: 'Prints an overfolw error',
        choice3: 'Displays "Infinity"',
        choice4: 'Prints the value as such',
        answer: 3,
    },
    {
        question: 'In JavaScript, which one of the following is not cinsidered as an error ?',
        choice1: 'Syntax Error',
        choice2: 'Missing of semicolons',
        choice3: 'Division by Zero',
        choice4: 'Missing of Bracket',
        answer: 3,
    },
    {
        question: 'Which of the following number object function returns the value of the number ?',
        choice1: 'toString()',
        choice2: 'valueOf()',
        choice3: 'toLocaleString',
        choice4: 'toPrecisiom',
        answer: 2,
    },
    {
        question: 'In Javascript, What will be used for calling the function definition expression ?',
        choice1: 'Function Prototype',
        choice2: 'Function Literal',
        choice3: 'Function Calling',
        choice4: 'Function Declaration',
        answer: 2,
    },
    {
        question: 'The "new Point(3,2)", is a kind of _____ expression.',
        choice1: 'Object Creation Expression',
        choice2: 'Primary Expression',
        choice3: 'Invocation Expression',
        choice4: 'Primary Expression',
        answer: 3,
    },
    {
        question: 'Which one of the following operator is used to check weather a specific property exists or not: ',
        choice1: 'Exists',
        choice2: 'exist',
        choice3: 'within',
        choice4: 'in',
        answer: 4,
    },
    {
        question: 'Which one of the following is an ternary operator?',
        choice1: '?',
        choice2: ':',
        choice3: '-',
        choice4: '+',
        answer: 1,
    },
    {
        question: 'What is the role of "debugger" statement?',
        choice1: 'It is kind of keyword which is used to debug the entire program at once',
        choice2: 'It will do nothing, although it is a breakpoint',
        choice3: 'It will debug the error in that statement',
        choice4: 'All the above',
        answer: 2,
    },
]
const SCORE_POINTS = 50
const MAX_QUESTIONS = 15
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions=[...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Questions ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.getElementsByClassName.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

     choices.forEach(choice => {
         const number = choice.dataset['number']
         choice.innerText = currentQuestion['choice' + number]
     })

     availableQuestions.splice(questionsIndex, 1)

     acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click' , e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score  
}

startGame()