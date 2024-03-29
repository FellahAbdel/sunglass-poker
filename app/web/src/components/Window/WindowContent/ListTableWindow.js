import React from "react";
import "./listTableWindow.css";
import Button from "../../button/Button.tsx";
import ListTableItem from "./SpecificComponentWindow/ListTableItem";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";

const ListTableWindow = () => {
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
      <div className="listTableHeader">
        <div className="headerItem">Name</div>
        <div className="headerItem">Ranked</div>
        <div className="headerItem">Players</div>
        <div className="headerItem">Status</div>
        <div className="headerItem">Action</div>
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
          styleClass={"btn-gameStart"}
          label={"Create a new game"}
          onClick={() => openWindow("create_table")}
        />
      </div>
    </div>
  );
};

export default ListTableWindow;
