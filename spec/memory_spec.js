const { JSDOM } = require("jsdom");
const fs = require("fs");
const index = fs.readFileSync("./index.html");
const { document } = new JSDOM(index).window;
global.document = document;
const { game } = require("../src/main");


describe("MemoryGame", () => {
    it("should check if the checkForMatch method is called within the flipCard method", () => {
        spyOn(game, "checkForMatch");
        game.flipCard(game.cards[0]);
        game.flipCard(game.cards[1]);
        expect(game.checkForMatch).toHaveBeenCalledTimes(1);
    });
});

describe("flipCard", () => {
    it("should add flip class to the div clicked", () => {
        game.flipCard(game.cards[0]);
        expect(game.cards[0].classList[1]).toBe("flip");
    });
});

describe("gameTimer function", () => {
    it("should call the setInterval for game timer", () => {
        spyOn(global, "setInterval");
        game.gameTimer();
        expect(global.setInterval).toHaveBeenCalled();
    });
});

describe("Number of Flips", () => {
    it("should increment when a card is clicked.", () => {
        game.clicks = 0;
        game.flipCard(game.cards[0]);
        expect(game.clicks).toBe(1);
    });
});

describe("grid", () => {
    it("should check if the board method is called in startGame method", () => {
        spyOn(game, "board");
        document.getElementById("level").value === "medium";
        game.startGame();
        expect(game.board).toHaveBeenCalled();
    });
});