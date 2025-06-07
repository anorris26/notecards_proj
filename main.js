window.onload = function() {
    document.getElementById("answer").value = "";
    document.getElementById("question").value = "";
}

document.getElementById("delete_set").onclick = function() {
    const chosenSet = document.getElementById("setSelect").value;
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith(chosenSet)) {
            localStorage.removeItem(localStorage.key(i));
        }
    }
    wordInd = document.getElementById(`${chosenSet}_list`);
    while (wordInd.firstChild) {
        wordInd.removeChild(wordInd.firstChild);
    }
}

document.getElementById("delete_all").onclick = function() {
    localStorage.clear();

    document.getElementById("status").style.visibility = "visible";

    document.getElementById("status").innerHTML = "Deleted all flashcards.";
    document.querySelectorAll(".set_lists").forEach(function(set) {
        // Clear the list items
        Array.from(set.children).forEach(function(child) {
            set.removeChild(child); // Remove each child element from the set list
        });
    });
}

document.getElementById("answer").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        newFlashcard();
    }
});

document.getElementById("question").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        newFlashcard();
    }
});

document.getElementById("setSelect").addEventListener("change", function() {
    const chosenSet = this.value.replace(/ /g, "");
    const wordInd = document.getElementById(`${chosenSet}_list`);

    while (wordInd.firstChild) {
        wordInd.removeChild(wordInd.firstChild);
    }

    document.getElementById("setName").textContent = `${this.options[this.selectedIndex].textContent}`;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`${chosenSet}_`)) {
            const question = localStorage.getItem(key);
            const answer = key.split("_")[1];

            const listItem = document.createElement("li");
            listItem.textContent = `${answer}:\n${question}`;
            listItem.style.whiteSpace = "pre-wrap";

            const button = addDeleteButton(key, listItem, wordInd);
            listItem.append(button);
            wordInd.append(listItem);
        }
    }

    document.querySelectorAll(".set_lists").forEach(function(set) {
        if (set.id === `${chosenSet}_list`) {
            set.style.display = "block";
        } else {
            set.style.display = "none";
        }
    });
});

function addDeleteButton(key, listItem, wordInd) {
    // Create a delete button
    const button = document.createElement("button");
    const answer = key.split("_")[1];
    const set = key.split("_")[0];
    button.textContent = "Delete";
    button.className = "deleteButton";
    button.onclick = function() {
        document.getElementById("status").style.display = "block";

        document.getElementById("status").innerHTML = `Deleted "${answer}" from ${set}`;
        localStorage.removeItem(key);
        wordInd.removeChild(listItem);
    }
    return button;
}

function newFlashcard() {
    let set = document.getElementById("setSelect").value;
    const setNum = set[set.length - 1];
    let answer = document.getElementById("answer").value;
    let question = document.getElementById("question").value;
    let key = `${set}_${answer}`;

    document.getElementById("status").style.visibility = "visible";

    if (set === "") {
        document.getElementById("status").innerHTML = "Please select a set.";
        return;
    }

    // Check if the answer or question fields are empty
    if (answer === "" || question === "") {
        document.getElementById("status").innerHTML = "Please fill in both fields.";
        return;
    }

        // Check if the answer already exists in the set
    if (localStorage.getItem(key)) {
        document.getElementById("status").innerHTML = "This answer already exists in this set. Please enter a different answer.";
        return;
    }
    
    localStorage.setItem(key, question);

    
    document.getElementById("status").innerHTML = `new element: ${answer} and ${question} in set ${setNum}`;
    const listItem = document.createElement("li");
    listItem.textContent = `${answer}:\n${question}`;
    listItem.style.whiteSpace = "pre-wrap";

    const wordInd = document.getElementById(`${set}_list`);
    const button = addDeleteButton(key, listItem, wordInd);
    listItem.appendChild(button);
    wordInd.appendChild(listItem);

    // Clear the input fields after adding the item
    document.getElementById("answer").value = "";
    document.getElementById("question").value = "";
}