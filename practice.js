let questions = [];

window.onload = function() {
    localStorage.setItem("set1_apple", "A fruit that is red or green.");
    localStorage.setItem("set1_banana", "A long yellow fruit.");
}

document.getElementById("setSelect").addEventListener("change", function() {
    const chosenSet = this.value.replace(/ /g, "");
    const wordInd = document.getElementById("display");

    while (wordInd.firstChild) {
        wordInd.removeChild(wordInd.firstChild);
    }

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`${chosenSet}_`)) {
            const question = localStorage.getItem(key);
            const answer = key.split("_")[1];

            const listItem = document.createElement("li");
            listItem.textContent = `${answer}: ${question}`;
            
            wordInd.append(listItem);
        }
    }
    document.getElementById("practiceButton").style.display = "block"
});

document.getElementById("practiceButton").onclick = function() {
    const chosenSet = document.getElementById("setSelect").value.replace(/ /g, "");

    // Hide all elements with class 'hideable'
    document.querySelectorAll('.hideable').forEach(function(element) {
        element.style.display = 'none';
    });
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
    displayRandomQuestion(questions);
}

document.getElementById("newSetButton").onclick = function() {
    // Show the set selection dropdown and hide the practice elements
    document.getElementById("questionDisplay").textContent =  "";
    document.getElementById("answerDisplay").textContent = "";
    document.getElementById("status").textContent = "";

    document.querySelectorAll('.practice').forEach(function(element) {
        element.style.display = 'none';
    });
    document.querySelectorAll('.hideable').forEach(function(element) {
        element.style.display = 'block';
    });
}

function displayRandomQuestion(questions) {
    if (questions.length === 0) {
        document.getElementById("status").innerHTML = "No questions available in this set.";

    } else {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const selectedQuestion = questions[randomIndex];

        document.getElementById("questionDisplay").textContent = selectedQuestion.question;
        document.getElementById("answerDisplay").textContent = selectedQuestion.answer;

        document.querySelectorAll('.practice').forEach(function(element) {
            element.style.display = 'block';        
        });
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = document.getElementById("answerDisplay").textContent.trim();

    if (userAnswer === correctAnswer) {
        document.getElementById("status").textContent = "Correct!";
    } else {
        document.getElementById("status").textContent = "Incorrect. The correct answer was: " + correctAnswer;
    }
}