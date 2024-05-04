import { createMachine, setup } from "xstate";

type GameEvents =
  | { type: "START_GAME" }
  | { type: "SUBMIT_DEFINITION"; definition: string }
  | { type: "ALL_SUBMITTED" }
  | { type: "SUBMIT_VOTE"; realVote: string; aiVote: string }
  | { type: "ALL_VOTED" }
  | { type: "NEXT_ROUND" }
  | { type: "END_GAME" };

export const machine = setup({
  types: {} as {
    events: GameEvents;
    context: { id: string; currentWord?: string };
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5RQIYFswDoA2B7ARvgJ4DEAygCoCCAShQPoDiVAsgKIDaADALqKgAHXLACWAFxG4AdvxAAPRAEYAbAGZMyrlq4BORQCZ9AFn1d9AGhBFEADkWZV2rYqMBWfcoDs+1QF9flqgYmALYKEQiUlCYEGAAZpHiklKwmLAArvho4hJR5ACqAEIsAJIMACJsAGIlAHJlJQDytdx8SCBCohLSsgoI+jpGmDquNvo23sY6nqo6ltYI7jqYdsprrlyO48o6-oHoWKHhkdGxCVJJ0qkZWTmQJFQAMo-0ZEWlFBRs5a2ynZcydp9TxaTCuIyqIzKUw2OzueaIVyOBwqdabMw2HZ7EBBQ5hCJRTAAN1wuWiJLJBWKZXoADVGl9fu1-t1AaA+oouDMNK4QTpBmNVDsLFZEfp7LNZlpXDKuEZPEZsbiQviTsTSWqKfcni96V8frw-sIAb0lPpPMNVKoPJ5PMoxvoNq4EQhMcskVbBhtdK5dgEcQcVcdCbAAMa4ABOcBItTYAA0GDRGvlaga2oJjazTQgDBadFabXaHU6XZD7KidtNodaZUrA0cCdEw5Ho2xU0xWJxDczM8ls4pVO4wVN5QYbEtPC6xjZMEZtJ53APx-p-P6pLhYvB2rijV0+0DEABaZQuw+uYb8y+220QiF+f3KvCEBYZvc9A8IExTiWXvQjVSTBCdbBA2Jy7iaH5rJa1peEWhglqK-RIisayVjYkouJ4NjAXiwanPEiSslur4QeySguNBhb2vBXDOohRgmGCFauJy3h2o6OFBo2MQERcRFpJk2RiGS4FZh+Kj6JRsHUY6tEukswyoq49qqBMJicaBhJnIRyTXIJdwQKJ+5kYsXDKLOphYTY-I+DYPryQMinrCpakrg+9aqoSFJgT2b5svIiA6HKmC0SCoxIpyagnvRkIhfmQVmdamxeBpnnkhqXkZVARnviZIySaFtHjqokVCg59hGPFvqXrCiruSBaXqmSTWQDl-kcj4kkzOajoTC4yiKDYLqaOZozJapcpmCVqV4Wk4ZRsRHS9rlAX9NCDiDnoWE6D4cmIWFmDiooigzHyAyKH6+zBOGaChGAYhgG1-aVeZpjzgxsIDHMiHTrOv75uOO21quQA */
  context: {
    id: "",
  },
  id: "game",
  initial: "lobby",
  states: {
    lobby: {
      on: {
        START_GAME: "playing",
      },
    },
    playing: {
      initial: "definitions",
      states: {
        definitions: {
          initial: "submitting",
          states: {
            submitting: {
              on: {
                SUBMIT_DEFINITION: "submitted",
              },
            },
            submitted: {
              on: {
                ALL_SUBMITTED: "#game.playing.voting",
              },
            },
          },
        },
        voting: {
          initial: "voting",
          states: {
            voting: {
              on: {
                SUBMIT_VOTE: "voted",
              },
            },
            voted: {
              on: {
                ALL_VOTED: "#game.playing.scores",
              },
            },
          },
        },
        scores: {
          on: {
            NEXT_ROUND: "definitions",
            END_GAME: "#game.complete",
          },
        },
      },
    },
    complete: {
      type: "final",
    },
  },
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAjACZ0AT0FDkU5EA */
});
