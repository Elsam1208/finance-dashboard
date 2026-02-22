const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Banco de dados temporário (na memória)
let transactions = [
    { id: 1, description: "Salário", amount: 5000, type: "income" },
    { id: 2, description: "Aluguel", amount: 1200, type: "outcome" }
];

// Rota para listar transações
app.get('/transactions', (req, res) => {
    res.json(transactions);
});

// Rota para adicionar nova transação
app.post('/transactions', (req, res) => {
    const { description, amount, type } = req.body;
    const newTransaction = { id: Date.now(), description, amount, type };
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor bombando em http://localhost:${PORT}`));