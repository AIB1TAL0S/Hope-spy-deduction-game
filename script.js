let players = [];
let stories = {
    easy: [
        "Creation (Genesis 1)",
        "Noah’s Ark (Genesis 6–9)",
        "David and Goliath (1 Samuel 17)",
        "Daniel in the Lion’s Den (Daniel 6)",
        "Jonah and the Whale (Jonah 1–2)",
        "Moses and the Red Sea (Exodus 14)",
        "The Good Samaritan (Luke 10:25–37)",
        "The Prodigal Son (Luke 15:11–32)",
        "Jesus Feeds the 5,000 (John 6:1–14)",
        "The Tower of Babel (Genesis 11:1–9)"
    ],
    medium: [
        "Elijah and the Prophets of Baal (1 Kings 18)",
        "Shadrach, Meshach, and Abednego (Daniel 3)",
        "Samson and Delilah (Judges 16)",
        "The Battle of Jericho (Joshua 6)",
        "Elisha and the Widow’s Oil (2 Kings 4:1–7)",
        "Jonah Preaches to Nineveh (Jonah 3)",
        "Hezekiah’s Prayer and the Angel (2 Kings 19)",
        "Joseph Interprets Pharaoh’s Dream (Genesis 41)",
        "Gideon and the 300 Men (Judges 7)",
        "The Healing of Naaman (2 Kings 5)"
    ],
    hard: [
        "Hannah’s Prayer for a Child (1 Samuel 1)",
        "Mephibosheth and David’s Kindness (2 Samuel 9)",
        "The Floating Axe Head (2 Kings 6:1–7)",
        "The Blinding of the Arameans (2 Kings 6:8–23)",
        "Jael and Sisera (Judges 4:17–22)",
        "Ehud and Eglon (Judges 3:12–30)",
        "The Bronze Serpent (Numbers 21:4–9)",
        "Ananias and Sapphira (Acts 5:1–11)",
        "The Sun Stands Still (Joshua 10:12–14)",
        "The Fiery Chariot (2 Kings 2:1–12)"
    ]
};


let impostor = null;
let currentConcept = "";

// Add player
function addPlayer() {
    const nameInput = document.getElementById("playerName");
    const name = nameInput.value.trim();
    if (name && !players.includes(name)) {
        players.push(name);
        updatePlayerList();
        nameInput.value = "";
    }
}

// Update player list UI
function updatePlayerList() {
    const list = document.getElementById("playerList");
    list.innerHTML = "";
    players.forEach((p, index) => {
        const li = document.createElement("li");
        li.textContent = p;
        li.style.animationDelay = `${index * 0.05}s`;
        list.appendChild(li);
    });
}

// Start a new round
function startRound() {
    if (players.length < 3) {
        alert("Add at least 3 players to start!");
        return;
    }

    // Get selected category
    const categorySelect = document.getElementById("category");
    const selectedCategory = categorySelect.value;

    // Choose impostor
    impostor = players[Math.floor(Math.random() * players.length)];

    // Choose concept from selected category
    const categoryStories = stories[selectedCategory];
    currentConcept = categoryStories[Math.floor(Math.random() * categoryStories.length)];

    // Generate cards
    const container = document.getElementById("cardsContainer");
    container.innerHTML = "";

    // Shuffle players for random card order
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

    shuffledPlayers.forEach((p, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Store timeout ID to prevent multiple timers
        let flipTimeout = null;
        
        card.onclick = () => {
            // Clear any existing timeout
            if (flipTimeout) {
                clearTimeout(flipTimeout);
                flipTimeout = null;
            }
            
            // If card is not flipped, flip it
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
            
            // Automatically flip back after 3 seconds
            flipTimeout = setTimeout(() => {
                card.classList.remove("flipped");
                flipTimeout = null;
            }, 3000);
        };

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        const playerName = document.createElement("div");
        playerName.textContent = p;
        playerName.style.fontSize = "1.3rem";
        cardFront.appendChild(playerName);

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        
        if (p === impostor) {
            cardBack.innerHTML = '<span style="font-size: 2rem; opacity: 0.7;">❓</span><br><strong style="margin-top: 0.5rem; display: block;">You are the Impostor!</strong>';
        } else {
            cardBack.textContent = currentConcept;
        }

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        container.appendChild(card);
    });
}
