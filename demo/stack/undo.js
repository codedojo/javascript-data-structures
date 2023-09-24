import Stack from '../stack.js';

class UndoAction {
    constructor(control) {
        this.control = control;
        this.color = control.style.backgroundColor;
    }

    execute() {
        this.control.style.backgroundColor = this.color;
    }

    toString() {
        return `${this.button.textContent}: ${this.color}`;
    }
}

const undoActions = new Stack();

function handleButtonClick(event) {
    undoActions.push(new UndoAction(event.target));
    this.style.backgroundColor = getRandomColor();
}

function handleUndoClick() {
    const action = undoActions.pop();
    action?.execute();
}