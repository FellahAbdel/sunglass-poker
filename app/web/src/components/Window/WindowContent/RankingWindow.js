import React, { useEffect, useState } from "react";
import { useTranslation } from "../../Utiles/Translations";
import Button from "../../button/Button.tsx";
import goldMedal from '../../assets/images/gold-medal.png';
import silverMedal from '../../assets/images/silver-medal.png';
import bronzeMedal from '../../assets/images/bronze-medal.png';

const RankingWindow = ({ onClose }) => {
    const nbRes = 11;
    const [page, setPage] = useState(1);
    const [ranks, setRanks] = useState([]);
    const [hasMore, setHasMore] = useState(true);  
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
                setRanks(prev => pageNum === 1 ? data.data : [...prev, ...data.data]);
                setHasMore(data.data.length === nbRes);
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
                        <div className="rowItem">{index < 3 ? 
                            <img src={index === 0 ? goldMedal : index === 1 ? silverMedal : bronzeMedal} alt="medal" /> 
                                : index + 1}
                        </div>
                        <div className="rowItem">{rank.pseudo}</div>
                        <div className="rowItem">{Array.isArray(rank.gain) && rank.gain.length === 0 ? 0 : rank.gain}</div>
                    </div>
                ))}
            </div>
            {hasMore && (
                <div className="container-listButton">
                    <Button
                        styleClass="btn-loadMore back-color1"
                        label={getTranslatedWord("ranking.loadMore")}
                        onClick={() => fetchRankings(page + 1)}
                    />
                </div>
            )}
        </div>
    );
};

export default RankingWindow;
