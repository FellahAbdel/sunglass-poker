import React from "react";
import "./serverPanel.css";
import Button from "../../button/Button.tsx";
import ListTableItem from "./SpecificComponentWindow/ListTableItem";
import { useWindowContext } from "../../Utiles/WindowContext.jsx";
import { useTranslation } from "../../Utiles/Translations";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Utiles/AuthProvider.jsx";
import * as actions from "../../../store/actions/clientInteractionsCreator.js";
import TextInputComponent from "../../textInput/TextInput.jsx";

//ADD A LARRACHE


const ServerPanelWindow = () => {
  const dispatch = useDispatch();
  const { getTranslatedWord } = useTranslation();

  const { closeWindow, showGameTable, setWindowType } =
useWindowContext();

  const { getRoomTableRecords } = useAuth();
  const { isLogged } = useAuth();
  const [roomTableRecords, setRoomTableRecords] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);

  const [searchText, setSearchText] = useState("");


  //Gère le nombre de tables affichées par page
  useEffect(() => {
    const updateRecordsPerPage = () => {
      const windowHeight = window.innerHeight;
      const tableItemHeight = 150;
      const maxRecordsPerPage = Math.floor(windowHeight / tableItemHeight);
      setRecordsPerPage(maxRecordsPerPage);
    };

    updateRecordsPerPage();

    const handleResize = () => {
      updateRecordsPerPage();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (event) => {
    setSearchText(event.target.value); // Mettre à jour le texte de recherche lorsqu'il y a un changement dans la barre de recherche
  };

  useEffect(() => {
    const fetchRoomTableRecords = async () => {
      try {
        const authToken = sessionStorage.getItem("authToken");
        if (authToken) {
          const data = await getRoomTableRecords(authToken);
          if (data) {
            // Diviser les tables en deux groupes : tables pleines et tables non pleines
            const fullTables = data.filter(
              (table) => table.countPlayers === 10
            );
            const nonFullTables = data.filter(
              (table) => table.countPlayers < 10
            );

            // Trier les tables non pleines dans l'ordre décroissant du nombre de joueurs
            const sortedNonFullTables = nonFullTables.sort(
              (a, b) => b.countPlayers - a.countPlayers
            );

            // Fusionner les deux groupes de tables en plaçant les tables pleines à la fin
            const sortedTables = [...sortedNonFullTables, ...fullTables];

            // Filtrer les tables en fonction du texte de recherche
            const filteredTables = sortedTables.filter((table) =>
              table.serverName.toLowerCase().includes(searchText.toLowerCase())
            );

            // Mettre à jour l'état roomTableRecords avec les tables triées et filtrées
            setRoomTableRecords(filteredTables);
          }
        }
      } catch (error) {
        console.error("Error fetching roomTableRecords:", error);
      }
    };

    fetchRoomTableRecords();
  }, [searchText]); //Mise à jour à chaque fois que le texte est changé

  console.log("roomsTableRecords : ", roomTableRecords); // Log the fetched roomTableRecords data to the console
  const { openWindow } = useWindowContext();

  const handleJoinTable = (id) => {
    // Logique pour rejoindre une table à faire
    if (isLogged) {
      console.log("Le joueur veut rejoindre la partie ", id);
      dispatch(actions.joinRoom(id));
      showGameTable();
      closeWindow();
      setWindowType("");
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = roomTableRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        {currentRecords.map((table, index) => (
          <ListTableItem
            key={index}
            nom={table.serverName}
            rang={table.rank}
            onJoinClick={() => handleJoinTable(table._id)}
            nombreDeJoueurs={table.countPlayers}
            ouvert={table.roomPassword ? false : true}
          />
        ))}
      </div>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(roomTableRecords.length / recordsPerPage) },
          (_, i) => i + 1
        ).map((page) => (
          <Button
            key={page}
            styleClass={page === currentPage ? "back-color1 btn-serverPage" : "back-color3 btn-serverPage"}
            label={page}
            onClick={() => paginate(page)}
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
