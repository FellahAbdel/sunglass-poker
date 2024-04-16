import React from "react";
import "./listTableWindow.css";
import Button from "../../button/Button.tsx";
import ListTableItem from "./SpecificComponentWindow/ListTableItem";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../../Utiles/AuthProvider.jsx";

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

  const { getRoomTableRecords } = useAuth();
  const [roomTableRecords, setRoomTableRecords] = useState([]); // State to store fetched roomTableRecords data
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken"); // Ou localStorage selon votre préférence
    // Function to fetch roomTableRecords data from server
    const fetchRoomTableRecords = async () => {
      try {
        if (authToken) {
          const data = await getRoomTableRecords(authToken); // Assuming this is your API endpoint
          if (data) {
            setRoomTableRecords(data); // Update state with fetched roomTableRecords data
          }
        }
      } catch (error) {
        console.error("Error fetching roomTableRecords:", error);
      }
    };

    fetchRoomTableRecords(); // Call the fetchTables function when the component mounts
  }, []); // Empty dependency array to run this effect only once after the initial render

  console.log("roomsTableRecords : ", roomTableRecords); // Log the fetched roomTableRecords data to the console
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
        {roomTableRecords.map((table, index) => (
          <ListTableItem
            key={index}
            nom={table.serverName}
            rang={table.rank}
            nombreDeJoueurs={0}
            ouvert={"ouvert"}
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

export default ListTableWindow;