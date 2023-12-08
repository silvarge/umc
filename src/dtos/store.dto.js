import moment from "moment";

export const previewReviewResponseDTO = (data) => {

    const reviews = [];

    for (let i = 0; i < data.length; i++) {
        reviews.push({
            "user_name": data[i].user_name,
            "rate": data[i].rate,
            "review_body": data[i].review_content,
            "create_date": moment(data[i].created_at).format('YYYY.MM.DD')
        })
    }

    return {"reviewData": reviews, "cursorId": data[data.length-1].review_id};
}

export const registReviewResponseDTO = (data) => {
    return {"username": data.user_name, "rate": data.rate, "content": data.review_content, "created_at": moment(data.created_at).format('YYYY.MM.DD')};
}

export const storeMissionResponseDTO = (data) => {

    const mission = [];
    for (let i = 0; i < data.length; i++) {
        mission.push({
            "missionId": data[i].mission_id,
            "Content": data[i].mission_content,
            "Deadline": moment(data[i].mission_deadline).format('YYYY.MM.DD HH:mm'),
            "point": data[i].mission_point,
            "status": data[i].mission_status,
            "createAt": moment(data[i].created_at).format('YYYY.MM.DD')
        });
    }

    return {"mission": mission};
}
