function Card(description) {
    var self = this;
    this.description = description;
    this.id = randomString();
    this.element = generateTemplate('card-template', { description: this.description }, 'li');
    this.element.querySelector('.card').addEventListener('click', function(event){
        event.stopPropagation();
        if (event.target.classList.contains('btn-delete')) {
            self.removeCard();
        }
    })
}

Card.prototype = {
    removeCard: function () {
        this.element.parentNode.removeChild(this.element);
    }
}