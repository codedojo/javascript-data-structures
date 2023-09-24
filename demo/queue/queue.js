import Queue from "../queue";

const queue = new Queue();

function handleAddButtonClick() {
    const value = getRandomNumber();

    queue.enqueue(value);
}

function handleProcessButtonClick() {
    const value = queue.dequeue();

    console.log(value);
}

setInterval(() => {
    const value = queue.dequeue();

    console.log(value);
}, 100);