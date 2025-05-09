let inum = localStorage.length;
let wordind = document.getElementById("testList");

document.getElementById("test").onclick = function() {
    let answer = document.getElementById("answer").value;
    let question = document.getElementById("question").value
    localStorage.setItem(answer, question);

    document.getElementById("demo").innerHTML = `new element: ${answer} and ${question}`;
    const listItem = document.createElement("li");
    listItem.textContent = answer + ": " + question;

    const button = addDeleteButton(answer, listItem);
    listItem.appendChild(button);
    wordind.appendChild(listItem);

    // Clear the input fields after adding the item
    document.getElementById("answer").value = "";
    document.getElementById("question").value = "";
    inum += 1;

    // Add a delete button to each list item

}

document.getElementById("delete_all").onclick = function() {
    localStorage.clear();
    document.getElementById("demo").innerHTML = "";
    wordind.textContent = "";
}

window.onload = function() {
    document.getElementById("answer").value = "";
    document.getElementById("question").value = "";
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(localStorage.key(i));
        console.log(localStorage.getItem(localStorage.key(i)));
        const listItem = document.createElement("li");
        listItem.textContent = localStorage.key(i) + ": " + item;
        // Add a delete button to each list item
        const button = addDeleteButton(localStorage.key(i), listItem);
        listItem.appendChild(button);
        wordind.appendChild(listItem);
    }
}

function addDeleteButton(key, listItem) {
    // Create a delete button
    const button = document.createElement("button");
    button.textContent = "Delete";
    button.onclick = function() {
        localStorage.removeItem(key);
        wordind.removeChild(listItem);
    }
    // Add a class to the button for styling
    button.classList.add("delete-button");
    return button;
}