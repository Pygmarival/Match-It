const levels = [
  {
    level: 1,
    description: "Artistic Expression",
    cardData: [
      { id: 1, name: "Okami", image: "image/bbj.jpg" },
      { id: 1, name: "Sumi-e", image: "path/to/boodah-image.jpg" },
      { id: 2, name: "Gris", image: "path/to/other-game-image.jpg" },
      { id: 2, name: "Surréalisme", image: "path/to/other-art-image.jpg" },
      { id: 3, name: "Journay", image: "path/to/other-game-image.jpg" },
      { id: 3, name: "Mandalas de sable", image: "path/to/other-art-image.jpg" },
      { id: 4, name: "Cuphead", image: "path/to/other-game-image.jpg" },
      { id: 4, name: "Animation de 90", image: "path/to/other-art-image.jpg" },
      { id: 5, name: "Shadow of coossus", image: "path/to/other-game-image.jpg" },
      { id: 5, name: "Sculpture monumentale", image: "path/to/other-art-image.jpg" },
      { id: 6, name: "Zelda: Breath of wild", image: "path/to/other-game-image.jpg" },
      { id: 6, name: "Impressionisme", image: "path/to/other-art-image.jpg" },
      { id: 7, name: "The Last of Us", image: "path/to/other-game-image.jpg" },
      { id: 7, name: "Realisme", image: "path/to/other-art-image.jpg" },
      { id: 8, name: "Monument valley", image: "path/to/other-game-image.jpg" },
      { id: 8, name: "Construction d'Escher", image: "path/to/other-art-image.jpg" },
      // More pairs...
    ],
    explanations: {
      1: "Okami s'inspire directement de la peinture japonaise à l'encre, en utilisant des coups de pinceau et des visuels inspirés par l'encre dans son style artistique. La mécanique de jeu où l’on “peint” pour résoudre des énigmes reflète l'importance de la simplicité et du mouvement dans le Sumi-e, rendant ainsi hommage à cette forme d'art.",
      2: "Gris explore le deuil à travers des paysages surréalistes et des environnements abstraits, tout comme les peintures surréalistes traditionnelles. Ses visuels fluides et abstraits créent une expérience surréaliste, suscitant des émotions par des formes et des couleurs plutôt que des représentations littérales, à la manière des maîtres surréalistes.",
      3: "Journey présente un vaste paysage désertique où les joueurs traversent un monde mystérieux, semblable aux mandalas de sable temporaires créés dans certaines cultures pour représenter l'impermanence. Les visuels et les thèmes du jeu correspondent à l'idée de l'art comme expérience éphémère, où les joueurs laissent leur marque avant de lâcher prise, tout comme les mandalas.",
      4: "Cuphead s'inspire directement du style des dessins animés américains des années 1930, qui étaient déjà une forme d'art en soi. Le style d'animation dessinée à la main, les personnages au style *caoutchouc* et l'esthétique vintage du jeu rappellent une époque révolue de l'animation qui était novatrice en expression artistique",
      5: "Les colosses dans Shadow of the Colossus ressemblent à des sculptures monumentales qui inspirent le respect et la grandeur. Tout comme les sculptures monumentales sont créées pour susciter la révérence, ces figures gigantesques dans le jeu deviennent des œuvres d'art mouvantes, brouillant la frontière entre le vivant et la pierre.",
      6: "Les paysages luxuriants de ce jeu et la manière douce dont il rend la lumière et la nature évoquent l'art impressionniste. Breath of the Wild invite les joueurs à explorer des mondes vastes et atmosphériques, remplis de lumière changeante, de météo variable et de beauté naturelle, reflétant l*intérêt des impressionnistes pour capturer des moments fugaces dans la nature.",
      7: "La représentation réaliste des émotions, des environnements et de la complexité morale dans The Last of Us est semblable au mouvement réaliste en art, qui cherchait à dépeindre la vie telle qu'elle est, avec toutes ses vérités brutes et parfois dures. Le jeu met en avant le développement authentique des personnages et la lutte humaine, en accord avec l'engagement des artistes réalistes à refléter des expériences vraies.",
      8: "Inspiré par les œuvres de M.C. Escher, Monument Valley transforme les illusions d'optique en gameplay, permettant aux joueurs de traverser une architecture apparemment impossible. Les conceptions surréalistes d'Escher et ses perspectives déconcertantes se reflètent directement dans ce jeu, transformant les astuces visuelles en art interactif",
      // More explanations...
    },
  },
  {
    level: 2,
    description: "Emotional Impact",
    cardData: [
      { id: 3, name: "Game Title 1", image: "path/to/game1-image.jpg" },
      { id: 3, name: "Art Title 1", image: "path/to/art1-image.jpg" },
      // More pairs...
    ],
    explanations: {
      3: "Game Title 1 evokes emotions similar to Art Title 1.",
      // More explanations...
    },
  },
  // Additional levels...
];

