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

/**
 * ServerPanelWindow component manages the display of available game rooms,
 * including pagination, search functionality, and the ability to join rooms.
 */
const ServerPanelWindow = () => {
  const dispatch = useDispatch();
  const { getTranslatedWord } = useTranslation();

  const { closeWindow, showGameTable, setWindowType, openWindow } =
    useWindowContext();

  const { getRoomTableRecords, isLogged } = useAuth();
  const [roomTableRecords, setRoomTableRecords] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);

  const [searchText, setSearchText] = useState("");

  const isPlayerSited = useSelector((state) => state.game.playerSited);

  // Displays the game room UI when the player is sited. => used in loadingWindo
  const displayGameRoom = () => {
    console.log("Game room displayed!");
    showGameTable();
    closeWindow();
    setWindowType("");
  };

  // UseEffect to handle the player sited state and display the game room accordingly.
  useEffect(() => {
    if (isPlayerSited) {
      displayGameRoom();
      console.log("playerSited", isPlayerSited);
    }
  }, [isPlayerSited]);

  // Manage the number of tables displayed per page based on window height.
  useEffect(() => {
    const updateRecordsPerPage = () => {
      const windowHeight = window.innerHeight;
      const tableItemHeight = 130;
      const maxRecordsPerPage = Math.floor(
        (windowHeight * 0.9) / tableItemHeight
      );
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

  // Fetch room table records from the server and update the state.
  useEffect(() => {
    const fetchRoomTableRecords = async () => {
      try {
        const authToken = sessionStorage.getItem("authToken");
        if (authToken) {
          const data = await getRoomTableRecords(authToken);
          if (data) {
            // Diviser les tables en deux groupes : tables pleines et tables non pleines
            const fullTables = data.filter(
              (table) => table.players.length === 10
            );
            const nonFullTables = data.filter(
              (table) => table.players.length < 10
            );

            // Trier les tables non pleines dans l'ordre décroissant du nombre de joueurs
            const sortedNonFullTables = nonFullTables.sort(
              (a, b) => b.players.length - a.players.length
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  console.log("roomsTableRecords : ", roomTableRecords); // Log the fetched roomTableRecords data to the console

  // Handle the logic for joining a table.
  const handleJoinTable = (id) => {
    if (isLogged) {
      console.log("Attempting to join room with ID:", id);
      openWindow("loading");
      dispatch(actions.joinRoom(id));
      if (isPlayerSited) {
        displayGameRoom();
      } else {
        console.log("server hasn't responded yet");
      }
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = roomTableRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(roomTableRecords.length / recordsPerPage);

  return (
    <div className="listTableWindowPanel">
      <TextInputComponent
        placeholder="serverPanel.search"
        styleClass={"input-connectionDefault input-searchBar"}
        iconSrc="static/media/assets/images/icons/black/search.png"
        styleClass2={"container-textInputComponent2"}
        errorMessage={""}
        onChange={handleChange}
      />

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
            id={table._id}
            nom={table.serverName}
            rang={table.rank}
            onJoinClick={() => handleJoinTable(table._id)}
            nombreDeJoueurs={table.players.length}
            ouvert={table.roomPassword ? false : true}
          />
        ))}
      </div>
      <div className="container-pagination">
        {/* Bouton pour la première page */}
        <Button
          styleClass={
            currentPage === 1
              ? "back-color1 btn-serverPage"
              : "back-color3 btn-serverPage"
          }
          label={"1"}
          onClick={() => paginate(1)}
        />

        {/* Bouton pour la page précédente (n-1) */}
        {currentPage > 2 && (
          <Button
            styleClass={"back-color3 btn-serverPage"}
            label={currentPage - 1}
            onClick={() => paginate(currentPage - 1)}
          />
        )}

        {/* Bouton pour la page actuelle (n) */}
        {currentPage !== 1 && currentPage !== totalPages && (
          <Button
            styleClass={"back-color1 btn-serverPage"}
            label={currentPage}
            onClick={() => paginate(currentPage)}
          />
        )}

        {/* Bouton pour la page suivante (n+1) */}
        {currentPage < totalPages - 1 && (
          <Button
            styleClass={"back-color3 btn-serverPage"}
            label={currentPage + 1}
            onClick={() => paginate(currentPage + 1)}
          />
        )}

        {/* Bouton pour la dernière page */}
        {totalPages > 1 && (
          <Button
            styleClass={
              currentPage === totalPages
                ? "back-color1 btn-serverPage"
                : "back-color3 btn-serverPage"
            }
            label={totalPages}
            onClick={() => paginate(totalPages)}
          />
        )}
      </div>
    </div>
  );
};

export default ServerPanelWindow;
