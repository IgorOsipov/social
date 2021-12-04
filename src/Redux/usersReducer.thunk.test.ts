import { actions, followUser } from "./usersReducer";
import SamServices from "../API/SamAPI";
import { apiResponceType, noDataResponceType } from "../API/SamApiTypes";
import { responceApiCodes } from "../Types/responceApiCodes";

jest.mock("../API/SamAPI");
const SamServicesMock = new SamServices() //as jest.Mocked<typeof SamServices>;
const result: noDataResponceType & apiResponceType = {
    resultCode: responceApiCodes.Success,
    data: {},
    messages: []
}

//@ts-ignore
new SamServices().followUser.mockReturnValue(Promise.resolve(result));

test("", async ()=>{
    const thunk = followUser(1);
    const dispatchMock = jest.fn();

    //@ts-ignore
    await thunk(dispatchMock);

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.follow(1));
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingInProgress(false, 1));

});