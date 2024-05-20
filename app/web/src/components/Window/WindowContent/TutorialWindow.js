import React from "react";
import "./tutorial.css";
import { useTranslation } from "../../Utiles/Translations";
import Card from "../../gameTable/Card/Card";
import Button from "../../button/Button.tsx";
import BonusPanel from "../../gameTable/Bonus/BonusPanel";

const TutorialWindow = () => {
  const { getTranslatedWord } = useTranslation();
    /**
   * Formats a number to a readable string with commas.
   * @param {number} number - The number to format.
   * @returns {string} The formatted number.
   */
    const formatNumber = (number) => {
      return new Intl.NumberFormat().format(number);
    };
  return (
    <div className={`container-text-tutorial`}>
      <div className="text-tutorial">
        <h1>Texas Hold'em Poker</h1>

        <h2>Introduction</h2>
        <p>
          Texas Hold'em is the most popular variant of poker. It is played in
          casinos, online platforms, and home games worldwide. This tutorial
          will guide you through the basic rules, betting rounds, and strategies
          to get you started.
        </p>

        <h2>Objective</h2>
        <p>
          The goal of Texas Hold'em is to win chips by having the best five-card
          hand or by making other players fold before the showdown.
        </p>

        <h2>Setup</h2>
        <ul>
          <li>
            <strong>Deck</strong>: A standard 52-card deck.
          </li>
          <li>
            <strong>Players</strong>: Typically 2-10 players.
          </li>
          <li>
            <strong>Chips</strong>: Used for betting.
          </li>
        </ul>

        <h2>Basic Rules</h2>

        <h3>Hand Rankings</h3>
        <p>
          Understanding hand rankings is crucial. Here are the rankings from
          highest to lowest:
        </p>
        <ul>
          <li>
            <strong>Royal Flush</strong>: A, K, Q, J, 10 of the same suit.
          </li>
          <div className="cards-container">
            <Card styleClass={"handCard"} card={['A', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['K', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['Q', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['J', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['10', 'C']} flippingCard={true}/>
          </div>
          <li>
            <strong>Straight Flush</strong>: Five consecutive cards of the same
            suit.
          </li>
          <div className="cards-container">
            <Card styleClass={"handCard"} card={['A', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['2', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['3', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['4', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['5', 'H']} flippingCard={true}/>
          </div>
          <li>
            <strong>Four of a Kind</strong>: Four cards of the same rank.
          </li>
          <div className="cards-container">
            <Card styleClass={"handCard"} card={['A', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['A', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['A', 'D']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['A', 'S']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['K', 'C']} flippingCard={true}/>
          </div>
          <li>
            <strong>Full House</strong>: Three of a kind plus a pair.
          </li>
          <div className="cards-container">
            <Card styleClass={"handCard"} card={['A', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['A', 'D']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['A', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['K', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['K', 'C']} flippingCard={true}/>
          </div>
          <li>
          <strong>Flush</strong>: Five cards of the same suit.
          </li>
          <div className="cards-container">
            <Card styleClass={"handCard"} card={['A', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['K', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['Q', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['J', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['9', 'C']} flippingCard={true}/>
          </div>
          <li>
            <strong>Straight</strong>: Five consecutive cards of different suits.
          </li>
          <div className="cards-container">
            <Card styleClass={"handCard"} card={['5', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['6', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['7', 'D']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['8', 'S']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['9', 'C']} flippingCard={true}/>
          </div>
          <li>
            <strong>Three of a Kind</strong>: Three cards of the same rank.
          </li>
          <div className="cards-container">
            <Card styleClass={"handCard"} card={['A', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['A', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['A', 'D']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['9', 'S']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['K', 'C']} flippingCard={true}/> {/* Assume K as kicker */}
          </div>
          <li>
            <strong>Two Pair</strong>: Two different pairs.
          </li>
          <div className="cards-container">
            <Card styleClass={"handCard"} card={['A', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['A', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['K', 'D']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['K', 'S']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['Q', 'C']} flippingCard={true}/> {/* Assume Q as kicker */}
          </div>
          <li>
            <strong>One Pair</strong>: One pair of the same rank.
          </li>
          <div className="cards-container">
            <Card styleClass={"handCard"} card={['A', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['A', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['K', 'D']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['Q', 'S']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['J', 'C']} flippingCard={true}/> {/* Assume J as kicker */}
          </div>
          <li>
            <strong>High Card</strong>: The highest card when no other hand is made.
          </li>
          <div className="cards-container">
            <Card styleClass={"handCard"} card={['A', 'D']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['K', 'C']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['Q', 'H']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['J', 'S']} flippingCard={true}/>
            <Card styleClass={"handCard"} card={['9', 'C']} flippingCard={true}/>
          </div>
        </ul>

        <h3>Betting Actions</h3>
        <p>
          During a game of Texas Hold'em, players have several betting options:
        </p>
        <div className="container-ActionButtonsDemo">
          <div className="container-gameAction">
        <div className="container-cashSituation">
          <div className="userCoinCashs">
            {getTranslatedWord("gameActionPanel.currentSC")}:{" "}
            {formatNumber(10000)}
          </div>
              <div className="userCoinCashs">
                {getTranslatedWord("gameActionPanel.afterSC")}:{" "}
                {formatNumber(9000)}
              </div>
                <div className="userCoinCashs">
                  {getTranslatedWord("gameActionPanel.totalRaise")}:{" "}
                  {formatNumber(500)}+{formatNumber(1000)}
                </div>
        </div>
            <div className="container-raiseButtons">
              <Button
                styleClass={"btn-mainAction"}
                label={"Min"}
              />
              <Button
                styleClass={"btn-mainAction"}
                label={"1/4"}
              />
              <Button
                styleClass={"btn-mainAction"}
                label={"1/2"}
              />
              <Button
                styleClass={"btn-mainAction"}
                label={"3/4"}
              />
              <Button
                styleClass={"btn-mainAction"}
                label={"All in"}
              />
            </div>
            <div className={`container-raiseAdjuster`}>
              <Button
                styleClass="btn-raiseDecrement"
                label={"−"}
              />
              <input
                type="text"
                className="raiseValueDisplay"
                value={10000}
              />
              SC
              <Button
                styleClass="btn-raiseIncrement"
                label={"+"}
              />
            </div>
        <div className={`container-ActionButtons`}>
          <Button
            styleClass={`btn-mainAction raise`}
            label={`${getTranslatedWord("gameActionPanel.raise")}`}
          />
          <Button
            styleClass={`btn-mainAction`}
            label={getTranslatedWord("gameActionPanel.check")}
          />
          <Button
            styleClass={`btn-fold btn-mainAction`}
            label={getTranslatedWord("gameActionPanel.fold")}
          />
        </div>
      </div>
      </div>
        <p>Here's what each action means:</p>
        <ul>
          <li>
            <strong>Fold</strong>: Give up the hand and all the bets you've made
            so far.
          </li>
          <li>
            <strong>Check/Call</strong>: Match the current highest bet or pass
            if no bet has been made.
          </li>
          <li>
            <strong>Raise</strong>: Increase the bet amount, forcing others to
            meet the new bet.
          </li>
        </ul>
        <h2>Strategy Tips</h2>

        <h3>Starting Hands</h3>
        <ul>
          <li>
            Play strong starting hands (e.g., high pairs, suited connectors).
          </li>
          <li>
            Avoid weak hands (e.g., low unsuited cards) unless in the right
            position.
          </li>
        </ul>

        <h3>Position</h3>
        <ul>
          <li>
            Being in a later position allows you to see how opponents act before
            you make your move.
          </li>
          <li>Use your position to control the pot and gain information.</li>
        </ul>

        <h3>Bluffing</h3>
        <ul>
          <li>Bluff occasionally to keep opponents guessing.</li>
          <li>
            Ensure your bluffs are convincing and in line with previous actions.
          </li>
        </ul>

        <h3>Pot Odds</h3>
        <ul>
          <li>
            Calculate pot odds to determine if calling a bet is profitable in
            the long run.
          </li>
        </ul>

        <h2>Common Terms</h2>
        <ul>
          <li>
            <strong>Blind</strong>: Forced bet to ensure there is money in the
            pot.
          </li>
          <li>
            <strong>Community Cards</strong>: Cards dealt face up in the center
            of the table.
          </li>
          <li>
            <strong>Kicker</strong>: An unpaired card that can determine the
            winner if players have similar hands.
          </li>
          <li>
            <strong>Pot</strong>: The total amount of chips bet in a hand.
          </li>
        </ul>

        <h2>Special Features of Our App</h2>
        <p>
          Our Texas Hold'em app includes several unique features that enhance
          your playing experience and allow for deeper strategic play.
        </p>

        <h3>Revealing Your Cards</h3>
        <p>
          Unlike traditional games, our app gives you the ability to reveal one
          or both of your hole cards at any point during the hand. This option
          can be used to:
        </p>
        <ul>
          <li>
            <strong>Bluff or Mislead:</strong> Showing one card can create a
            misleading impression about the strength of your hand, influencing
            your opponents' actions.
          </li>
          <li>
            <strong>Show Strength or Weakness:</strong> You can choose to show a
            strong card to scare off competitors or a weaker card to bait them
            into betting more.
          </li>
        </ul>
        <div className="card-reveal-section">
          <div className="container-handMainDemo">
            <div className="container-showCardsButtons">
              <Button
                styleClass={"btn-showCard"}
                label={"Show A of"}
                iconSrc={"static/media/assets/images/icons/white/heart.png"}
              />
              <Button
                styleClass={"btn-showCard"}
                label={"Show A of"}
                iconSrc={"static/media/assets/images/icons/white/spade.png"}
              />
              <Button
                styleClass={"btn-showCard"}
                label={getTranslatedWord("handGuide.showB")}
              />
            </div>
              <div className="container-handCardDemo">
                <Card
                  styleClass="handCard"
                  card={["A","S"]}
                  flippingCard={true}
                />
                <Card
                  styleClass="handCard"
                  card={["A","H"]}
                  flippingCard={true}
                />
            </div>
          </div>
        </div>
        <p>
          This feature is particularly useful for adding an extra layer of
          strategy and psychological warfare to the game. It's a powerful tool
          that should be used wisely as it can significantly impact the outcome
          of the hand.
        </p>

        <h3>Bonus Feature</h3>
        <p>
          Throughout the game, our Bonus system tracks the number of Spades,
          Hearts, Diamonds, and Clubs you collect. Once you have at least two of
          each suit, you can activate the bonus. This powerful feature forces
          every player to contribute an additional 50 SC (the currency of our
          app) to the pot, potentially changing the dynamics of the game
          significantly.
        </p>

        <div className="bonus-feature-section">
            <BonusPanel/>
        </div>

        <h2>Practice</h2>
        <p>To get better at Texas Hold'em:</p>
        <ul>
          <li>
            <strong>Play Regularly</strong>: Experience is the best teacher.
          </li>
          <li>
            <strong>Study the Game</strong>: Read books and watch videos on
            poker strategy.
          </li>
          <li>
            <strong>Review Hands</strong>: Analyze your play and learn from
            mistakes.
          </li>
        </ul>

        <h3>Example Hand</h3>
        <div className="highlight">
          <p>
            <strong>Pre-Flop</strong>: You are dealt&nbsp;
            <div className="cards-container">
              <Card styleClass={"handCard small"} card={['1', 'S']} flippingCard={true}/>
              <Card styleClass={"handCard small"} card={['K', 'S']} flippingCard={true}/>
            </div>
            . You raise, and two players call.
          </p>

          <p>
            <strong>Flop</strong>: The dealer reveals&nbsp;
            <div className="cards-container">
              <Card styleClass={"handCard small"} card={['10', 'S']} flippingCard={true}/>
              <Card styleClass={"handCard small"} card={['J', 'S']} flippingCard={true}/>
              <Card styleClass={"handCard small"} card={['2', 'C']} flippingCard={true}/>
            </div>
            . You have a flush draw and a straight draw.
          </p>
          <p>
            <strong>Betting</strong>: You bet, one player raises, and the other
            folds. You call.
          </p>
          <p>
            <strong>Turn</strong>: The dealer reveals&nbsp;
            <div className="cards-container">
              <Card styleClass={"handCard small"} card={['Q', 'S']} flippingCard={true}/>
            </div>
            , completing your flush and straight.
          </p>
          <p>
            <strong>Betting</strong>: You bet, and the opponent calls.
          </p>
          <p>
            <strong>River</strong>: The dealer reveals&nbsp;
            <div className="cards-container">
              <Card styleClass={"handCard small"} card={['3', 'D']} flippingCard={true}/>
            </div>
          </p>
          <p>
            <strong>Betting</strong>: You bet again, and the opponent raises.
            You re-raise, and the opponent calls.
          </p>
          <p>
            <strong>Showdown</strong>: You reveal your&nbsp;
            <div className="cards-container">
              <Card styleClass={"handCard small"} card={['A', 'S']} flippingCard={true}/>
              <Card styleClass={"handCard small"} card={['K', 'S']} flippingCard={true}/>
            </div>

            , winning with an Ace-high flush.
          </p>
        </div>

        <p>
          * Texas Hold'em is a game of skill, strategy, and a bit of luck. By
          understanding the rules, practicing regularly, and learning from each
          hand, you can improve and enjoy this exciting game. Happy playing!
        </p>
      </div>
    </div>
  );
};

export default TutorialWindow;
