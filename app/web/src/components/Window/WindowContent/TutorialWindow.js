// TutorialWindow.jsx
import React from "react";
import "./tutorial.css";
import { useTranslation } from "../../Utiles/Translations";

const TutorialWindow = () => {
  const { getTranslatedWord } = useTranslation();
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
            <img
              src="/static/media/assets/images/card_front/1_of_C.png"
              alt="One of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/13_of_C.png"
              alt="Thirteen of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/12_of_C.png"
              alt="Twelve of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/11_of_C.png"
              alt="Eleven of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/10_of_C.png"
              alt="Ten of Clubs"
              className="card-image"
            />
          </div>
          <li>
            <strong>Straight Flush</strong>: Five consecutive cards of the same
            suit.
          </li>
          <div className="cards-container">
            <img
              src="/static/media/assets/images/card_front/1_of_H.png"
              alt="One of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/2_of_H.png"
              alt="Two of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/3_of_H.png"
              alt="Three of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/4_of_H.png"
              alt="Four of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/5_of_H.png"
              alt="Five of Hearts"
              className="card-image"
            />
          </div>
          <li>
            <strong>Four of a Kind</strong>: Four cards of the same rank.
          </li>
          <div className="cards-container">
            <img
              src="/static/media/assets/images/card_front/1_of_C.png"
              alt="One of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/1_of_H.png"
              alt="One of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/1_of_D.png"
              alt="One of diamonds"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/1_of_S.png"
              alt="One of speds"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/10_of_C.png"
              alt="Ten of Clubs"
              className="card-image"
            />
          </div>
          <li>
            <strong>Full House</strong>: Three of a kind plus a pair.
          </li>
          <div className="cards-container">
            <img
              src="/static/media/assets/images/card_front/1_of_C.png"
              alt="One of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/1_of_D.png"
              alt="One of diamonds"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/1_of_H.png"
              alt="One of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/10_of_H.png"
              alt="Ten of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/10_of_C.png"
              alt="Ten of Clubs"
              className="card-image"
            />
          </div>
          <li>
            <strong>Flush</strong>: Five cards of the same suit.
          </li>
          <div className="cards-container">
            <img
              src="/static/media/assets/images/card_front/1_of_C.png"
              alt="One of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/5_of_C.png"
              alt="Five of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/12_of_C.png"
              alt="Twelve of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/2_of_C.png"
              alt="Two of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/9_of_C.png"
              alt="Nine of Clubs"
              className="card-image"
            />
          </div>
          <li>
            <strong>Straight</strong>: Five consecutive cards of different
            suits.
          </li>
          <div className="cards-container">
            <img
              src="/static/media/assets/images/card_front/5_of_C.png"
              alt="Five of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/6_of_H.png"
              alt="Six of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/7_of_D.png"
              alt="Seven of Diamonds"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/8_of_S.png"
              alt="Height of Speds"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/9_of_C.png"
              alt="Nine of Clubs"
              className="card-image"
            />
          </div>
          <li>
            <strong>Three of a Kind</strong>: Three cards of the same rank.
          </li>
          <div className="cards-container">
            <img
              src="/static/media/assets/images/card_front/1_of_C.png"
              alt="One of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/1_of_H.png"
              alt="One of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/1_of_D.png"
              alt="One of Diamonds"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/7_of_C.png"
              alt="Seven of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/10_of_C.png"
              alt="Ten of Clubs"
              className="card-image"
            />
          </div>
          <li>
            <strong>Two Pair</strong>: Two different pairs.
          </li>
          <div className="cards-container">
            <img
              src="/static/media/assets/images/card_front/1_of_C.png"
              alt="One of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/13_of_C.png"
              alt="Thirteen of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/13_of_H.png"
              alt="Thirteen of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/5_of_D.png"
              alt="Five of Diamonds"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/5_of_S.png"
              alt="Five od Speds"
              className="card-image"
            />
          </div>
          <li>
            <strong>One Pair</strong>: One pair of the same rank.
          </li>
          <div className="cards-container">
            <img
              src="/static/media/assets/images/card_front/1_of_C.png"
              alt="One of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/2_of_C.png"
              alt="Two of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/6_of_H.png"
              alt="Six of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/11_of_C.png"
              alt="Eleven of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/11_of_S.png"
              alt="Ten of Clubs"
              className="card-image"
            />
          </div>
          <li>
            <strong>High Card</strong>: The highest card when no other hand is
            made.
          </li>
          <div className="cards-container">
            <img
              src="/static/media/assets/images/card_front/1_of_D.png"
              alt="One of Diamonds"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/7_of_C.png"
              alt="Seven of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/5_of_C.png"
              alt="Five of Clubs"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/11_of_H.png"
              alt="Eleven of Hearts"
              className="card-image"
            />
            <img
              src="/static/media/assets/images/card_front/8_of_S.png"
              alt="Height of Speds"
              className="card-image"
            />
          </div>
        </ul>

        <h3>The Deal</h3>
        <ul>
          <li>
            <strong>Blinds</strong>: Two players post blinds (small and big) to
            start the betting.
          </li>
          <li>
            <strong>Hole Cards</strong>: Each player is dealt two private cards
            face down.
          </li>
          <li>
            <strong>Betting Rounds</strong>:
            <ul>
              <li>
                <strong>Pre-Flop</strong>: Betting round after hole cards are
                dealt.
              </li>
              <li>
                <strong>Flop</strong>: Three community cards are dealt face up.
                Another round of betting follows.
              </li>
              <li>
                <strong>Turn</strong>: A fourth community card is dealt. Betting
                continues.
              </li>
              <li>
                <strong>River</strong>: The fifth and final community card is
                dealt. The final betting round ensues.
              </li>
              <li>
                <strong>Showdown</strong>: Remaining players reveal their hands,
                and the best hand wins the pot.
              </li>
            </ul>
          </li>
        </ul>

        <h3>Betting Actions</h3>
        <p>
          During a game of Texas Hold'em, players have several betting options:
        </p>
        <div className="container-ActionButtons">
          <button className="btn-mainAction disabled" aria-disabled="true">
            Raise
          </button>
          <button className="btn-mainAction disabled" aria-disabled="true">
            Call
          </button>
          <button
            className="btn-mainAction btn-fold disabled"
            aria-disabled="true"
          >
            Fold
          </button>
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
          <div className="cards-display">
            <img
              src="/static/media/assets/images/card_front/5_of_D.png"
              alt="Five of Diamonds"
              className="card-image-reveal"
            />
            <img
              src="/static/media/assets/images/card_front/4_of_S.png"
              alt="Four of Spades"
              className="card-image-reveal"
            />
          </div>
          <div className="reveal-buttons">
            <button className="btn-reveal">Show 5 ♦</button>
            <button className="btn-reveal">Show 4 ♠</button>
            <button className="btn-reveal">Show Both</button>
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
          <div className="bonus-icons">
            <img
              src="/static/media/assets/images/icons/white/heart.png"
              alt="Heart Suit"
              className="bonus-icon"
            />
            <img
              src="/static/media/assets/images/icons/white/diamond.png"
              alt="Diamond Suit"
              className="bonus-icon"
            />
            <img
              src="/static/media/assets/images/icons/white/spade.png"
              alt="Spade Suit"
              className="bonus-icon"
            />
            <img
              src="/static/media/assets/images/icons/white/club.png"
              alt="Club Suit"
              className="bonus-icon"
            />
          </div>
          <button className="bonus-button">ACTIVATE BONUS</button>
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
            <img
              src="/static/media/assets/images/card_front/1_of_S.png"
              alt="Ace of Spades"
              className="card-image-ex"
            />
            <img
              src="/static/media/assets/images/card_front/13_of_S.png"
              alt="King of Spades"
              className="card-image-ex"
            />
            . You raise, and two players call.
          </p>

          <p>
            <strong>Flop</strong>: The dealer reveals&nbsp;
            <img
              src="/static/media/assets/images/card_front/10_of_S.png"
              alt="Ten of Spades"
              className="card-image-ex"
            />
            <img
              src="/static/media/assets/images/card_front/11_of_S.png"
              alt="Jack of Spades"
              className="card-image-ex"
            />
            <img
              src="/static/media/assets/images/card_front/2_of_C.png"
              alt="Two of Clubs"
              className="card-image-ex"
            />
            . You have a flush draw and a straight draw.
          </p>
          <p>
            <strong>Betting</strong>: You bet, one player raises, and the other
            folds. You call.
          </p>
          <p>
            <strong>Turn</strong>: The dealer reveals&nbsp;
            <img
              src="/static/media/assets/images/card_front/12_of_S.png"
              alt="Queen of Spades"
              className="card-image-ex"
            />
            , completing your flush and straight.
          </p>
          <p>
            <strong>Betting</strong>: You bet, and the opponent calls.
          </p>
          <p>
            <strong>River</strong>: The dealer reveals&nbsp;
            <img
              src="/static/media/assets/images/card_front/3_of_D.png"
              alt="Three of Diamonds"
              className="card-image-ex"
            />
            .
          </p>
          <p>
            <strong>Betting</strong>: You bet again, and the opponent raises.
            You re-raise, and the opponent calls.
          </p>
          <p>
            <strong>Showdown</strong>: You reveal your&nbsp;
            <img
              src="/static/media/assets/images/card_front/1_of_S.png"
              alt="Ace of Spades"
              className="card-image-ex"
            />
            <img
              src="/static/media/assets/images/card_front/13_of_S.png"
              alt="King of Spades"
              className="card-image-ex"
            />
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
