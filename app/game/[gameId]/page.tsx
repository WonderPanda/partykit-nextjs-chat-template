import { PARTYKIT_URL } from "@/app/env";
import { Game } from "./Game";

export const revalidate = 0;

interface Params {
  gameId: string;
}

export default async function GamePage({
  params: { gameId },
}: {
  params: Params;
}) {
  const url = `${PARTYKIT_URL}/parties/game/${gameId}`;
  console.log(url);
  const res = await fetch(url, { next: { revalidate: 0 } });

  return <Game gameId={gameId} />;
}
