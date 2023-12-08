// Read의 로직 처리 (GET 처리)
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { loginResponseDTO, userMissionListResponseDTO, userReviewResponseDTO } from "../dtos/user.dto.js";
import { getMyReview, getUserMission, logInUser } from "../models/user.dao.js";

export const getLoginUser = async (email) =>{

    // id, pw를 통해 DAO
    if(typeof email == "undefined"){
        throw new BaseError(status.LOGIN_PARAM_NOT_EXIST);
    }else{
        const userData = await logInUser(email);
        
        if(userData == -1){
            throw new BaseError(status.LOGIN_ID_NOT_EXIST);
        }else{
            return loginResponseDTO(userData);
        }
    }
}

export const getUserReview = async (query) => {

    const {userId, reviewId = -1, paging = 3} = query;

    if (!userId) {
        // 아이디 입력 안됨
        throw new BaseError(status.BAD_REQUEST);
    }else{
        const userData = await getMyReview(parseInt(userId), parseInt(reviewId), parseInt(paging));
        return userReviewResponseDTO(userData);
    }
}

export const getUserMissionList = async (query) => {

    const {userId, missionId = -1, paging = 3, status = 0} = query;

    if(!userId){
        throw new BaseError(status.BAD_REQUEST);
    }else{
        const userData = await getUserMission(parseInt(userId), parseInt(missionId), parseInt(paging), status);
        return userMissionListResponseDTO(userData);
    }
}