let shuffledCards = [];
let flippedCards = [];
let moveCount = 0;
let matchedPairs = 0;
let currentLevelIndex = 0;
let totalPairs = 0;

// Elements
const cardGrid = document.querySelector(".card-grid");
const movesCounter = document.getElementById("moves");
const explanationContainer = document.getElementById("explanation-container");

// Sound Effects
const matchSound = new Audio('song/the-correct-answer-33-183620.mp3');
const mismatchSound = new Audio('song/wrong-answer-21-199825.mp3');
const flipSound = new Audio('song/SWSH_Sword that cuts (ID 0127)_BSB.wav');

// Background music for each level
const levelMusic = [
  new Audio('song/puzzle-loop-67641.mp3'),
  new Audio('song/puzzle-loop-67641.mp3'),
  // Add more levels as needed
];

let currentMusic;

// Initialize game
function initGame() {
  const currentLevel = levels[currentLevelIndex];
  
  // Stop previous level's music if any
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }

  // Set up and play new level's music
  currentMusic = levelMusic[currentLevelIndex];
  currentMusic.volume = 0.2; // Lower volume for background music
  currentMusic.loop = true;
  currentMusic.play();

  shuffledCards = shuffleCards([...currentLevel.cardData]);
  totalPairs = currentLevel.cardData.length / 2;
  createCardElements();
  movesCounter.textContent = 0;
  moveCount = 0;
  matchedPairs = 0;

  // Show all cards for 2 seconds, then hide
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.add("flipped"); // Show all cards
  });

  setTimeout(() => {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("flipped"); // Hide the cards after 2 seconds
    });
  }, 5000); // 2 seconds delay to initially reveal cards
}
document.getElementById('startGame').addEventListener('click', function() {
  initGame(); // Start the game and play music
  this.textContent = 'Restart Game'; // Change button text
});


// Shuffle cards
function shuffleCards(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create card elements dynamically and add click event listeners
function createCardElements() {
  cardGrid.innerHTML = ""; // Clear any previous cards
  const currentLevel = levels[currentLevelIndex];

  shuffledCards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;

    // Inner HTML for the card's front and back
    cardElement.innerHTML = `
      <div class="card-face card-front">
        <img src="${card.image}" alt="${card.name}" class="card-image">
        <span>${card.name}</span>
      </div>
      <div class="card-face card-back">
        <p>by Valentin</p> <!-- Displaying the name on the back face -->
      </div>
    `;
    cardElement.addEventListener("click", handleCardClick);
    cardGrid.appendChild(cardElement);
  });
}

// Handle card click
function handleCardClick(e) {
  const clickedCard = e.currentTarget;

  // Ignore click if the card is already flipped or two cards are already flipped
  if (clickedCard.classList.contains("flipped") || flippedCards.length === 2) {
    return;
  }

  flipSound.currentTime = 0; // Reset to start in case of rapid clicks
  flipSound.play(); // Play flip sound

  clickedCard.classList.add("flipped");
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    moveCount++;
    movesCounter.textContent = moveCount;
    checkForMatch();
  }
}

