const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const boxSize = 20;
const canvasSize = canvas.width;
const boxCount = canvasSize / boxSize;
let score = 0;

let snake = [];
snake[0] = {x: boxCount / 2 * boxSize, y: boxCount / 2 * boxSize};

let food = {
    x: Math.floor(Math.random() * boxCount) * boxSize,
    y: Math.floor(Math.random() * boxCount) * boxSize
};

let d; // direction
document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    if (event.keyCode == 38 && d != "DOWN") d = "UP";
    if (event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    if (event.keyCode == 40 && d != "UP") d = "DOWN";
}

function draw() {
    context.clearRect(0, 0, canvasSize, canvasSize);
    
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "green" : "white";
        context.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
        context.strokeStyle = "black";
        context.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }

    context.fillStyle = "red";
    context.fillRect(food.x, food.y, boxSize, boxSize);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= boxSize;
    if(d == "UP") snakeY -= boxSize;
    if(d == "RIGHT") snakeX += boxSize;
    if(d == "DOWN") snakeY += boxSize;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * boxCount) * boxSize,
            y: Math.floor(Math.random() * boxCount) * boxSize
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    function collision(head, array) {
        for(let i = 0; i < array.length; i++) {
            if(head.x == array[i].x && head.y == array[i].y) return true;
        }
        return false;
    }

    if(snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, boxSize, boxSize);
}

let game = setInterval(draw, 100);
