import moment from "moment";

// login response DTO
export const loginResponseDTO = (data) => {
    return {"email": data[0].email};
}

// sign in response DTO
export const signinResponseDTO = (user, prefer) => {

    const preferFood = [];

    for (let i = 0; i < prefer[0].length; i++) {
        preferFood.push(prefer[0][i].f_category_name);
    }

    console.log("DTO", prefer);
    console.log("DTO>length", prefer[0].length);
    console.log("DTO>CATEGORY", preferFood);


    return {"email": user[0].email, "name": user[0].user_name, "preferCategory": preferFood};
}

export const challengeMissionResponseDTO = (result) => {
    return {
        "challenge_mission_id": result.u_mission_id,
        "store": result.restaurant_name,
        "mission": result.mission_content,
        "deadline": moment(result.mission_deadline).format('YYYY-MM-DD HH:mm')
    };
}

export const userReviewResponseDTO = (result) => {

    const reviewResult = [];

    for (let i = 0; i < result.length; i++) {
        reviewResult.push({
            "userId": result[i].user_id,
            "userName": result[i].user_name,
            "reviewId": result[i].review_id,
            "rate": result[i].rate,
            "reviewContext": result[i].review_content,
            "date": moment(result[i].created_at).format('YYYY-MM-DD')
        })
    }

    return {"review": reviewResult};
}

export const userMissionListResponseDTO = (result) => {

    const missionList = [];

    for (let i = 0; i < result.length; i++) {
        missionList.push({
            "userMissionId": result[i].u_mission_id,
            "missionId": result[i].mission_id,
            "status": result[i].u_mission_status,
            "context": result[i].mission_content,
            "deadline": moment(result[i].mission_deadline).format("YYYY.MM.DD HH:mm"),
            "point": result[i].mission_point,
            "created_at": moment(result[i].created_at).format("YYYY.MM.DD HH:mm")
        })
    }

    return {"mission": missionList};
}

export const changeUserMissionStatusResponseDTO = (result) => {
    const missionList = [];

    for (let i = 0; i < result.length; i++) {
        missionList.push({
            "userMissionId": result[i].u_mission_id,
            "missionId": result[i].mission_id,
            "status": result[i].u_mission_status,
            "context": result[i].mission_content,
            "created_at": moment(result[i].created_at).format("YYYY.MM.DD HH:mm")
        })
    }

    return {"mission": missionList};

}