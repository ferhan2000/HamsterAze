document.addEventListener("DOMContentLoaded", function () {
    const balanceElement = document.getElementById("balance");
    const betAmountElement = document.getElementById("bet-amount");
    const multiplierElement = document.getElementById("multiplier");
    const betButton = document.getElementById("bet-button");
    const increaseImg = document.getElementById("increase-img");
    const cashoutButton = document.getElementById("cashout-button");
    const decreaseBetButton = document.getElementById("decrease-bet");
    const increaseBetButton = document.getElementById("increase-bet");

    let balance = 100;
    let betAmount = 10;
    let multiplier = 0.1;
    let gameActive = false;

    betButton.addEventListener("click", function () {
        if (gameActive) return;

        gameActive = true;
        multiplier = 0.1;
        multiplierElement.textContent = multiplier.toFixed(1);
        balance -= betAmount;
        balanceElement.textContent = balance.toFixed(2);

        betButton.disabled = true;
        increaseImg.src = "second-image.png";
        cashoutButton.disabled = false;

        const crashTime = Math.floor(Math.random() * 8000) + 2000;

        setTimeout(() => {
            if (gameActive) {
                gameActive = false;
                increaseImg.src = "first-image.png";
                cashoutButton.disabled = true;
                multiplier = 0.1;
                multiplierElement.textContent = multiplier.toFixed(1);
                alert("Oops! The game crashed. You lost your bet.");
                betButton.disabled = false;
            }
        }, crashTime);
    });

    increaseImg.addEventListener("click", function () {
        if (!gameActive) return;

        multiplier += 0.1;
        multiplierElement.textContent = multiplier.toFixed(1);

        if (increaseImg.src.includes("first-image.png")) {
            increaseImg.src = "second-image.png";
        } else {
            increaseImg.src = "first-image.png";
        }
    });

    cashoutButton.addEventListener("click", function () {
        if (!gameActive) return;

        gameActive = false;
        cashoutButton.disabled = true;
        const winnings = betAmount * multiplier;
        balance += winnings;
        balanceElement.textContent = balance.toFixed(2);
        multiplierElement.textContent = "0.1";
        alert(`You cashed out at x${multiplier.toFixed(1)} and won $${winnings.toFixed(2)}!`);
        betButton.disabled = false;
        increaseImg.src = "first-image.png";
    });

    decreaseBetButton.addEventListener("click", function () {
        if (betAmount > 1) {
            betAmount--;
            updateBetAmount();
        }
    });

    increaseBetButton.addEventListener("click", function () {
        betAmount++;
        updateBetAmount();
    });

    function updateBetAmount() {
        betAmountElement.textContent = betAmount;
    }
});
