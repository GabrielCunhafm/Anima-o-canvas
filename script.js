// Seleciona o elemento canvas e define o contexto 2D
const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

// Configura o tamanho do canvas para preencher a tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define propriedades do círculo
let circle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 50,
    dx: 2, 
    dy: 2, 
    color: 'blue'
};

// Função para desenhar o círculo
function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

// Função de animação
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawCircle();

    // Atualiza a posição do círculo
    circle.x += circle.dx;
    circle.y += circle.dy;

    // Detecta colisões com as bordas do canvas
    if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
        circle.dx *= -1; 
    }
    if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
        circle.dy *= -1; 
    }

    requestAnimationFrame(animate); 
}

// Adiciona um evento de clique para mudar a cor do círculo
canvas.addEventListener('click', (event) => {
    const distX = event.clientX - circle.x;
    const distY = event.clientY - circle.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    // Verifica se o clique foi dentro do círculo
    if (distance <= circle.radius) {
        circle.color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Muda para uma cor aleatória
    }
});

animate();