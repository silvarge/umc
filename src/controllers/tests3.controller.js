
export const testS3Controller = (req, res, next) => {

    console.log(req.params);
    console.log("이미지 경로", req.file.location);

    res.send("Image Upload!");
};