document.addEventListener('DOMContentLoaded', function() {
    // Create the Deadpool element
    const deadpool = document.createElement('div');
    deadpool.className = 'hidden-deadpool';
    document.body.appendChild(deadpool);

    // Initialize score
    let score = 0;
    let isGameActive = true;

    // Create game toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'game-toggle';
    toggleButton.textContent = 'Disable Deadpool Game';
    document.body.appendChild(toggleButton);

    // Function to get random position
    function getRandomPosition() {
        const maxX = window.innerWidth - 80;  // 80px is deadpool width
        const maxY = window.innerHeight - 80; // 80px is deadpool height
        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        };
    }

    // Function to move Deadpool
    function moveDeadpool() {
        // Fade out
        deadpool.style.opacity = '0';
        
        // Wait for fade out, then move and fade in
        setTimeout(() => {
            const pos = getRandomPosition();
            deadpool.style.left = pos.x + 'px';
            deadpool.style.top = pos.y + 'px';
            deadpool.style.opacity = '1';
        }, 300);
    }

    // Initial position
    moveDeadpool();

    // Click handler for Deadpool
    deadpool.addEventListener('click', function(event) {
        if (!isGameActive) return;
        
        // Calculate relative position for confetti
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
        
        // Trigger confetti at click position with Deadpool colors
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y },
            colors: ['#FF0000', '#000000', '#FFFFFF', '#8B0000']  // Deadpool's red, black, and white colors
        });

        // Move to new position
        moveDeadpool();
        
        // Increment score
        score++;
    });

    // Toggle game state
    toggleButton.addEventListener('click', function() {
        isGameActive = !isGameActive;
        if (isGameActive) {
            deadpool.classList.remove('hidden');
            toggleButton.textContent = 'Disable Deadpool Game';
            toggleButton.classList.remove('disabled');
        } else {
            deadpool.classList.add('hidden');
            toggleButton.textContent = 'Enable Deadpool Game';
            toggleButton.classList.add('disabled');
        }
    });
});