// Check if the two flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.id === card2.dataset.id;

  if (isMatch) {
    matchedPairs++;
    matchSound.play(); // Play match sound
    card1.classList.add('glow'); // Add glow effect
    card2.classList.add('glow'); // Add glow effect
    setTimeout(() => displayMatchExplanation(card1.dataset.id), 600);
    checkGameComplete();
  } else {
    mismatchSound.play(); // Play mismatch sound
    setTimeout(resetFlippedCards, 1000);
  }
}

// Display match explanation and video link
function displayMatchExplanation(matchId) {
  const currentLevel = levels[currentLevelIndex];
  const explanationText = currentLevel.explanations[matchId];

  const explanationCard = document.createElement("div");
  explanationCard.classList.add("explanation-card");
  explanationCard.innerHTML = `
    <p>${explanationText}</p>
    <button onclick="playExplanationVideo()">Watch Video</button>
    <button onclick="closeExplanation()">Got it!</button>
  `;

  // Clear previous explanations and append the explanation card
  explanationContainer.innerHTML = ""; 
  explanationContainer.appendChild(explanationCard);
}

// Function to close the explanation card
function closeExplanation() {
  const explanationCard = document.querySelector(".explanation-card");
  if (explanationCard) {
    explanationContainer.removeChild(explanationCard); // Clear the explanation card
  }
  flippedCards = []; // Reset flipped cards
  // Check if all pairs are matched before showing next level confirmation
  if (matchedPairs < totalPairs) {
    resetFlippedCards(); // Just reset flipped cards without showing next level
  } else {
    displayNextLevelConfirmation(); // Show next level confirmation if all pairs are matched
  }
}

// Play a video for further visual explanation
function playExplanationVideo() {
  alert("Video plays here: An artistic comparison between video games and traditional art.");
}

// Reset flipped cards if they don’t match
function resetFlippedCards() {
  flippedCards.forEach((card) => card.classList.remove("flipped"));
  flippedCards = [];
}

// Check if the game is complete
function checkGameComplete() {
  if (matchedPairs === totalPairs) {
    setTimeout(() => {
      displayNextLevelConfirmation(); // Show next level confirmation only after completing all pairs
    }, 500);
  }
}

// Display next level confirmation card
function displayNextLevelConfirmation() {
  const nextLevelCard = document.createElement("div");
  nextLevelCard.classList.add("next-level-card");
  nextLevelCard.innerHTML = `
    <p>Level complete! You finished with ${moveCount} moves.</p>
    <p>Now progressing to the next level: ${levels[currentLevelIndex + 1]?.description || "Congratulations! You completed all levels!"}.</p>
    <button onclick="continueToNextLevel()">Continue</button>
  `;

  explanationContainer.innerHTML = ""; // Clear previous content
  explanationContainer.appendChild(nextLevelCard);
}

// Function to continue to the next level
function continueToNextLevel() {
  const nextLevelCard = document.querySelector(".next-level-card");
  if (nextLevelCard) {
    explanationContainer.removeChild(nextLevelCard);
  }

  // Increment the level index and check if we should continue
  currentLevelIndex++;
  if (currentLevelIndex < levels.length) {
    initGame(); // Re-initialize the game for the next level
  } else {
    // Optionally, reset the game or provide an option to play again
    const completionCard = document.createElement("div");
    completionCard.classList.add("next-level-card");
    completionCard.innerHTML = `
      <p>Congratulations! You completed all levels!</p>
      <button onclick="resetGame()">Play Again</button>
    `;
    explanationContainer.innerHTML = ""; // Clear previous content
    explanationContainer.appendChild(completionCard);
  }
}

// Function to reset the game
function resetGame() {
  // Reset the game state
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }

  currentLevelIndex = 0; // Reset level index
  flippedCards = []; // Clear flipped cards
  matchedPairs = 0; // Reset matched pairs
  initGame(); // Start from level 1
}

// Start the game on page load
window.addEventListener("load", initGame);
