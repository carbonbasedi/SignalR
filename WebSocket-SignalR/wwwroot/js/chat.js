﻿"use strict";

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
const sendMessageForm = document.getElementById('sendMessageForm');

joinGroupForm.addEventListener('submit', function (e) {
	e.preventDefault();

	var user = {
		name: document.getElementById('name').value,
		group: document.getElementById('group').value
	}

	connection.invoke("AddToGroupAsync", user.group).then(function () {
		localStorage.setItem('user', JSON.stringify(user));
		ShowChatSection();
	}).catch(function (err) {
		return console.error(err.toString());
	});
})

leaveGroup.addEventListener('click', function () {
	var user = JSON.parse(localStorage.getItem('user') ?? '');

	connection.invoke("RemoveFromGroupAsync", user.group).then(function () {
		localStorage.removeItem('user');
		ShowJoinGroupSection();
	}).catch(function (err) {
		return console.error(err.toString());
	});
})

function ShowChatSection() {
	joinGroupSection.classList.add('d-none');
	chatSection.classList.remove('d-none');
	ClearChat();
}
function ShowJoinGroupSection() {
	joinGroupSection.classList.remove('d-none');
	chatSection.classList.add('d-none');
}

sendMessageForm.addEventListener('submit', function (e) {
	e.preventDefault();

	var user = JSON.parse(localStorage.getItem('user'));
	var message = document.getElementById('message').value;

	connection.invoke("SendMessage", user.name, user.group, message).then(function () {
		document.getElementById('message').value = ''
	}).catch(function (err) {
		return console.error(err.toString());
	});
})

connection.on("ReceiveMessage", function (username, message) {
	var li = document.createElement("li");
	document.getElementById("messages").appendChild(li);
	li.innerHTML = `${username} : ${message}`;
});

function ClearChat() {
	document.getElementById('messages').innerHTML = '';
}
//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var user = document.getElementById("userInput").value;
//    var message = document.getElementById("messageInput").value;
//    connection.invoke("SendMessage", user, message).catch(function (err) {
//        return console.error(err.toString());
//    });
//    event.preventDefault();
//});