import express from 'express';
import { imageUploader } from '../middleware/image.uploader';
import { testS3Controller } from '../controllers/tests3.controller';

export const testS3Route = express.Router();

testS3Route.post('/image', imageUploader.single('image'), testS3Controller);