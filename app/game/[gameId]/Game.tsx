"use client";
import { PARTYKIT_HOST } from "@/app/env";
import usePartySocket from "partysocket/react";
import React from "react";

export interface GameProps {
  gameId: string;
}

export const Game: React.FC<GameProps> = ({ gameId }) => {
  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    party: "game",
    room: gameId,
    onOpen: () => {
      console.log("Game socket open");
    },
    onMessage: () => {
      console.log("Game message");
    },
  });

  return (
    <div>
      <span>Game</span>
    </div>
  );
};
