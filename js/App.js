'use strict'
// document.addEventListener('DOMContentLoaded', () => {
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '3607',
    'X-Auth-Token': '436acdcb35d10a21433857565d2eb47f'
}

fetch(baseUrl + '/board', myHeaders)
    .then(function (resp) {
        return resp.json();
    })
    .then(function (resp) {
        setUpColumns(resp.columns);
    });

function setUpColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setUpCards(col, columns.cards);
    });
}

function setUpCards(col, cards) {
    cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name);
        col.addCard(cardObj);
    })
}

function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');
    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
}

