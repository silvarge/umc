import AWS from 'aws-sdk'
import multer from 'multer';
import multerS3 from 'multer-s3';

// import { uuid } from './uuid.js';
import { v4 } from 'uuid';

import path from 'path';
import dotenv from 'dotenv';

import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

dotenv.config();    // .env 파일 사용

const s3 = new AWS.S3({
    region: process.env.AWS_S3_REAGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY
});

const createUUID = () => {
    const tokens = v4().split('-');
    console.log("token", tokens);
    return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};


// 확장자 검사 목록
const allowedExtensions =  ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

export const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, callback) => {
            const uploadDirectory = req.query.directory ?? '';
            const extension = path.extname(file.originalname);
            const uuid = createUUID();
            // extension 확인을 위한 코드 (확장자 검사용!)
            if(!allowedExtensions.includes(extension)){
                return callback(new BaseError(status.WRONG_EXTENSION));
            }
            callback(null, `${uploadDirectory}/${uuid}_${file.originalname}`)
        },
        acl: 'public-read-write'
    }),
    // 이미지 용량 제한 (5MB)
    limits: { fileSize: 5 * 1024 * 1024},
});