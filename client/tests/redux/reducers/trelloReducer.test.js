import trelloReducer from "../../../redux/reducers/trelloReducer";
import { GET_TRELLO_LISTS, SAVE_TRELLO_LIST_INFO } from "../../../redux/actions/types";

// unexpected type
test("trelloReducer: returns default when passed unexpectedly typed action", () => {
    expect(trelloReducer(undefined, { type: "unexpected" })).toEqual(null);
});

// GET_TRELLO_LISTS
test("trelloReducer: saving auth and getting user's trello boards from trello API", () => {
    expect(
        trelloReducer(null, {
            type: GET_TRELLO_LISTS,
            token: "token",
            secret: "secret",
            boards: [
                {
                    name: "Course CAB299",
                    id: "55b5d0ae0d9797359f60dc7f",
                    listArray: [
                        {
                            name: "To Do",
                            id: "55b5d0ae0d9797359f60dc80"
                        },
                        {
                            name: "Doing",
                            id: "55b5d0ae0d9797359f60dc81"
                        },
                        {
                            name: "Done",
                            id: "55b5d0ae0d9797359f60dc82"
                        }
                    ]
                }
            ]
        })
    ).toEqual({
        token: "token",
        secret: "secret",
        boards: [
            {
                name: "Course CAB299",
                id: "55b5d0ae0d9797359f60dc7f",
                listArray: [
                    {
                        name: "To Do",
                        id: "55b5d0ae0d9797359f60dc80"
                    },
                    {
                        name: "Doing",
                        id: "55b5d0ae0d9797359f60dc81"
                    },
                    {
                        name: "Done",
                        id: "55b5d0ae0d9797359f60dc82"
                    }
                ]
            }
        ]
    });
});

// SAVE_TRELLO_LIST_INFO
test("trelloReducer: saving details of which board/list was imported", () => {
    expect(
        trelloReducer(null, {
            type: SAVE_TRELLO_LIST_INFO,
            listID: "imported-list-id",
            listName: "imported-list-name",
            boardID: "imported-board-id",
            boardName: "imported-board-name"
        })
    ).toEqual({
        importListID: "imported-list-id",
        importListName: "imported-list-name",
        importBoardID: "imported-board-id",
        importBoardName: "imported-board-name"
    });
});
