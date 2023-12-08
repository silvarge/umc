import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { registMission, registRegion } from "../services/owner.service.js";

export const addMission = async (req, res, next) => {
    res.send(response(status.SUCCESS, await registMission(req.body)));
}

export const addRegion = async (req, res, next) => {

    console.log("Add region");
    console.log(req.body);

    res.send(response(status.SUCCESS, await registRegion(req.body)));
}