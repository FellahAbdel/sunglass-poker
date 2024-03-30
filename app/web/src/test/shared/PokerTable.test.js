import PokerTable from "../../shared/PokerTable";

describe("PokerTable", () => {
  let pokerTable;

  beforeEach(() => {
    pokerTable = new PokerTable();
  });

  test("should initialize with an empty community cards array", () => {
    expect(pokerTable.communityCards).toEqual([]);
  });

  test("showCommunityCards() should log community cards to console", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    pokerTable.communityCards = [
      { value: "A", suit: "C" },
      { value: "3", suit: "H" },
      { value: "7", suit: "D" },
    ];

    pokerTable.showCommunityCards();

    expect(consoleSpy).toHaveBeenCalledWith("Community cards:");
    expect(consoleSpy).toHaveBeenCalledWith("A of C");
    expect(consoleSpy).toHaveBeenCalledWith("3 of H");
    expect(consoleSpy).toHaveBeenCalledWith("7 of D");

    consoleSpy.mockRestore();
  });
});
