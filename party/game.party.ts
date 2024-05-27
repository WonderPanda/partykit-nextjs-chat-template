import type * as Party from "partykit/server";
import { notFound, ok } from "./utils/response";
import { createActor } from "xstate";
import { gameServerMachine } from "@/lib/game-server.machine";

export default class GameServer implements Party.Server {
  constructor(public party: Party.Party) {}

  async onRequest(request: Party.Request) {
    console.log("GameServer.onRequest", request.url);
    // const messages = await this.ensureLoadMessages();

    // mark room as created by storing its id in object storage
    if (request.method === "POST") {
      // respond to authentication requests proxied through the app's
      // rewrite rules. See next.config.js in project root.
      if (new URL(request.url).pathname.endsWith("/auth")) {
        // await this.authenticateUser(request);
        // return ok();
      }

      await this.party.storage.put("id", this.party.id);

      const actor = createActor(gameServerMachine, {
        input: {
          gameId: this.party.id,
        },
      }).start();

      // https://stately.ai/docs/persistence
      const snapshot = actor.getPersistedSnapshot();
      await this.party.storage.put("game", snapshot);
      return ok();
    }

    // return list of messages for server rendering pages
    if (request.method === "GET") {
      //   if (await this.party.storage.get("id")) {
      //     return json<SyncMessage>({ type: "sync", messages });
      //   }
      return notFound();
    }

    // clear room history
    if (request.method === "DELETE") {
      //   await this.removeRoomMessages();
      //   this.party.broadcast(JSON.stringify(<ClearRoomMessage>{ type: "clear" }));
      //   this.party.broadcast(
      //     newMessage({
      //       from: { id: "system" },
      //       text: `Room history cleared`,
      //     })
      //   );
      return ok();
    }

    // respond to cors preflight requests
    if (request.method === "OPTIONS") {
      return ok();
    }

    return notFound();
  }
}
