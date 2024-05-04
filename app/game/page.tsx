import React from "react";
import { Button } from "@/components/ui/button";
import { GameLobby } from "./GameLobby";

export default async function GameLobbyPage() {
  return (
    <div className="grid place-items-center w-full h-full">
      <GameLobby />
    </div>
  );
}
