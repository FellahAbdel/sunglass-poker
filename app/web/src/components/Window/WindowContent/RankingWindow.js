import React, { useEffect, useState } from "react";
import { useTranslation } from "../../Utiles/Translations";
import Button from "../../button/Button.tsx";
import goldMedal from "../../assets/images/gold-medal.png";
import silverMedal from "../../assets/images/silver-medal.png";
import bronzeMedal from "../../assets/images/bronze-medal.png";
import { useAuth } from "../../Utiles/AuthProvider.jsx";

const RankingWindow = ({}) => {
  const nbRes = 11;
  const [page, setPage] = useState(1);
  const [ranks, setRanks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { getTranslatedWord } = useTranslation();
  const { fetchRankings } = useAuth();

  const loadRankings = async (pageNum) => {
    const response = await fetchRankings(pageNum, nbRes);
    if (response.success) {
      setPage(pageNum);
      setRanks((prevRanks) =>
        pageNum === 1 ? response.rankings : [...prevRanks, ...response.rankings]
      );
      setHasMore(response.hasMore);
    } else {
      console.error("Failed to fetch rankings:", response.message);
    }
  };

  useEffect(() => {
    loadRankings(1);
  }, []);

  return (
    <div className="listTableWindow">
      <div className="listTableHeader">
        <div className="headerItem">{getTranslatedWord("ranking.rank")}</div>
        <div className="headerItem">{getTranslatedWord("ranking.pseudo")}</div>
        <div className="headerItem">{getTranslatedWord("SC")}</div>{" "}
      </div>
      <div className="listTableBody">
        {ranks.map((rank, index) => (
          <div className="tableRow" key={index}>
            <div className="rowItem">
              {index < 3 ? (
                <img
                  src={
                    index === 0
                      ? goldMedal
                      : index === 1
                      ? silverMedal
                      : bronzeMedal
                  }
                  alt="medal"
                />
              ) : (
                index + 1
              )}
            </div>
            <div className="rowItem">{rank.pseudo}</div>
            <div className="rowItem">{rank.coins}</div>{" "}
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="container-listButton">
          <Button
            styleClass="btn-loadMore back-color1"
            label={getTranslatedWord("ranking.loadMore")}
            onClick={() => loadRankings(page + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default RankingWindow;
