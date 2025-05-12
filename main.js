let inum = localStorage.length;

document.getElementById("test").onclick = function() {
    let set = document.getElementById("setSelect").value;
    let answer = document.getElementById("answer").value;
    let question = document.getElementById("question").value
    let key = `${set}_${answer}`;
    
    // Check if the answer already exists in the set
    if (localStorage.getItem(key)) {
        alert("This answer already exists in this set. Please enter a different answer.");
        return;
    }

    // Check if the answer or question fields are empty
    if (answer === "" || question === "") {
        alert("Please fill in both fields.");
        return;
    }

    
    localStorage.setItem(key, question);

    document.getElementById("demo").innerHTML = `new element: ${answer} and ${question}`;
    const listItem = document.createElement("li");
    listItem.textContent = answer + ": " + question;

    const wordInd = document.getElementById(`${set}_list`);
    const button = addDeleteButton(key, listItem, wordInd);
    listItem.appendChild(button);
    wordInd.appendChild(listItem);

    // Clear the input fields after adding the item
    document.getElementById("answer").value = "";
    document.getElementById("question").value = "";
    inum += 1;


}

document.getElementById("delete_all").onclick = function() {
    localStorage.clear();
    document.getElementById("demo").innerHTML = "";
    document.querySelectorAll('[name="set_lists"]').forEach(function(set) {
        // Clear the list items
        Array.from(set.children).forEach(function(child) {
            set.removeChild(child); // Remove each child element from the set list
        });
    });
}

window.onload = function() {
    document.getElementById("answer").value = "";
    document.getElementById("question").value = "";
    for (let i = 0; i < localStorage.length; i++) {
        // Get the set, answer, and definition from localStorage
        const definition = localStorage.getItem(localStorage.key(i));
        let key = localStorage.key(i);
        let set = key.split("_")[0];
        let answer = key.split("_")[1];
        let wordInd = document.getElementById(`${set}_list`);

        // Add answer and definition to the list
        const listItem = document.createElement("li");
        listItem.textContent = answer + ": " + definition;
        // Add a delete button to each list item
        const button = addDeleteButton(localStorage.key(i), listItem, wordInd);

        listItem.appendChild(button);
        wordInd.appendChild(listItem);
    }
}

function addDeleteButton(key, listItem, wordInd) {
    // Create a delete button
    const button = document.createElement("button");
    button.textContent = "Delete";
    button.onclick = function() {
        localStorage.removeItem(key);
        wordInd.removeChild(listItem);
    }
    return button;
}

function loadSetLists(key, item) {
    const listItem = document.createElement("li");
    listItem.textContent = key + ": " + item;
    // Add a delete button to each list item
    const button = addDeleteButton(key, listItem);
    listItem.appendChild(button);
    wordind.appendChild(listItem);
}