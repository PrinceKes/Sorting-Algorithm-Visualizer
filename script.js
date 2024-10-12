// JavaScript to handle number input logic

let currentIndex = 0;
let numbers = [];

// Get all input fields
const inputs = document.querySelectorAll('.input-boxes input');

// Function to handle number clicks
function handleNumber(num) {
  if (currentIndex < inputs.length) {
    inputs[currentIndex].value = num;
    currentIndex++;
  }
}

// Function to clear inputs
function clearInput() {
  inputs.forEach(input => input.value = '');
  currentIndex = 0;
  numbers = [];
}

// Function to submit numbers
function submitNumbers() {
  const enteredNumbers = Array.from(inputs).map(input => input.value);
  if (enteredNumbers.includes("")) {
    alert("Please enter all 10 numbers before submitting.");
  } else {
    numbers = enteredNumbers.map(Number); // Convert strings to numbers
    alert("Numbers submitted: " + numbers.join(', '));
    // You can process the numbers further here
  }
}

// Sorting Algorithms
async function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      await animate(arr, j, j + 1); // Visualize comparison
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
      }
    }
  }
  return arr;
}

async function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      await animate(arr, j, j + 1); // Visualize comparison
      arr[j + 1] = arr[j]; // Shift
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

async function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      await animate(arr, j, minIndex); // Visualize comparison
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // Swap
  }
  return arr;
}

// Merge Sort
async function mergeSort(arr) {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = await mergeSort(arr.slice(0, mid));
  const right = await mergeSort(arr.slice(mid));
  return merge(left, right);
}

async function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    await animate(result, leftIndex, rightIndex); // Visualize comparison
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Quick Sort
async function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    await animate(arr, i, arr.length - 1); // Visualize comparison
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...await quickSort(left), pivot, ...await quickSort(right)];
}

// Function to animate the sorting
async function animate(arr, index1, index2) {
  // You can implement your animation logic here, e.g., changing colors or heights of bars
  console.log(`Comparing: ${arr[index1]} and ${arr[index2]}`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
}

// Keyboard event listener
document.addEventListener('keydown', async (event) => {
  if (numbers.length === 0) {
    alert("Please submit numbers first.");
    return;
  }

  switch (event.key) {
    case 'b':
    case 'B':
      await bubbleSort([...numbers]);
      alert("Bubble Sort complete!");
      break;
    case 'i':
    case 'I':
      await insertionSort([...numbers]);
      alert("Insertion Sort complete!");
      break;
    case 's':
    case 'S':
      await selectionSort([...numbers]);
      alert("Selection Sort complete!");
      break;
    case 'm':
    case 'M':
      await mergeSort([...numbers]);
      alert("Merge Sort complete!");
      break;
    case 'q':
    case 'Q':
      await quickSort([...numbers]);
      alert("Quick Sort complete!");
      break;
    default:
      alert("Invalid key pressed. Use 'B', 'I', 'S', 'M', or 'Q'.");
  }
});
