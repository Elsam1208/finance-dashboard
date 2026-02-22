const form = document.getElementById('finance-form');
const transactionList = document.getElementById('transaction-list');
const incomeDisplay = document.getElementById('total-income');
const outcomeDisplay = document.getElementById('total-outcome');

const API_URL = 'http://localhost:3000/transactions';

// 1. Função para buscar transações do servidor
async function getTransactions() {
    const response = await fetch(API_URL);
    const data = await response.json();
    updateUI(data);
}

// 2. Função para atualizar a interface (HTML)
function updateUI(transactions) {
    transactionList.innerHTML = '';
    let income = 0;
    let outcome = 0;

    transactions.forEach(t => {
        const li = document.createElement('li');
        const symbol = t.type === 'income' ? '+' : '-';
        const colorClass = t.type === 'income' ? 'text-success' : 'text-danger';

        li.innerHTML = `
            ${t.description} 
            <span style="color: ${t.type === 'income' ? '#2ecc71' : '#e74c3c'}">
                ${symbol} R$ ${parseFloat(t.amount).toFixed(2)}
            </span>
        `;
        transactionList.appendChild(li);

        if (t.type === 'income') income += parseFloat(t.amount);
        else outcome += parseFloat(t.amount);
    });

    incomeDisplay.innerText = `R$ ${income.toFixed(2)}`;
    outcomeDisplay.innerText = `R$ ${outcome.toFixed(2)}`;
}

// 3. Função para enviar nova transação para o servidor
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newTransaction = {
        description: document.getElementById('desc').value,
        amount: document.getElementById('amount').value,
        type: document.getElementById('type').value
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction)
    });

    form.reset();
    getTransactions(); // Atualiza a lista após salvar
});

// Inicializa a busca ao carregar a página
getTransactions();