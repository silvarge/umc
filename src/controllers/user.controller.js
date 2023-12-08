import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { getLoginUser, getUserMissionList, getUserReview } from "../providers/user.provider.js";
import { challengeMission, changeUserMissionStatus, joinUser } from "../services/user.service.js";

export const userLogin = async (req, res, next) => {
    
    console.log("로그인을 요청하였습니다!");
    console.log("email:", req.body.email);    // param에서 값이 어떻게 오나 확인

    res.send(response(status.SUCCESS, await getLoginUser(req.body.email)));
}

export const userSignin = async (req, res, next) => {
    console.log("회원가입을 요청하였습니다!");
    console.log("body:", req.body);

    res.send(response(status.SUCCESS, await joinUser(req.body)));
}

export const userAddMission = async (req, res, next) => {
    console.log("userAddMission");
    console.log(req.params.storeId);

    res.send(response(status.SUCCESS, await challengeMission(req.params.storeId, req.body.userId)));
}

export const userWriteReview = async (req, res, next) => {
    console.log("userWriteReview");
    console.log("query", req.query);

    res.send(response(status.SUCCESS, await getUserReview(req.query)));
}

export const userMissionList = async (req, res, next) => {
    console.log("userMissionList");
    console.log("query", req.query);

    res.send(response(status.SUCCESS, await getUserMissionList(req.query)));
}

export const userMissionStatusChange = async (req, res, next) => {
    console.log("userMissionList");
    console.log("query", req.query);

    res.send(response(status.SUCCESS, await changeUserMissionStatus(req.query)));
}