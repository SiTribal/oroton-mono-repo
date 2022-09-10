import React, { useEffect, useState, useContext } from "react";
import { GameSetupContext } from "../context";
import * as components from "../components";
import { useLocalStorage } from "../hooks";
import s from "./Pages.module.css";
import { del, post } from "../utils/http";
import { Game } from "@si/shared";
import { useNavigate } from "react-router-dom";
const { BoardDisplay } = components;

const MainGame: React.FC = () => {
  const gameSetupContext = useContext(GameSetupContext);
  const { gameId, setGameIdCB } = gameSetupContext as any;
  const [boardSize] = useLocalStorage<any>("boardSize", []);
  const [user] = useLocalStorage<any>("user", []);
  const [win, setWin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const gameId: any = localStorage.getItem("gameId");
    if (gameId != null) {
      console.log(gameId);
      setGameIdCB(gameId);
    }
  });

  const setWinCB = (win?: boolean) => {
    if (win) {
      setWin(win);
    }
  };

  const resetHandler = () => {
    localStorage.removeItem("gameId");
    const game: Game = {
      username: user.user.username as string,
      boardSize: boardSize.boardSize as number,
    };
    console.log(gameId)
    del(`/game/delete/${gameId}`)
      .then((res) => localStorage.removeItem("gameId"))
      .catch((err) => console.log(err));
    post("/game/create", game)
      .then((res: any) => {
        localStorage.setItem("gameId", res.newGame._id);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const returnHomeHandler = () => {
    del(`/game/delete/${gameId}`)
      .then((res) => localStorage.removeItem("gameId"))
      .catch((err) => console.log(err));
    navigate("/");
  };

  return (
    <div className={s.mainGameContainer}>
      <button
        style={{
          border: "grey 1px solid",
          padding: "1rem",
          fontSize: "2rem",
          color: "white",
          background: "grey",
        }}
        onClick={() => resetHandler()}
      >
        RESET
      </button>
      <button
        style={{
          border: "grey 1px solid",
          padding: "1rem",
          fontSize: "2rem",
          color: "white",
          background: "grey",
        }}
        onClick={() => returnHomeHandler()}
      >
        Return Home
      </button>
      <div>
        <BoardDisplay
          gameId={gameId}
          boardMap={new Map()}
          boardSize={boardSize.boardSize}
          gameActive={true}
          setWinCB={setWinCB}
        />
      </div>
    </div>
  );
};

export default MainGame;
