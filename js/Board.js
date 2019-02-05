var board = {
    name: 'Kanban Board',
    addColumn: function (column) {
        this.element.appendChild(column.element);
        initSortable(column.id);
    },
    element: document.querySelector('#board .column-container')
}

document.querySelector('#board .create-column').addEventListener('click', function () {
    var name = prompt('Enter column name');
    var data = new FormData();

    data.append('name', name);

    fetch(baseUrl + '/column', {
        method: 'POST',
        headers: myHeaders,
        body: data,
    })
        .then(function (resp) {
            return resp.json();
        })
        .then(function (resp) {
            var column = new Column(resp.id, name);
            board.addColumn(column);
        })
})

function initSortable(id) {
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true,
        handle: '.card',
        onAdd: function (evt) {
            if (evt.from.id !== evt.to.id) {
                var myHeaders = {
                    'X-Client-Id': 3607,
                    'X-Auth-Token': '436acdcb35d10a21433857565d2eb47f',
                    'Content-Type': 'application/json'
                }
                var cardID = evt.item.id;
                var colId = evt.to.id;
                var name = evt.item.querySelector('.card-description').innerText;
                var body = JSON.stringify({ 'name': name, 'bootcamp_kanban_id': parseInt(colId) });
                fetch(baseUrl + '/card/' + cardID, { method: 'PUT',headers: myHeaders, body: body })
                    .then(function (resp) {
                        return resp.json();
                    })
            }
            console.log('from',evt.from.id);
            console.log('to', evt.to.id);
            console.log(evt.item.id);
        }
    })
}