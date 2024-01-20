import { useState } from "react";
import "./App.css";

import React from "react";

interface CardProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="rounded border border-gray-300 flex flex-col mb-2 px-4 py-4 max-w-4xl">
      <div className=" text-sm font-medium">{title}</div>
      <p className="text-gray-700 text-base flex justify-center">{children}</p>
    </div>
  );
}

interface PlayerInput {
  name: string;
  currentHp: number;
  maxHp: number;
}

function PlayersInput() {
  const [players, setPlayers] = useState<PlayerInput[]>([]);

  const handleAddPlayerClick = () => {
    setPlayers((previous) => [
      ...previous,
      { name: "", currentHp: 0, maxHp: 0 },
    ]);
  };

  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <span className="flex ">Players</span>
          <button
            className="bg-green-600 py-1 px-3 text-white border-solid border-1 border-black rounded-lg"
            onClick={handleAddPlayerClick}
          >
            Add
          </button>
        </div>
      }
    >
      {players.length > 0 ? (
        <hr className="my-4 border-gray-300" />
      ) : (
        <button className="hover:underline" onClick={handleAddPlayerClick}>
          Add a player
        </button>
      )}

      {players.length > 0 ? (
        <div className="flex flex-wrap gap-y-8">
          {players.map((player, playerIndex) => (
            <PlayerInput
              key={playerIndex}
              playerIndex={playerIndex}
              player={player}
              placeholder={`Player ${playerIndex + 1}`}
            />
          ))}
        </div>
      ) : null}
    </Card>
  );
}

function PlayerInput({
  player,
  placeholder,
  playerIndex,
}: {
  player: PlayerInput;
  placeholder: string;
  playerIndex: number;
}) {
  const [playerName, setPlayerName] = useState(player.name);
  const id = (tag: string) => `player-input-${playerIndex}-${tag}`;
  const nameId = id("name");
  const currentHpId = id("currentHp");
  const maxHpId = id("maxHp");

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-col">
        <label htmlFor={nameId}>Player name</label>
        <input
          type="text"
          id={nameId}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      <div className="flex flex-wrap">
        <input type="number" id={currentHpId} placeholder="Current HP" />
        /
        <input type="number" id={maxHpId} placeholder="Max HP" />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="p-8 flex flex-col gap-y-4">
      <h1 className="text-3xl font-bold">Goodberries!</h1>
      <PlayersInput />
    </div>
  );
}

export default App;
