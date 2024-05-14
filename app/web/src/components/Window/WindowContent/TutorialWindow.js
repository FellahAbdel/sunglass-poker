// TutorialWindow.jsx
import React from "react";
import './tutorial.css'

const TutorialWindow = ({}) => {
  return (
    <div className={`container-text-tutorial`}>
      <div className='text-tutorial'>
        <h1>Texas Hold'em Poker</h1>

        <h2>Introduction</h2>
        <p>Texas Hold'em is the most popular variant of poker. It is played in casinos, online platforms, and home games worldwide. This tutorial will guide you through the basic rules, betting rounds, and strategies to get you started.</p>

        <h2>Objective</h2>
        <p>The goal of Texas Hold'em is to win chips by having the best five-card hand or by making other players fold before the showdown.</p>

        <h2>Setup</h2>
        <ul>
            <li><strong>Deck</strong>: A standard 52-card deck.</li>
            <li><strong>Players</strong>: Typically 2-10 players.</li>
            <li><strong>Chips</strong>: Used for betting.</li>
        </ul>

        <h2>Basic Rules</h2>

        <h3>Hand Rankings</h3>
        <p>Understanding hand rankings is crucial. Here are the rankings from highest to lowest:</p>
        <ul>
            <li><strong>Royal Flush</strong>: A, K, Q, J, 10 of the same suit.</li>
            <li><strong>Straight Flush</strong>: Five consecutive cards of the same suit.</li>
            <li><strong>Four of a Kind</strong>: Four cards of the same rank.</li>
            <li><strong>Full House</strong>: Three of a kind plus a pair.</li>
            <li><strong>Flush</strong>: Five cards of the same suit.</li>
            <li><strong>Straight</strong>: Five consecutive cards of different suits.</li>
            <li><strong>Three of a Kind</strong>: Three cards of the same rank.</li>
            <li><strong>Two Pair</strong>: Two different pairs.</li>
            <li><strong>One Pair</strong>: One pair of the same rank.</li>
            <li><strong>High Card</strong>: The highest card when no other hand is made.</li>
        </ul>

        <h3>The Deal</h3>
        <ul>
            <li><strong>Blinds</strong>: Two players post blinds (small and big) to start the betting.</li>
            <li><strong>Hole Cards</strong>: Each player is dealt two private cards face down.</li>
            <li><strong>Betting Rounds</strong>:
                <ul>
                    <li><strong>Pre-Flop</strong>: Betting round after hole cards are dealt.</li>
                    <li><strong>Flop</strong>: Three community cards are dealt face up. Another round of betting follows.</li>
                    <li><strong>Turn</strong>: A fourth community card is dealt. Betting continues.</li>
                    <li><strong>River</strong>: The fifth and final community card is dealt. The final betting round ensues.</li>
                    <li><strong>Showdown</strong>: Remaining players reveal their hands, and the best hand wins the pot.</li>
                </ul>
            </li>
        </ul>

        <h3>Betting Actions</h3>
        <ul>
            <li><strong>Fold</strong>: Discarding your hand and forfeiting the round.</li>
            <li><strong>Check</strong>: Passing the action to the next player without betting.</li>
            <li><strong>Bet</strong>: Wagering chips.</li>
            <li><strong>Call</strong>: Matching the current bet.</li>
            <li><strong>Raise</strong>: Increasing the bet.</li>
        </ul>

        <h2>Strategy Tips</h2>

        <h3>Starting Hands</h3>
        <ul>
            <li>Play strong starting hands (e.g., high pairs, suited connectors).</li>
            <li>Avoid weak hands (e.g., low unsuited cards) unless in the right position.</li>
        </ul>

        <h3>Position</h3>
        <ul>
            <li>Being in a later position allows you to see how opponents act before you make your move.</li>
            <li>Use your position to control the pot and gain information.</li>
        </ul>

        <h3>Bluffing</h3>
        <ul>
            <li>Bluff occasionally to keep opponents guessing.</li>
            <li>Ensure your bluffs are convincing and in line with previous actions.</li>
        </ul>

        <h3>Pot Odds</h3>
        <ul>
            <li>Calculate pot odds to determine if calling a bet is profitable in the long run.</li>
        </ul>

        <h2>Common Terms</h2>
        <ul>
            <li><strong>Blind</strong>: Forced bet to ensure there is money in the pot.</li>
            <li><strong>Community Cards</strong>: Cards dealt face up in the center of the table.</li>
            <li><strong>Kicker</strong>: An unpaired card that can determine the winner if players have similar hands.</li>
            <li><strong>Pot</strong>: The total amount of chips bet in a hand.</li>
        </ul>

        <h2>Practice</h2>
        <p>To get better at Texas Hold'em:</p>
        <ul>
            <li><strong>Play Regularly</strong>: Experience is the best teacher.</li>
            <li><strong>Study the Game</strong>: Read books and watch videos on poker strategy.</li>
            <li><strong>Review Hands</strong>: Analyze your play and learn from mistakes.</li>
        </ul>

        <h3>Example Hand</h3>
        <div class="highlight">
            <p><strong>Pre-Flop</strong>: You are dealt A♠ K♠. You raise, and two players call.</p>
            <p><strong>Flop</strong>: The dealer reveals 10♠ J♠ 2♣. You have a flush draw and a straight draw.</p>
            <p><strong>Betting</strong>: You bet, one player raises, and the other folds. You call.</p>
            <p><strong>Turn</strong>: The dealer reveals Q♠, completing your flush and straight.</p>
            <p><strong>Betting</strong>: You bet, and the opponent calls.</p>
            <p><strong>River</strong>: The dealer reveals 3♦.</p>
            <p><strong>Betting</strong>: You bet again, and the opponent raises. You re-raise, and the opponent calls.</p>
            <p><strong>Showdown</strong>: You reveal your A♠ K♠, winning with an Ace-high flush.</p>
        </div>

        <p>* Texas Hold'em is a game of skill, strategy, and a bit of luck. By understanding the rules, practicing regularly, and learning from each hand, you can improve and enjoy this exciting game. Happy playing!</p>
      </div>
    </div>
  );
};

export default TutorialWindow;
