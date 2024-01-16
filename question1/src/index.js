import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import questions from './utils/questions';

function getRandomQuestions() {
    const shuffled = questions.sort( () => 0.5 - Math.random());
    return shuffled.slice(0,3);
}

function displayQuestion(question) {
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';

    const questionText = document.createElement('h2');
    questionText.textContent = question.question;
    questionContainer.appendChild(questionText);

    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';

    question.answers.forEach((answer, index) => {
        const answerContainer = document.createElement('div');
        answerContainer.className = 'answer-container';

        const answerInput = document.createElement('input');
        answerInput.type = 'radio';
        answerInput.name = `question${question.id}`;
        answerInput.value = index;
        answerInput.id = `answer${index}`;

        const answerLabel = document.createElement('label');
        answerLabel.htmlFor = `answer${index}`;
        answerLabel.textContent = answer.text;

        answerContainer.appendChild(answerInput);
        answerContainer.appendChild(answerLabel);
        answersContainer.appendChild(answerContainer);
    });

    questionContainer.appendChild(answersContainer);
    document.body.appendChild(questionContainer);
}

function calculateScore(questionsSelected) {
    let score = 0;
    questionsSelected.forEach(question => {
        const selectedAnswer = document.querySelector(`input[name="question${question.id}"]:checked`);
        if (selectedAnswer && question.answers[selectedAnswer.value].isCorrect) {
            score += 1;
        }
    });

    document.body.innerHTML = '';

    const scoreElement = document.createElement('h3');
    scoreElement.textContent = `Your score is ${score}/3.`;
    document.body.appendChild(scoreElement);

    const replayButton = document.createElement('button');
    replayButton.textContent = 'Replay';
    replayButton.onclick = () => {
        document.body.innerHTML = '';
        const randomQuestions = getRandomQuestions();
        randomQuestions.forEach(displayQuestion);

        const scoreButton = document.createElement('button');
        scoreButton.textContent = 'Calculate my score';
        scoreButton.onclick = () => calculateScore(randomQuestions);
        document.body.appendChild(scoreButton);
    };
    document.body.appendChild(replayButton);
}

const randomQuestions = getRandomQuestions();
randomQuestions.forEach(displayQuestion);

const scoreButton = document.createElement('button');
scoreButton.textContent = 'Calculate my score';
scoreButton.onclick = () => calculateScore(randomQuestions);
document.body.appendChild(scoreButton);
