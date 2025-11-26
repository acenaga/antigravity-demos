const player = document.getElementById('player');
const gameContainer = document.querySelector('.game-container');
const scoreElement = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreElement = document.getElementById('final-score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// Game Constants
const GRAVITY = 0.4;
const JUMP_STRENGTH = -7;
const PIPE_SPEED = 3;
const PIPE_SPAWN_RATE = 1500; // ms
const PIPE_GAP = 170;

// Game State
let isGameRunning = false;
let score = 0;
let velocity = 0;
let playerY = 300;
let pipes = [];
let lastTime = 0;
let pipeSpawnTimer = 0;
let animationFrameId;

// Inputs
function jump() {
    if (!isGameRunning) return;
    velocity = JUMP_STRENGTH;
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (isGameRunning) {
            jump();
        } else if (!startScreen.classList.contains('hidden')) {
            startGame();
        } else if (!gameOverScreen.classList.contains('hidden')) {
            resetGame();
        }
    }
});

gameContainer.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent scrolling
    if (isGameRunning) {
        jump();
    }
});

gameContainer.addEventListener('mousedown', (e) => {
    if (isGameRunning) {
        jump();
    }
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetGame);

function startGame() {
    isGameRunning = true;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    score = 0;
    scoreElement.innerText = score;
    playerY = gameContainer.clientHeight / 3;
    velocity = 0;
    pipes = [];

    // Clear existing pipes from DOM
    document.querySelectorAll('.obstacle').forEach(p => p.remove());

    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(gameLoop);
}

function resetGame() {
    startGame();
}

function createPipe() {
    const containerHeight = gameContainer.clientHeight;
    const groundHeight = containerHeight * 0.2; // 20% is ground
    const playableHeight = containerHeight - groundHeight;

    const minPipeHeight = 50;
    const maxPipeHeight = playableHeight - PIPE_GAP - minPipeHeight;

    // Random height for top pipe
    const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;

    const pipeX = gameContainer.clientWidth;

    // Top Pipe
    const topPipe = document.createElement('div');
    topPipe.classList.add('obstacle');
    topPipe.style.height = `${topHeight}px`;
    topPipe.style.top = '0';
    topPipe.style.left = `${pipeX}px`;
    // Flip the top cactus so it looks like it's hanging
    topPipe.style.borderBottomLeftRadius = '8px';
    topPipe.style.borderBottomRightRadius = '8px';
    topPipe.style.borderTopLeftRadius = '0';
    topPipe.style.borderTopRightRadius = '0';

    // Bottom Pipe
    const bottomPipe = document.createElement('div');
    bottomPipe.classList.add('obstacle');
    bottomPipe.style.height = `${playableHeight - topHeight - PIPE_GAP}px`;
    bottomPipe.style.bottom = `${groundHeight}px`; // Sit on ground
    bottomPipe.style.left = `${pipeX}px`;
    bottomPipe.style.borderBottomLeftRadius = '0';
    bottomPipe.style.borderBottomRightRadius = '0';
    bottomPipe.style.borderTopLeftRadius = '8px';
    bottomPipe.style.borderTopRightRadius = '8px';

    gameContainer.appendChild(topPipe);
    gameContainer.appendChild(bottomPipe);

    pipes.push({
        top: topPipe,
        bottom: bottomPipe,
        x: pipeX,
        passed: false
    });
}

function update(deltaTime) {
    // Physics
    velocity += GRAVITY;
    playerY += velocity;

    // Rotation based on velocity
    const rotation = Math.min(Math.max(velocity * 3, -25), 90);
    player.style.transform = `translateY(${playerY}px) rotate(${rotation}deg)`;

    // Boundaries
    const containerHeight = gameContainer.clientHeight;
    const groundHeight = containerHeight * 0.2;

    // Hit ground
    if (playerY + player.clientHeight >= containerHeight - groundHeight) {
        gameOver();
        return;
    }

    // Hit ceiling (optional, usually just stops you from flying over)
    if (playerY < 0) {
        playerY = 0;
        velocity = 0;
    }

    // Pipes
    pipeSpawnTimer += deltaTime;
    if (pipeSpawnTimer > PIPE_SPAWN_RATE) {
        createPipe();
        pipeSpawnTimer = 0;
    }

    // Move Pipes & Collision
    for (let i = 0; i < pipes.length; i++) {
        const p = pipes[i];
        p.x -= PIPE_SPEED; // Simple movement per frame

        p.top.style.left = `${p.x}px`;
        p.bottom.style.left = `${p.x}px`;

        // Collision Detection
        const playerRect = player.getBoundingClientRect();
        const topRect = p.top.getBoundingClientRect();
        const bottomRect = p.bottom.getBoundingClientRect();

        // Shrink hit box slightly for better feel
        const hitBoxPadding = 5;

        if (
            checkCollision(playerRect, topRect, hitBoxPadding) ||
            checkCollision(playerRect, bottomRect, hitBoxPadding)
        ) {
            gameOver();
            return;
        }

        // Score
        if (!p.passed && p.x + p.top.clientWidth < playerRect.left) {
            score++;
            scoreElement.innerText = score;
            p.passed = true;
        }

        // Remove off-screen pipes
        if (p.x < -100) {
            p.top.remove();
            p.bottom.remove();
            pipes.splice(i, 1);
            i--;
        }
    }
}

function checkCollision(player, obstacle, padding) {
    return (
        player.left + padding < obstacle.right &&
        player.right - padding > obstacle.left &&
        player.top + padding < obstacle.bottom &&
        player.bottom - padding > obstacle.top
    );
}

function gameOver() {
    isGameRunning = false;
    cancelAnimationFrame(animationFrameId);
    finalScoreElement.innerText = score;
    gameOverScreen.classList.remove('hidden');
}

function gameLoop(time) {
    if (!isGameRunning) return;

    const deltaTime = time - lastTime;
    lastTime = time;

    update(deltaTime);

    if (isGameRunning) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}
