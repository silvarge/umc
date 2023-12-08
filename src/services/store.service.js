import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { registReviewResponseDTO } from "../dtos/store.dto";
import { addDBToReview } from "../models/store.dao";

export const registReview = async (storeId, body) => {

    const {userId, rate, content} = body;

    if(!userId || !rate || !content){
        throw new BaseError(status.BAD_REQUEST);
    }else{
        const result = await addDBToReview(userId, parseInt(storeId), rate, content);
        return registReviewResponseDTO(result);
    }
    
}