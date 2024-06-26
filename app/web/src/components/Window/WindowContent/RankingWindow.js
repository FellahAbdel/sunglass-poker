import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "../../Utiles/Translations";
import Button from "../../button/Button.tsx";
import { useAuth } from "../../Utiles/AuthProvider.jsx";

/**
 * RankingWindow component fetches and displays a paginated list of user rankings,
 * including their rank, username (pseudo), and coin balance (SC).
 */
const RankingWindow = () => {
  const nbRes = 11;
  const [page, setPage] = useState(1);
  const [ranks, setRanks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { getTranslatedWord } = useTranslation();
  const { fetchRankings } = useAuth();

  /**
   * Fetch rankings data from the server and update the state.
   *
   * @param {number} pageNum - The page number to fetch.
   */
  const loadRankings = useCallback(async (pageNum) => {
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
  }, [fetchRankings]);

  // Fetch the initial rankings data when the component mounts.
  useEffect(() => {
    loadRankings(1);
  }, [loadRankings]);

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
                      ? "static/media/assets/images/gold-medal.png"
                      : index === 1
                      ? "static/media/assets/images/silver-medal.png"
                      : "static/media/assets/images/bronze-medal.png"
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
