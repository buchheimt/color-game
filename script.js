let numberOfSquares = 6;
let colors = [];
let pickedColor;
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetBtn = document.querySelector("#reset");
const modeBtns = document.querySelectorAll(".mode");

init();

function init() {
    setupModeBtns();
    setupSquares();
    resetBtn.addEventListener("click", () => reset());
    reset();
}

function setupModeBtns() {
    for (let i = 0; i < modeBtns.length; i++) {
        modeBtns[i].addEventListener("click", function() {
            modeBtns[0].classList.remove("selected");
            modeBtns[1].classList.remove("selected");
            this.classList.add("selected");
            numberOfSquares = this.textContent === "Easy" ? 3 : 6;
            reset();
        });
    }
}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            let clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetBtn.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again";
            }
        });
    }
}

function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    const idx = Math.floor(Math.random() * colors.length);
    return colors[idx];
}

function generateRandomColors(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 255) + 1;
    return `rgb(${r}, ${g}, ${b})`;
}

function displayColors() {
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    colorDisplay.textContent = pickedColor;
}

function reset() {
    colors = generateRandomColors(numberOfSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    displayColors();
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    resetBtn.textContent = "New Colors";
}
