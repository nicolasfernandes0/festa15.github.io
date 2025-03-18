// Função para scroll suave
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Validação do formulário de confirmação de presença
document.getElementById('form-presenca').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão
    const nome = document.getElementById('nome').value;
    const presenca = document.getElementById('presenca').value;
    const feedback = document.getElementById('feedback');

    if (nome && presenca) {
        feedback.textContent = `Obrigado, ${nome}, por confirmar sua presença!`;
    } else {
        feedback.textContent = "Por favor, preencha todos os campos.";
    }
});
