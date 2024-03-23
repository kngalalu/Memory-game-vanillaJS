class MemoryGame {
  constructor(cards) {
    this.cards = cards;
  }
  done = false;
  lockBoard = false;
  cardOne = null;
  cardTwo = null;
  count = 0;
  clicks = 0;
  unclick = 0;
  flipCard(card) {
    this.clicks++;
    if (this.lockBoard === true || card === this.cardOne) {
      this.unclick++;
      return;
    }

    card.classList.add("flip");
    document.getElementById("clicks").innerHTML = this.clicks - this.unclick;

    if (this.cardOne === null) {
      this.cardOne = card;
    } else {
      this.cardTwo = card;
      this.checkForMatch(this.cardOne, this.cardTwo);
    }
  }

  unFlipCards() {
    this.lockBoard = true;
    setTimeout(() => {
      this.cardOne.classList.remove("flip");
      this.cardTwo.classList.remove("flip");

      this.cardOne = null;
      this.cardTwo = null;
      this.lockBoard = false;
    }, 800);
  }

  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      let randomPosition = Math.floor(Math.random() * this.cards.length);
      this.cards[i].style.order = randomPosition;
    }
  }

  checkForMatch(card1, card2) {
    if (card1.getAttribute("data-image") === card2.getAttribute("data-image")) {
      this.count += 1;
      card1.style.pointerEvents = "none";
      card2.style.pointerEvents = "none";

      this.cardOne.removeEventListener("click", this.flipCard);
      this.cardTwo.removeEventListener("click", this.flipCard);

      this.cardOne = null;
      this.cardTwo = null;
      this.lockBoard = false;
    } else {
      this.unFlipCards();
    }
  }

  gameTimer() {
    let time = 0;
    let timer = setInterval(function () {
      if (game.count === cardArray.length / 2) {
        clearInterval(timer);
        if (
          alert(
            `Well Done!! \n\ntook you: ${time} seconds to complete \n\nMoves: ${game.clicks}`
          )
        ) {
        } else {
          window.location.reload();
        }
      }
      time++;
      document.getElementById("time-passed").innerHTML = time;
    }, 1000);
  }

  board(arr, grid) {
    for (let i = 0; i < arr.length; i++) {
      let div = document.createElement("div");
      div.className = "card";
      let back = document.createElement("img");
      back.className = "back";
      back.src = arr[i].img;
      let front = document.createElement("img");
      front.className = "front";
      front.src = "../images/blank.png";

      div.setAttribute("data-image", arr[i].name);

      div.appendChild(back);
      div.appendChild(front);
      grid.appendChild(div);
    }
  }

  startGame() {
    const cardsArray = [
      { name: "cat", img: "../images/1.jpg" },
      { name: "monkey", img: "../images/2.jpg" },
      { name: "bird", img: "../images/3.jpg" },
      { name: "rabbit", img: "../images/4.jpg" },
      { name: "lion", img: "../images/5.jpg" },
      { name: "dog", img: "../images/6.jpg" },
      { name: "deer", img: "../images/7.jpg" },
      { name: "zebra", img: "../images/8.jpg" },
    ];

    let grid = document.querySelector(".board");
    grid.innerHTML = "";
    const selectedLevel = document.getElementById("level");

    if (typeof window !== "undefined") {
      if (window.sessionStorage.getItem("autosave")) {
        selectedLevel.value = window.sessionStorage.getItem("autosave");
      }

      selectedLevel.addEventListener("change", function () {
        window.sessionStorage.setItem("autosave", selectedLevel.value);
      });
    }

    const level = selectedLevel.value;

    let difficulty;

    if (level === "easy") {
      difficulty = 2;
    } else if (level === "medium") {
      difficulty = 3;
    } else if (level === "hard") {
      difficulty = 8;
    }

    const cardsArray2 = [...cardsArray];

    let selectedCards = cardsArray2.slice(0, difficulty);
    selectedCards = selectedCards.concat(selectedCards);
    if (selectedCards.length / 2 < 5) {
      document.documentElement.style.setProperty(
        `--value`,
        selectedCards.length / 2
      );
      if ((selectedCards.length/2) % 2 !== 0) {
        document.documentElement.style.setProperty("--oddGrid", `${150}px`);
      }
    }

    this.board(selectedCards, grid);
    return false;
  }
}

new MemoryGame().startGame();
const cardArray = document.querySelectorAll(".card");
const game = new MemoryGame(cardArray);
game.shuffle();
game.gameTimer();

for (let i = 0; i < cardArray.length; i++) {
  cardArray[i].addEventListener("click", () => {
    game.flipCard(cardArray[i]);
  });
}

module.export = { game };
