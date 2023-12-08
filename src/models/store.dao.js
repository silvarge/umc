import { pool } from "../../config/db.connect";
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { checkUserIsExist, countMission, getReviewByReviewId, getReviewsByReviewId, getReviewsByReviewIdAtFirst, getStoreMissionSql, insertReviewSql } from "./store.sql";

export const getPreviewReview = async (cursorId, size, storeId) => {
    try {
        const conn = await pool.getConnection();

        if(!cursorId){
            const [reviews] = await pool.query(getReviewsByReviewIdAtFirst, [parseInt(storeId), parseInt(size)]);
            conn.release();
            return reviews;
        }else{
            const [reviews] = await pool.query(getReviewsByReviewId, [parseInt(storeId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return reviews;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const addDBToReview = async (userId, storeId, rate, context) => {
    try {
        const conn = await pool.getConnection();

        const [check] = await pool.query(checkUserIsExist, userId);

        if(parseInt(check[0].flag)){
            const [insertResult] = await pool.query(insertReviewSql, [userId, storeId, rate, context]);
            const [review] = await pool.query(getReviewByReviewId, insertResult.insertId);
            conn.release();

            return review[0];
        }else{
            conn.release();
            throw new BaseError(status.NOT_FOUND);
        }

    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getStoreMissions = async (storeId, missionId, paging) => {
    try {
        const conn = await pool.getConnection();
        if(missionId == -1){
            const [temp] = await conn.query(countMission);
            missionId = temp[0].missionCount;
        }
        const [result] = await pool.query(getStoreMissionSql, [storeId, missionId, paging]);

        conn.release();
        return result;
    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}