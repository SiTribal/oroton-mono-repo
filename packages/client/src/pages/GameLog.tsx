import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GameTile } from "../components/Tiles";
import { useLocalStorage } from "../hooks";
import s from "./Pages.module.css";
import { get } from "../utils/http";

const GameLog: React.FC = () => {
  const [boardSize, setBoardSize] = useState<any>('')
  const [moves, setMoves] = useState<any>('')
  const { id } = useParams();
  
  
  useEffect(() => {
    get(`/game/${id}`).then((res: any) => {
      setBoardSize(res.boardSize)
      setMoves(res.moves)
    });
  },[id]);

  // const [previousGames] = useLocalStorage<any>("previous-games", []);
  // const {id} = useParams()
  const navigate = useNavigate();
  const boardDisplay = Array(boardSize * boardSize)
    .fill("_")
    .map((el, i) => `{"x":${i % boardSize}, "y":${Math.floor(i / boardSize)}}`);

    console.log(boardDisplay)
    boardDisplay.forEach((el) => {
      if(Object.hasOwn(moves,el)){
        console.log(moves[el])
      }
    })
  const display = boardDisplay.map((el) => {

  })

  return (
    <div
      className={s.container}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${boardSize}, auto)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
      }}
    >
      {boardDisplay.map((id, i) => {
        let className;
        let child;
        // console.log(Object.hasOwn(moves, id))
        if(Object.hasOwn(moves, id)){
            const color = moves[id];  
            className = `${s[color]} ${s.finishTile}`
        }
        else{
          className = s.finishTile
        }
        return (
          <GameTile className={className} clickFunction={() => {}} id={id}>
            <span>{child}</span>
          </GameTile>
        );
      })}
      <button
        style={{
          border: "grey 1px solid",
          padding: "1rem",
          fontSize: "2rem",
          color: "white",
          background: "grey",
          position: "absolute",
          top: "10rem",
          left: "50rem",
        }}
        onClick={() => navigate("/games")}
      >
        back
      </button>
    </div>
  );
};

export default GameLog;
