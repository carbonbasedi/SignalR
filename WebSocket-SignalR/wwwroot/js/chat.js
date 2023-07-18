"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
connection.start().then(function () {
    if (localStorage.getItem('user')) {
        ShowChatSection()
    }
});

const joinGroupForm = document.getElementById('joinGroupForm');
const joinGroupSection = document.getElementById('joinGroupSection');
const chatSection = document.getElementById('chatSection');
const leaveGroup = document.getElementById('leaveGroup');

joinGroupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var user = {
        name: document.getElementById('name').value,
        group: document.getElementById('group').value
    }
    localStorage.setItem('user', JSON.stringify(user));
    ShowChatSection();
})

leaveGroup.addEventListener('click', function () {
    var user = JSON.parse(localStorage.getItem('user'));
    localStorage.removeItem('user');
    ShowJoinGroupSection();
})

function ShowChatSection() {
    joinGroupSection.classList.add('d-none');
    chatSection.classList.remove('d-none');
}
function ShowJoinGroupSection() {
    joinGroupSection.classList.remove('d-none');
    chatSection.classList.add('d-none');
}

//connection.on("ReceiveMessage", function (user, message) {
//    var li = document.createElement("li");
//    document.getElementById("messagesList").appendChild(li);
//    li.textContent = `${user} says ${message}`;
//});


//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var user = document.getElementById("userInput").value;
//    var message = document.getElementById("messageInput").value;
//    connection.invoke("SendMessage", user, message).catch(function (err) {
//        return console.error(err.toString());
//    });
//    event.preventDefault();
//});