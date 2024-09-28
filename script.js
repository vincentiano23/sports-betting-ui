const oddButtons = document.querySelectorAll('.odd-btn');
const betList = document.getElementById('bet-list');
const totalOddsElement = document.getElementById('total-odds');
const potentialWinningsElement = document.getElementById('potential-winnings');
const betAmountInput = document.getElementById('bet-amount');
const placeBetButton = document.getElementById('place-bet');

let selectedBets = [];
let totalOdds = 0;

// Function to add a bet to the bet slip
function addBetToSlip(match, odd) {
    const betItem = document.createElement('li');
    betItem.textContent = `${match}: ${odd}`;
    betList.appendChild(betItem);
}

// Function to update the total odds and potential winnings
function updateOddsAndWinnings() {
    totalOdds = selectedBets.reduce((acc, bet) => acc * bet.odd, 1).toFixed(2);
    totalOddsElement.textContent = totalOdds;

    const betAmount = parseFloat(betAmountInput.value) || 0;
    const potentialWinnings = (totalOdds * betAmount).toFixed(2);
    potentialWinningsElement.textContent = potentialWinnings;
}

// Event listener for odd buttons
oddButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'selected' class from all buttons
        oddButtons.forEach(btn => btn.classList.remove('selected'));
        // Add 'selected' class to clicked button
        button.classList.add('selected');

        // Get match details and odd
        const match = button.getAttribute('data-match');
        const odd = parseFloat(button.getAttribute('data-odd'));

        // Clear the current bet slip and update with new bet
        betList.innerHTML = '';
        selectedBets = [{ match, odd }];
        addBetToSlip(match, odd);

        // Update total odds and potential winnings
        updateOddsAndWinnings();
    });
});

// Event listener for bet amount input
betAmountInput.addEventListener('input', updateOddsAndWinnings);

// Event listener for place bet button
placeBetButton.addEventListener('click', () => {
    if (selectedBets.length === 0) {
        alert('Please select a bet!');
        return;
    }

    const betAmount = parseFloat(betAmountInput.value);
    if (!betAmount || betAmount <= 0) {
        alert('Please enter a valid bet amount!');
        return;
    }

    alert(`Bet placed successfully!\nTotal Odds: ${totalOdds}\nPotential Winnings: ${potentialWinningsElement.textContent}`);
    // Reset the form
    betList.innerHTML = '';
    selectedBets = [];
    betAmountInput.value = '';
    totalOddsElement.textContent = '0';
    potentialWinningsElement.textContent = '0';
});
