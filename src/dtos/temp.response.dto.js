export const userResponseDTO = (rows) => {
    const result = [];
    
    for (let i = 0; i < rows.length; i++) {
        const element = rows[i];
        result.push({"username": element.name, "userage": element.age});
    }

    return result;
}

export const tempResponseDTO = (data) => {
    return {"testString" : data};
}

export const flagResponseDTO = (flag) => {
    return {"flag" : flag};
}

