import express from "express";
import asyncHandler from 'express-async-handler';

import { userAddMission, userLogin, userMissionList, userMissionStatusChange, userSignin, userWriteReview } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.post('/login', asyncHandler(userLogin));
userRouter.post('/signin', asyncHandler(userSignin));
userRouter.post('/mission/:storeId', asyncHandler(userAddMission));

userRouter.get('/review', asyncHandler(userWriteReview));
userRouter.get('/missions', asyncHandler(userMissionList));

userRouter.patch('/mission', asyncHandler(userMissionStatusChange));