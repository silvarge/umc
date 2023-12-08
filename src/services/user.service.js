import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { challengeMissionResponseDTO, changeUserMissionStatusResponseDTO, signinResponseDTO } from "../dtos/user.dto"
import { addChallengeMission, addUser, changeUserMission, getUser, getUserPreferToUserID, setPrefer } from "../models/user.dao";

// 회원가입 시 필요한 param 찾아 넣어야됨~
export const joinUser = async (body) => {
    //    (email, name, gender, birthYear, birthMonth, birthDay, address, specAddress, phone, category) => {
    const birth = new Date(body.birthYear, body.birthMonth, body.birthDay);
    const prefer = body.prefer;

    const reg_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    
    if(!reg_email.test(body.email)){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

    const joinUserData = await addUser({
        'email': body.email,
        'name': body.name,
        'gender': body.gender,
        'birth': birth,
        'addr': body.addr,
        'specAddr': body.specAddr,
        'phone': body.phone
    });

    if(joinUserData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        for (let i = 0; i < prefer.length; i++) {
            await setPrefer(joinUserData, prefer[i]);
        }
        return signinResponseDTO(await getUser(joinUserData), await getUserPreferToUserID(joinUserData));
    }
}

export const challengeMission = async (missionId, userId) => {

    if(!missionId || !userId){
        throw new BaseError(status.BAD_REQUEST);
    }else{
        const result = await addChallengeMission(parseInt(missionId), parseInt(userId));
        return challengeMissionResponseDTO(result);
    }

}

export const changeUserMissionStatus = async (query) => {

    const { userId, missionId, paging = 3} = query;

    if(!userId){
        throw new BaseError(status.BAD_REQUEST);
    }else{
        const result = await changeUserMission(parseInt(userId), parseInt(missionId), parseInt(paging));
        return changeUserMissionStatusResponseDTO(result);
    }
}