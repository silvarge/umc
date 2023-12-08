import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

dotenv.config();    // .env 파일 사용 (환경 변수 관리)

export const verifyToken = (req, res, next) => {

    try{
        req.decoded = jwt.verify(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET);
        return next();
    } catch (err) {
        // 인증 실패
        if(err.name === "TokenExpiredError"){
            throw new BaseError(status.TOKEN_IS_EXPIRED);
        }
        if(err.name === "JsonWebTokenError"){
            throw new BaseError(status.TOKEN_IS_INVALID)
        }
    }

}