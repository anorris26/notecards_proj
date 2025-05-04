let inum = localStorage.length;
let wordind = document.getElementById("testList");

document.getElementById("test").onclick = function() {
    let answer = document.getElementById("answer").value;
    let question = document.getElementById("question").value
    localStorage.setItem(answer, question);

    document.getElementById("demo").innerHTML = `new element: ${answer} and ${question}`;
    const listItem = document.createElement("li");
    listItem.textContent = answer + ": " + question;
    wordind.appendChild(listItem);

    document.getElementById("answer").value = "";
    document.getElementById("question").value = "";
    inum += 1;
}

document.getElementById("delete").onclick = function() {
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
        wordind.appendChild(listItem);
    }
}