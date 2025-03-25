const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar o body parser para lidar com os dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para enviar o formulário de confirmação de presença
app.post('/confirmar-presenca', (req, res) => {
    const { nome, presenca, quantidade } = req.body;

    // Criação do transporter para enviar o email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'seuemail@gmail.com',  // Substitua pelo seu email
            pass: 'suasenha'  // Substitua pela sua senha ou use uma senha de app (para Gmail)
        }
    });

    // Configuração do email
    const mailOptions = {
        from: 'seuemail@gmail.com',
        to: 'emaildestino@dominio.com',  // Substitua pelo email que vai receber as confirmações
        subject: 'Confirmação de Presença na Festa de 15 Anos da Malu',
        text: `
        Nome: ${nome}
        Presença: ${presenca}
        Quantidade de Pessoas: ${quantidade}
        `
    };

    // Enviar o email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Erro ao enviar email.');
        } else {
            console.log('Email enviado: ' + info.response);
            return res.status(200).send('Confirmação enviada com sucesso!');
        }
    });
});

// Rota para redirecionar para a forma de pagamento correta
app.get('/pagamento/:metodo', (req, res) => {
    const metodo = req.params.metodo;

    // Redirecionar conforme o método de pagamento
    switch(metodo) {
        case 'paypal':
            res.redirect('https://www.paypal.com');
            break;
        case 'pix':
            res.redirect('https://www.pix.com');
            break;
        case 'bancario':
            res.redirect('https://www.bancario.com');
            break;
        default:
            res.status(400).send('Método de pagamento inválido.');
            break;
    }
});

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
