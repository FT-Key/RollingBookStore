let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = banner.offsetWidth;
canvas.height = banner.offsetHeight;
const ctx = canvas.getContext('2d');
let dots = [];
const arrayColors = ['#eee', '#60535A', '#80494F', '#516C65', '#CECA69'];

const initializeDots = () => {
    dots = [];
    for (let index = 0; index < 50; index++) {
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 5,
            color: arrayColors[Math.floor(Math.random() * 5)]
        });
    }
}

const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

initializeDots();
drawDots();

banner.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();

    let mouse = {
        x: event.clientX - banner.getBoundingClientRect().left,
        y: event.clientY - banner.getBoundingClientRect().top
    };

    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 250) {
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
});

function resizeCanvas() {
    const banner = document.querySelector('.banner');
    const canvas = document.getElementById('dotsCanvas');
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initializeDots();
    drawDots();
}

banner.addEventListener('mouseout', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
});

window.addEventListener('resize', () => {
    resizeCanvas();
});

export default resizeCanvas;