document.addEventListener("DOMContentLoaded", function () {
    const balanceElement = document.getElementById("balance");
    const betAmountElement = document.getElementById("bet-amount");
    const multiplierElement = document.getElementById("multiplier");
    const betButton = document.getElementById("bet-button");
    const increaseImg = document.getElementById("increase-img"); // Changed to image element
    const cashoutButton = document.getElementById("cashout-button");

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
        increaseImg.src = "second-image.png"; // Change image source on bet click
        cashoutButton.disabled = false;

        // Randomly set when the game will crash (between 2 to 10 seconds)
        const crashTime = Math.floor(Math.random() * 8000) + 2000;

        setTimeout(() => {
            if (gameActive) {
                gameActive = false;
                increaseImg.src = "first-image.png"; // Reset image on game crash
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

        // Toggle between first-image.png and second-image.png on each click
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
        alert(You cashed out at x${multiplier.toFixed(1)} and won $${winnings.toFixed(2)}!);
        betButton.disabled = false;
        increaseImg.src = "first-image.png"; // Reset image on cash out
    });
});"
