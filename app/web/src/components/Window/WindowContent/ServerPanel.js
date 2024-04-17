import React from "react";
import "./serverPanel.css";
import Button from "../../button/Button.tsx";
import ListTableItem from "./SpecificComponentWindow/ListTableItem";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../Utiles/Translations";
import TextInputComponent from "../../textInput/TextInput.jsx";

const ServerPanelWindow = () => {
  const handleChange = (event) => {};
  const { getTranslatedWord } = useTranslation();

  const fakeTables = [
    {
      nom: "Table des Champions",
      rang: "Élite",
      nombreDeJoueurs: 5,
      ouvert: true,
    },
    {
      nom: "Débutants Bienvenue",
      rang: "Novice",
      nombreDeJoueurs: 3,
      ouvert: false,
    },
    {
      nom: "La Confrontation",
      rang: "Intermédiaire",
      nombreDeJoueurs: 4,
      ouvert: true,
    },
    {
      nom: "Roi du Bluff",
      rang: "Avancé",
      nombreDeJoueurs: 6,
      ouvert: false,
    },
    {
      nom: "Marathon de Poker",
      rang: "Élite",
      nombreDeJoueurs: 10,
      ouvert: true,
    },
  ];

  const { openWindow } = useWindowContext();

  const handleJoinTable = () => {
    // Logique pour rejoindre une table à faire
  };

  return (
    <div className="listTableWindow">
      <TextInputComponent
        placeholder="Search room"
        styleClass={"input-connectionDefault input-searchBar input-icon-search"}
        styleClass2={"container-textInputComponent2"}
        errorMessage={""}
        onChange={handleChange}
      ></TextInputComponent>
      <div className="listTableHeader">
        <div className="headerItem">
          {getTranslatedWord("serverPanel.name")}
        </div>
        <div className="headerItem">
          {getTranslatedWord("serverPanel.rank")}
        </div>
        <div className="headerItem">{getTranslatedWord("game.players")}</div>
        <div className="headerItem"></div>
        <div className="headerItem"></div>
      </div>
      <div className="listTableBody">
        {fakeTables.map((table, index) => (
          <ListTableItem
            key={index}
            nom={table.nom}
            rang={table.rang}
            nombreDeJoueurs={table.nombreDeJoueurs}
            ouvert={table.ouvert}
            onJoinClick={handleJoinTable}
          />
        ))}
      </div>
      <div className="button-container">
        <Button
          styleClass={"btn-gameStart back-color1"}
          label={"Create a new game"}
          onClick={() => openWindow("create_table")}
        />
      </div>
    </div>
  );
};

export default ServerPanelWindow;
