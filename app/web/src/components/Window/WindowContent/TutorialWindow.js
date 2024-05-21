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
        <h1>{getTranslatedWord("tutorial.title")}</h1>

        <h2>{getTranslatedWord("tutorial.introduction.heading")}</h2>
        <p>{getTranslatedWord("tutorial.introduction.text")}</p>

        <h2>{getTranslatedWord("tutorial.objective.heading")}</h2>
        <p>{getTranslatedWord("tutorial.objective.text")}</p>

        <h2>{getTranslatedWord("tutorial.setup.heading")}</h2>
        <ul>
          <li>
            <strong>{getTranslatedWord("tutorial.setup.deckBold")}</strong>
            {getTranslatedWord("tutorial.setup.deckText")}
          </li>
          <li>
            <strong>{getTranslatedWord("tutorial.setup.playersBold")}</strong>
            {getTranslatedWord("tutorial.setup.playersText")}
          </li>
          <li>
            <strong>{getTranslatedWord("tutorial.setup.chipsBold")}</strong>
            {getTranslatedWord("tutorial.setup.chipsText")}
          </li>
        </ul>

        <h2>{getTranslatedWord("tutorial.basicRules.heading")}</h2>

        <h3>{getTranslatedWord("tutorial.basicRules.handRankings.heading")}</h3>
        <p>{getTranslatedWord("tutorial.basicRules.handRankings.text")}</p>
        <ul>
          <li>
            <strong>
              {getTranslatedWord(
                "tutorial.basicRules.handRankings.royalFlushBold"
              )}
            </strong>
            {getTranslatedWord(
              "tutorial.basicRules.handRankings.royalFlushText"
            )}
          </li>
          <div className="cards-container">
            <Card
              styleClass={"handCard"}
              card={["A", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["K", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["Q", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["J", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["10", "C"]}
              flippingCard={true}
            />
          </div>
          <li>
            <strong>
              {getTranslatedWord(
                "tutorial.basicRules.handRankings.straightFlushBold"
              )}
            </strong>
            {getTranslatedWord(
              "tutorial.basicRules.handRankings.straightFlushText"
            )}
          </li>
          <div className="cards-container">
            <Card
              styleClass={"handCard"}
              card={["A", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["2", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["3", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["4", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["5", "H"]}
              flippingCard={true}
            />
          </div>
          <li>
            <strong>
              {getTranslatedWord(
                "tutorial.basicRules.handRankings.fourOfAKindBold"
              )}
            </strong>
            {getTranslatedWord(
              "tutorial.basicRules.handRankings.fourOfAKindText"
            )}
          </li>
          <div className="cards-container">
            <Card
              styleClass={"handCard"}
              card={["A", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["A", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["A", "D"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["A", "S"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["K", "C"]}
              flippingCard={true}
            />
          </div>
          <li>
            <strong>
              {getTranslatedWord(
                "tutorial.basicRules.handRankings.fullHouseBold"
              )}
            </strong>
            {getTranslatedWord(
              "tutorial.basicRules.handRankings.fullHouseText"
            )}
          </li>
          <div className="cards-container">
            <Card
              styleClass={"handCard"}
              card={["A", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["A", "D"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["A", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["K", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["K", "C"]}
              flippingCard={true}
            />
          </div>
          <li>
            <strong>
              {getTranslatedWord("tutorial.basicRules.handRankings.flushBold")}
            </strong>
            {getTranslatedWord("tutorial.basicRules.handRankings.flushText")}
          </li>
          <div className="cards-container">
            <Card
              styleClass={"handCard"}
              card={["A", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["K", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["Q", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["J", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["9", "C"]}
              flippingCard={true}
            />
          </div>
          <li>
            <strong>
              {getTranslatedWord(
                "tutorial.basicRules.handRankings.straightBold"
              )}
            </strong>
            {getTranslatedWord("tutorial.basicRules.handRankings.straightText")}
          </li>
          <div className="cards-container">
            <Card
              styleClass={"handCard"}
              card={["5", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["6", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["7", "D"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["8", "S"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["9", "C"]}
              flippingCard={true}
            />
          </div>
          <li>
            <strong>
              {getTranslatedWord(
                "tutorial.basicRules.handRankings.threeOfAKindBold"
              )}
            </strong>
            {getTranslatedWord(
              "tutorial.basicRules.handRankings.threeOfAKindText"
            )}
          </li>
          <div className="cards-container">
            <Card
              styleClass={"handCard"}
              card={["A", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["A", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["A", "D"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["9", "S"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["K", "C"]}
              flippingCard={true}
            />{" "}
            {/* Assume K as kicker */}
          </div>
          <li>
            <strong>
              {getTranslatedWord(
                "tutorial.basicRules.handRankings.twoPairBold"
              )}
            </strong>
            {getTranslatedWord("tutorial.basicRules.handRankings.twoPairText")}
          </li>
          <div className="cards-container">
            <Card
              styleClass={"handCard"}
              card={["A", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["A", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["K", "D"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["K", "S"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["Q", "C"]}
              flippingCard={true}
            />{" "}
            {/* Assume Q as kicker */}
          </div>
          <li>
            <strong>
              {getTranslatedWord(
                "tutorial.basicRules.handRankings.onePairBold"
              )}
            </strong>
            {getTranslatedWord("tutorial.basicRules.handRankings.onePairText")}
          </li>
          <div className="cards-container">
            <Card
              styleClass={"handCard"}
              card={["A", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["A", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["K", "D"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["Q", "S"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["J", "C"]}
              flippingCard={true}
            />{" "}
            {/* Assume J as kicker */}
          </div>
          <li>
            <strong>
              {getTranslatedWord(
                "tutorial.basicRules.handRankings.highCardBold"
              )}
            </strong>
            {getTranslatedWord("tutorial.basicRules.handRankings.highCardText")}
          </li>
          <div className="cards-container">
            <Card
              styleClass={"handCard"}
              card={["A", "D"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["K", "C"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["Q", "H"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["J", "S"]}
              flippingCard={true}
            />
            <Card
              styleClass={"handCard"}
              card={["9", "C"]}
              flippingCard={true}
            />
          </div>
        </ul>

        <h3>
          {getTranslatedWord("tutorial.basicRules.bettingActions.heading")}
        </h3>
        <p>{getTranslatedWord("tutorial.basicRules.bettingActions.text")}</p>

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
              <Button styleClass={"btn-mainAction"} label={"Min"} />
              <Button styleClass={"btn-mainAction"} label={"1/4"} />
              <Button styleClass={"btn-mainAction"} label={"1/2"} />
              <Button styleClass={"btn-mainAction"} label={"3/4"} />
              <Button styleClass={"btn-mainAction"} label={"All in"} />
            </div>
            <div className={`container-raiseAdjuster`}>
              <Button styleClass="btn-raiseDecrement" label={"−"} />
              <input type="text" className="raiseValueDisplay" value={10000} />
              SC
              <Button styleClass="btn-raiseIncrement" label={"+"} />
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

        <p>{getTranslatedWord("tutorial.bettingOptions.description")}</p>
        <ul>
          <li>
            <strong>
              {getTranslatedWord("tutorial.bettingOptions.foldBold")}
            </strong>
            {getTranslatedWord("tutorial.bettingOptions.foldText")}
          </li>
          <li>
            <strong>
              {getTranslatedWord("tutorial.bettingOptions.checkCallBold")}
            </strong>
            {getTranslatedWord("tutorial.bettingOptions.checkCallText")}
          </li>
          <li>
            <strong>
              {getTranslatedWord("tutorial.bettingOptions.raiseBold")}
            </strong>
            {getTranslatedWord("tutorial.bettingOptions.raiseText")}
          </li>
        </ul>

        <h2>{getTranslatedWord("tutorial.strategyTips.heading")}</h2>

        <h3>
          {getTranslatedWord("tutorial.strategyTips.startingHandsHeading")}
        </h3>
        <ul>
          <li>
            {getTranslatedWord("tutorial.strategyTips.startingHandsTips.1")}
          </li>
          <li>
            {getTranslatedWord("tutorial.strategyTips.startingHandsTips.2")}
          </li>
        </ul>

        <h3>{getTranslatedWord("tutorial.strategyTips.positionHeading")}</h3>
        <ul>
          <li>{getTranslatedWord("tutorial.strategyTips.positionTips.1")}</li>
          <li>{getTranslatedWord("tutorial.strategyTips.positionTips.2")}</li>
        </ul>

        <h3>{getTranslatedWord("tutorial.strategyTips.bluffingHeading")}</h3>
        <ul>
          <li>{getTranslatedWord("tutorial.strategyTips.bluffingTips.1")}</li>
          <li>{getTranslatedWord("tutorial.strategyTips.bluffingTips.2")}</li>
        </ul>

        <h3>{getTranslatedWord("tutorial.strategyTips.potOddsHeading")}</h3>
        <ul>
          <li>{getTranslatedWord("tutorial.strategyTips.potOddsTip")}</li>
        </ul>

        <h2>{getTranslatedWord("tutorial.commonTerms.heading")}</h2>
        <ul>
          <li>
            <strong>
              {getTranslatedWord("tutorial.commonTerms.blindBold")}
            </strong>
            {getTranslatedWord("tutorial.commonTerms.blindText")}
          </li>
          <li>
            <strong>
              {getTranslatedWord("tutorial.commonTerms.communityCardsBold")}
            </strong>
            {getTranslatedWord("tutorial.commonTerms.communityCardsText")}
          </li>
          <li>
            <strong>
              {getTranslatedWord("tutorial.commonTerms.kickerBold")}
            </strong>
            {getTranslatedWord("tutorial.commonTerms.kickerText")}
          </li>
          <li>
            <strong>{getTranslatedWord("tutorial.commonTerms.potBold")}</strong>
            {getTranslatedWord("tutorial.commonTerms.potText")}
          </li>
        </ul>

        <h2>{getTranslatedWord("tutorial.specialFeatures.heading")}</h2>
        <p>{getTranslatedWord("tutorial.specialFeatures.description")}</p>

        <h3>
          {getTranslatedWord("tutorial.specialFeatures.revealingCardsHeading")}
        </h3>
        <p>
          {getTranslatedWord("tutorial.specialFeatures.revealingCardsText")}
        </p>
        <ul>
          <li>
            <strong>
              {getTranslatedWord("tutorial.specialFeatures.bluffMisleadBold")}
            </strong>
            {getTranslatedWord("tutorial.specialFeatures.bluffMisleadText")}
          </li>
          <li>
            <strong>
              {getTranslatedWord(
                "tutorial.specialFeatures.showStrengthWeaknessBold"
              )}
            </strong>
            {getTranslatedWord(
              "tutorial.specialFeatures.showStrengthWeaknessText"
            )}
          </li>
        </ul>

        <div className="card-reveal-section">
          <div className="container-handMainDemo">
            <div className="container-showCardsButtons">
              <Button
                styleClass={"btn-showCard"}
                label={`${getTranslatedWord(
                  "handGuide.hide"
                )} A ${getTranslatedWord("handGuide.of")}`}
                iconSrc={"static/media/assets/images/icons/white/heart.png"}
              />
              <Button
                styleClass={"btn-showCard"}
                label={`${getTranslatedWord(
                  "handGuide.hide"
                )} A ${getTranslatedWord("handGuide.of")}`}
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
                card={["A", "S"]}
                flippingCard={true}
              />
              <Card
                styleClass="handCard"
                card={["A", "H"]}
                flippingCard={true}
              />
            </div>
          </div>
        </div>

        <p>
          {getTranslatedWord(
            "tutorial.specialFeatures.strategyPsychology.description"
          )}
        </p>

        <h3>
          {getTranslatedWord("tutorial.specialFeatures.bonusFeatureHeading")}
        </h3>
        <p>
          {getTranslatedWord(
            "tutorial.specialFeatures.bonusFeatureDescription"
          )}
        </p>

        <div className="bonus-feature-section">
          <BonusPanel />
        </div>

        <h2>{getTranslatedWord("tutorial.practice.heading")}</h2>
        <p>{getTranslatedWord("tutorial.practice.description")}</p>
        <ul>
          <li>
            <strong>
              {getTranslatedWord("tutorial.practice.playRegularlyBold")}
            </strong>
            {getTranslatedWord("tutorial.practice.playRegularlyText")}
          </li>
          <li>
            <strong>
              {getTranslatedWord("tutorial.practice.studyGameBold")}
            </strong>
            {getTranslatedWord("tutorial.practice.studyGameText")}
          </li>
          <li>
            <strong>
              {getTranslatedWord("tutorial.practice.reviewHandsBold")}
            </strong>
            {getTranslatedWord("tutorial.practice.reviewHandsText")}
          </li>
        </ul>

        <h3>{getTranslatedWord("tutorial.exampleHand.heading")}</h3>
        <div className="highlight">
          <p>
            <strong>
              {getTranslatedWord("tutorial.exampleHand.preFlopBold")}
            </strong>
            : {getTranslatedWord("tutorial.exampleHand.preFlopText")}
            <div className="cards-container">
              <Card
                styleClass={"handCard small"}
                card={["1", "S"]}
                flippingCard={true}
              />
              <Card
                styleClass={"handCard small"}
                card={["K", "S"]}
                flippingCard={true}
              />
            </div>
            {getTranslatedWord("tutorial.exampleHand.preFlopContinuation")}
          </p>

          <p>
            <strong>
              {getTranslatedWord("tutorial.exampleHand.flopBold")}
            </strong>
            : {getTranslatedWord("tutorial.exampleHand.flopText")}
            <div className="cards-container">
              <Card
                styleClass={"handCard small"}
                card={["10", "S"]}
                flippingCard={true}
              />
              <Card
                styleClass={"handCard small"}
                card={["J", "S"]}
                flippingCard={true}
              />
              <Card
                styleClass={"handCard small"}
                card={["2", "C"]}
                flippingCard={true}
              />
            </div>
            {getTranslatedWord("tutorial.exampleHand.flopContinuation")}
          </p>

          <p>
            <strong>
              {getTranslatedWord("tutorial.exampleHand.bettingBold")}
            </strong>
            : {getTranslatedWord("tutorial.exampleHand.bettingText")}
          </p>

          <p>
            <strong>
              {getTranslatedWord("tutorial.exampleHand.turnBold")}
            </strong>
            : {getTranslatedWord("tutorial.exampleHand.turnText")}
            <div className="cards-container">
              <Card
                styleClass={"handCard small"}
                card={["Q", "S"]}
                flippingCard={true}
              />
            </div>
            {getTranslatedWord("tutorial.exampleHand.turnContinuation")}
          </p>

          <p>
            <strong>
              {getTranslatedWord("tutorial.exampleHand.bettingBold")}
            </strong>
            : {getTranslatedWord("tutorial.exampleHand.bettingText")}
          </p>

          <p>
            <strong>
              {getTranslatedWord("tutorial.exampleHand.riverBold")}
            </strong>
            : {getTranslatedWord("tutorial.exampleHand.riverText")}
            <div className="cards-container">
              <Card
                styleClass={"handCard small"}
                card={["3", "D"]}
                flippingCard={true}
              />
            </div>
          </p>

          <p>
            <strong>
              {getTranslatedWord("tutorial.exampleHand.bettingBold")}
            </strong>
            <strong>
              {getTranslatedWord("tutorial.exampleHand.bettingBold")}
            </strong>
            : {getTranslatedWord("tutorial.exampleHand.finalBettingText")}
          </p>

          <p>
            <strong>
              {getTranslatedWord("tutorial.exampleHand.showdownBold")}
            </strong>
            : {getTranslatedWord("tutorial.exampleHand.showdownText")}
            <div className="cards-container">
              <Card
                styleClass={"handCard small"}
                card={["A", "S"]}
                flippingCard={true}
              />
              <Card
                styleClass={"handCard small"}
                card={["K", "S"]}
                flippingCard={true}
              />
            </div>
            {getTranslatedWord("tutorial.exampleHand.showdownContinuation")}
          </p>
        </div>

        <p>{getTranslatedWord("tutorial.conclusion.text")}</p>
      </div>
    </div>
  );
};

export default TutorialWindow;
