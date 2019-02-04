function Card(id, name, columnId) {
    var self = this;
    this.name = name || 'No name given';
    this.id = id;
    this.columnId = columnId;
    this.element = generateTemplate('card-template', { description: this.name }, 'li');
    this.element.querySelector('.card').addEventListener('click', function (event) {
        event.stopPropagation();
        if (event.target.classList.contains('btn-delete')) {
            self.removeCard();
        } else if (event.target.classList.contains('btn-edit')) {
            self.changeName();
        }
    })
}

Card.prototype = {
    removeCard: function () {
        var self = this;
        fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
            .then(function (resp) {
                return resp.json();
            })
            .then(function (resp) {
                self.element.parentNode.removeChild(self.element);
            })
    },
    changeName: function () {
        var self = this;
        var newName = prompt('Please, enter new text...');
        var data = new FormData();
        data.append('name', newName);
        data.append('bootcamp_kanban_column_id', self.columnId);
        fetch(baseUrl + '/card/' + self.id, {
            method: 'PUT',
            body: data,
            headers: myHeaders
        })
        .then(function(resp){
            resp.json();
        })
        .then(function(resp) {
            self.element.querySelector('.card-description').innerText = newName;
        })
    }
}