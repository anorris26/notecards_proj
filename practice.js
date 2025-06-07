let questions = [];
let lastQuestionIndex = -1;

window.onload = function() {
    document.getElementById("hideable").style.display = 'block';
    document.getElementById("practice").style.display = 'none';
}

document.getElementById("setSelect").addEventListener("change", function() {
    const chosenSet = this.value.replace(/ /g, "");
    const wordInd = document.getElementById("display");
    questions = [];

    while (wordInd.firstChild) {
        wordInd.removeChild(wordInd.firstChild);
    }

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`${chosenSet}_`)) {
            const question = localStorage.getItem(key);
            const answer = key.split("_")[1];

            const listItem = document.createElement("li");
            listItem.className = "setDisplay";
            listItem.style.whiteSpace = "pre-wrap"; // Preserve line breaks
            listItem.textContent = `${answer}:\n\t${question}`;
            
            wordInd.append(listItem);
        }
    }
    document.getElementById("practiceButton").style.visibility = "visible";
});

document.getElementById("practiceButton").onclick = function() {
    const chosenSet = document.getElementById("setSelect").value.replace(/ /g, "");

    // Hide all elements with class 'hideable'
    document.getElementById("hideable").style.display = 'none';
    document.getElementById("practice").style.display = 'block';

    document.getElementById("answer").textContent = "";

    // Display a random question from the chosen set
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith(`${chosenSet}_`)) {
            const question = localStorage.getItem(key);
            const answer = key.split("_")[1];
            questions.push({ question, answer });
        }
    }

    displayRandomQuestion(questions);
}

document.getElementById("submit").onclick = function() {
    checkAnswer();
}

document.getElementById("next").onclick = function() {
    document.getElementById("status").textContent = "";
    document.getElementById("answer").value = "";
    displayRandomQuestion(questions);
}

document.getElementById("newSetButton").onclick = function() {
    // Show the set selection dropdown and hide the practice elements
    document.getElementById("questionDisplay").textContent =  "";
    document.getElementById("answerDisplay").textContent = "";
    document.getElementById("answer").value = "";
    document.getElementById("status").textContent = "";

    
    document.getElementById("practice").style.display = 'none';
    document.getElementById("hideable").style.display = 'block';
}

function displayRandomQuestion(questions) {
    if (questions.length === 0) {
        document.getElementById("status").innerHTML = "No questions available in this set.";
    } else {
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * questions.length);
        } while (randomIndex === lastQuestionIndex);

        lastQuestionIndex = randomIndex;
        console.log(randomIndex);

        const selectedQuestion = questions[randomIndex];

        document.getElementById("questionDisplay").textContent = selectedQuestion.question;
        document.getElementById("answerDisplay").textContent = selectedQuestion.answer;

        document.getElementById("practice").style.display = 'block';
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = document.getElementById("answerDisplay").textContent.trim();

    document.getElementById("status").style.visibility = "visible";

    if (userAnswer === correctAnswer) {
        document.getElementById("status").textContent = "Correct!";
    } else {
        document.getElementById("status").textContent = "Incorrect. The correct answer was: " + correctAnswer;
    }

}