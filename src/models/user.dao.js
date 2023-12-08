import { pool } from "../../config/db.connect";
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { challengeMissionSql, confirmEmail, connectFoodCategory, getChallengeMissionSql, getMyReviewSql, getPreferToUserID, getUserEmail, getUserID, getUserMissionListSql, insertUserSql, reviewCount, updateMissionStatusToSuccessSql, userMissionCount } from "./user.sql";

// log in
export const logInUser = async (data) => {
    try {
        const conn = await pool.getConnection();
        const [row] = await pool.query(getUserEmail, data);

        if(row.length != 0){
            console.log("dao", row);
            conn.release();
            return row;
        }else{
            conn.release();
            return -1;
        }
    } catch (err) {
        console.error(err);
    }
}

// sign in -> insert query
export const addUser = async (data) => {
    try{
        const conn = await pool.getConnection();
        // 
        const [confirm] = await pool.query(confirmEmail, data.email);

        // console.log("DAO", confirm[0][0].isExistEmail);

        if(confirm[0].isExistEmail){
            console.log("TEST");
            conn.release();
            return -1;
        }

        const result = await pool.query(insertUserSql, [data.email, data.name, data.gender, data.birth, data.addr, data.specAddr, data.phone]);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getUser = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await pool.query(getUserID, userId);

        // console.log("GETUSER", user);

        if(user.length == 0){
            return -1;
        }

        conn.release();
        return user;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const setPrefer = async (userId, foodCategoryId) => {
    try {
        const conn = await pool.getConnection();
        
        await pool.query(connectFoodCategory, [foodCategoryId, userId]);

        conn.release();
        // console.log("setPrefer", result);
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);

    }
}

export const getUserPreferToUserID = async (userID) => {
    try {
        const conn = await pool.getConnection();
        const prefer = await pool.query(getPreferToUserID, userID);

        conn.release();
        // console.log("getUserPrefer", prefer);

        return prefer;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const addChallengeMission = async (missionId, userId) => {

    try {
        const conn = await pool.getConnection();
        const [data] = await pool.query(challengeMissionSql, [missionId, userId]);
        const [result] = await pool.query(getChallengeMissionSql, data.insertId);

        conn.release();

        return result[0];
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getMyReview = async (userId, reviewId, paging) => {

    try {
        const conn = await pool.getConnection();
        
        if(reviewId==-1){
            const [temp] = await pool.query(reviewCount);
            reviewId = temp[0].reviewCount+1;
        }
        const [result] = await pool.query(getMyReviewSql, [userId, reviewId, paging]);
        
        conn.release();
        return result;
    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getUserMission = async (userId, missionId, paging, status) => {
    try {
        const conn = await pool.getConnection();

        if(missionId == -1){
            const [temp] = await pool.query(userMissionCount);
            missionId = temp[0].missionCount+1;
        }
        const [result] = await pool.query(getUserMissionListSql, [userId, missionId, status, paging]);

        conn.release();
        return result;
    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const changeUserMission = async (userId, missionId, paging) => {
    try {
        const conn = await pool.getConnection();

        await pool.query(updateMissionStatusToSuccessSql, missionId);
        
        const [result] = await pool.query(getUserMissionListSql, [userId, missionId, "success", paging]);

        conn.release();
        return result;
        
    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}