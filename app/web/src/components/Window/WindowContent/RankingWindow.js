import React, { useEffect, useState } from "react";
import { useTranslation } from "../../Utiles/Translations";
import Button from "../../button/Button.tsx";

const RankingWindow = ({ onClose }) => {
    const nbRes = 11;
    const [page, setPage] = useState(1);
    const [ranks, setRanks] = useState([]);
    const { getTranslatedWord } = useTranslation();

    const fetchRankings = async (pageNum) => {
        try {
            const response = await fetch(`http://localhost:3001/api/get-all-ranking?page=${pageNum}&nbres=${nbRes}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            if (data.success) {
                setPage(pageNum);
                if (pageNum === 1) {
                    setRanks(data.data);
                } else {
                    setRanks(prev => [...prev, ...data.data]);
                }
            } else {
                throw new Error("An unexpected error occurred while loading ranking.");
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        fetchRankings(1);
    }, []);

    return (
        <div className="listTableWindow">
            <div className="listTableHeader">
                <div className="headerItem">{getTranslatedWord("ranking.rank")}</div>
                <div className="headerItem">{getTranslatedWord("ranking.pseudo")}</div>
                <div className="headerItem">{getTranslatedWord("ranking.gain")}</div>
            </div>
            <div className="listTableBody">
                {ranks.map((rank, index) => (
                    <div className="tableRow" key={index}>
                        <div className="rowItem">{index < 3 ? <img src={require(`./../../assets/images/${index === 0 ? "gold" : index === 1 ? "silver" : "bronze"}-medal.png`)} alt="" /> : index + 1}</div>
                        <div className="rowItem">{rank.pseudo}</div>
                        <div className="rowItem">{rank.gain.length === 0 ? 0 : rank.gain}</div>
                    </div>
                ))}
            </div>
            <div className="container-listButton">
                <Button
                styleClass={"btn-loadMore back-color1"}
                label={getTranslatedWord("ranking.loadMore")}
                onClick={() => fetchRankings(page + 1)}
                />
            </div>
        </div>
    );
};

export default RankingWindow;
