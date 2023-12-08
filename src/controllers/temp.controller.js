// 요청이 오면 그에 대한 응답 전달
import { status } from '../../config/response.status.js';
import { CheckFlag, getAllUser, getTempData } from '../services/temp.service.js';
import { response } from '../../config/response.js';


export const myLogger = (req, res, next) => {
    console.log("LOGGED");
    next();
}

export const tempTest = (req, res, next) => {
    console.log("/temp/test");
    res.send(response(status.SUCCESS, getTempData()));
};

export const tempException = (req, res, next) => {
    console.log("/temp/exception/"+req.params.flag);
    res.send(response(status.SUCCESS, CheckFlag(req.params.flag)));
}

export const tempDatabase = async (req, res, next) => {
    console.log("/temp/database/");
    res.send(response(status.SUCCESS, await getAllUser()));
}