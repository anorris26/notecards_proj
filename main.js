let inum = localStorage.length;
let wordind = document.getElementById("testList");

document.getElementById("test").onclick = function() {
    const x = document.getElementById("inp").value;
    localStorage.setItem(`${inum}`, x);

    document.getElementById("demo").innerHTML = `new element: ${x}`;
    const listItem = document.createElement("li");
    listItem.textContent = x;
    wordind.appendChild(listItem);

    inum += 1;
}

document.getElementById("delete").onclick = function() {
    localStorage.clear();
    
}

window.onload = function() {
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(localStorage.key(i));
        const listItem = document.createElement("li");
        listItem.textContent = item;
        wordind.appendChild(listItem);
    }
}