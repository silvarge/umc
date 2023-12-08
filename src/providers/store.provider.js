import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { previewReviewResponseDTO, storeMissionResponseDTO } from "../dtos/store.dto";
import { getPreviewReview, getStoreMissions } from "../models/store.dao";

export const getReview = async (storeId, query) => {
    const {reviewId, size = 3} = query;
    // default 값 넣기
    return previewReviewResponseDTO(await getPreviewReview(reviewId, size, storeId));
}

export const getMissions = async (storeId, query) => {
    const {missionId = -1, paging = 3} = query;
    return storeMissionResponseDTO(await getStoreMissions(parseInt(storeId), parseInt(missionId), parseInt(paging)));
}