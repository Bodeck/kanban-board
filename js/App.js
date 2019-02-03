'use strict'
var prefix = 'https://cors-anywhere.herokuapp.com/'
var baseUrl = prefix + 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': 3607,
    'X-Auth-Token': '436acdcb35d10a21433857565d2eb47f'
}

fetch(baseUrl + '/board', {method: 'GET', headers: myHeaders})
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
        setUpCards(col, column.cards);
    });
}

function setUpCards(col, cards) {
    cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
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

