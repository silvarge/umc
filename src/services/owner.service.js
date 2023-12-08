import moment from "moment/moment";
import { registMissionResponseDTO, registRegionResponseDTO } from "../dtos/owner.dto"
import { addDBToMission, addDBToRegion, existRegion } from "../models/owner.dao";
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

export const registMission = async (data) => {

    const { storeId, content, deadline, point } = data;
    const deadline_D = moment(deadline).format();

    const result = await addDBToMission(storeId, content, deadline_D, point);

    console.log(result);

    return registMissionResponseDTO(result);
}

export const registRegion = async (data) => {

    const { storeId, region } = data;

    const result = await existRegion(region);
    const regionId = result.region_id;

    if(!regionId){
        throw new BaseError(status.NOT_FOUND);
    }else{
        const result = await addDBToRegion(storeId, regionId);
        return registRegionResponseDTO(result);
    }    
}