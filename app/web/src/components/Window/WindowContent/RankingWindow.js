//RankingWindow
import React from "react";
import './rankingWindow.css';
import { useEffect, useState } from "react";
import { useTranslation } from "../../Utiles/Translations";

const RankingWindow = ({ onClose }) => {

    var page = 1;
    const nbRes = 15;

    const [ranks, setRanks] = useState([]);
    const { getTranslatedWord } = useTranslation();

    const firstLoadRanking = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/get-all-ranking?page=1&nbres=" + nbRes,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            const data = await response.json();

            if (data.success) {
                setRanks(data.data);

            } else {
                throw "an unexpected error occured while loading ranking";
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    const loadMoreRanking = async (page) => {
        try {
            const response = await fetch("http://localhost:3001/api/get-all-ranking?page=" + page + "&nbres=" + nbRes,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            const data = await response.json();

            if (data.success) {
                // add data to DOM
                let table = document.getElementsByTagName("table")[0];
                let tbody = table.lastElementChild;

                for (let i=0; i<data.data.length; i++) {
                    let tr = document.createElement("tr");
                    let th = document.createElement("th");
                    let td1 = document.createElement("td");
                    let td2 = document.createElement("td");

                    th.scope = "row";
                    th.innerHTML = (page-1) * nbRes + i+1;
                    td1.innerHTML = data.data[i].pseudo;
                    td2.innerHTML = data.data[i].gain == [] ? data.data[i].gain : 0;

                    tr.appendChild(th);
                    tr.appendChild(td1);
                    tr.appendChild(td2);

                    tbody.appendChild(tr);

                }

            } else {
                throw "an unexpected error occured while loading ranking";
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        firstLoadRanking();
    }, []);


    return (
        <div class="container">

            <table>
                <thead>
                    <tr>
                    <th scope="col">{getTranslatedWord("ranking.rank")}</th>
                    <th scope="col">{getTranslatedWord("ranking.pseudo")}</th>
                    <th scope="col">{getTranslatedWord("ranking.gain")}</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {

                        const rows = []
                        for (let i=0; i<ranks.length; i++) {
                            if (i === 0) {
                                rows.push(
                                    <tr>
                                        <th scope="row"><img src={require("./../../assets/images/gold-medal.png")}/></th>
                                        <td>{ranks[i].pseudo}</td>
                                        <td>{ranks[i].gain == [] ? ranks[i].gain : 0}</td>
                                    </tr>
                                );
                            } else if(i === 1) {
                                rows.push(
                                    <tr>
                                        <th scope="row"><img src={require("./../../assets/images/silver-medal.png")}/></th>
                                        <td>{ranks[i].pseudo}</td>
                                        <td>{ranks[i].gain == [] ? ranks[i].gain : 0}</td>
                                    </tr>
                                );
                            } else if(i === 2) {
                                rows.push(
                                    <tr>
                                        <th scope="row"><img src={require("./../../assets/images/bronze-medal.png")}/></th>
                                        <td>{ranks[i].pseudo}</td>
                                        <td>{ranks[i].gain == [] ? ranks[i].gain : 0}</td>
                                    </tr>
                                );
                            } else {
                                rows.push(
                                    <tr>
                                        <th scope="row">{i+1}</th>
                                        <td>{ranks[i].pseudo}</td>
                                        <td>{ranks[i].gain == [] ? ranks[i].gain : 0}</td>
                                    </tr>
                                );
                            }
                        }
                        return rows;
                    })()}
                </tbody>
            </table>

            <button class="load-more" onClick={() => loadMoreRanking(++page)}>{getTranslatedWord("ranking.loadMore")}</button>

        </div>
    );
};

export default RankingWindow;