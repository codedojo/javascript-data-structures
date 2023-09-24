import PriorityQueue from "../priority-queue";

const queue = new PriorityQueue();

function handleAddButtonClick() {
    const value = getRandomNumber();

    queue.enqueue(value);
}

function handleProcessButtonClick() {
    const value = queue.dequeue();

    console.log(value);
}