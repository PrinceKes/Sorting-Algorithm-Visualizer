const canvas = document.getElementById('sortCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const algorithmSelect = document.getElementById('algorithmSelect');
const arrayInput = document.getElementById('arrayInput');

let array = [];
let animationSpeed = 100;
let barWidth = 20;

function getInputArray() {
    let input = arrayInput.value.split(',');
    array = input.map(Number);
    barWidth = Math.floor(canvas.width / array.length); 
}

function drawArray(arr) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < arr.length; i++) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(i * barWidth, canvas.height - arr[i] * 10, barWidth, arr[i] * 10);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            drawArray(arr);
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            await sleep(animationSpeed);        }
    }
}

async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            drawArray(arr);
            await sleep(animationSpeed);
        }
        arr[j + 1] = key;
    }
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            drawArray(arr);
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
            await sleep(animationSpeed);
        }

        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
}

async function mergeSort(arr, start = 0, end = arr.length - 1) {
    if (start >= end) return;
    let mid = Math.floor((start + end) / 2);
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end) {
    let temp = [];
    let i = start, j = mid + 1;
    while (i <= mid && j <= end) {
        if (arr[i] <= arr[j]) temp.push(arr[i++]);
        else temp.push(arr[j++]);
    }
    while (i <= mid) temp.push(arr[i++]);
    while (j <= end) temp.push(arr[j++]);
    for (let i = start; i <= end; i++) {
        arr[i] = temp[i - start];
        drawArray(arr);
        await sleep(animationSpeed);
    }
}

async function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        drawArray(arr);
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        await sleep(animationSpeed);
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

startButton.addEventListener('click', async () => {
    getInputArray();
    let selectedAlgorithm = algorithmSelect.value;

    switch (selectedAlgorithm) {
        case 'bubble':
            await bubbleSort(array);
            break;
        case 'insertion':
            await insertionSort(array);
            break;
        case 'selection':
            await selectionSort(array);
            break;
        case 'merge':
            await mergeSort(array);
            break;
        case 'quick':
            await quickSort(array);
            break;
    }

    drawArray(array); 
});
