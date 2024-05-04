"use client";
import usePartySocket from "partysocket/react";
import React, { useState } from "react";
import { PARTYKIT_HOST, PARTYKIT_URL } from "../env";
import { Box } from "@/components/ui/Box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Hashids from "hashids";
import { useRouter } from "next/navigation";

const hashIds = new Hashids();

export interface GameLobbyProps {}

export const GameLobby: React.FC<GameLobbyProps> = () => {
  const router = useRouter();
  const [gameCode, setGameCode] = useState("");

  const onCreateGame = async () => {
    const gameId = hashIds.encode(Date.now());
    console.log("Game ID", gameId);

    await fetch(`${PARTYKIT_URL}/parties/game/${gameId}`, {
      method: "POST",
    });

    router.push(`/game/${gameId}`);
  };

  const onJoinGame = () => {
    if (!gameCode) return;
  };

  return (
    <Box vStack center>
      <Box hStack>
        <Input
          onChange={(e) => setGameCode(e.target.value)}
          placeholder="Enter Game Code"
        />
        <Button disabled={gameCode.length === 0} variant="outline">
          Join
        </Button>
      </Box>
      <Box hStack center>
        <div className="bg-gray-400 w-6 h-0.5"></div>
        Or
        <div className="bg-gray-400 w-6 h-0.5"></div>
      </Box>
      <Button onClick={onCreateGame}>Create Game</Button>
    </Box>
  );
};
