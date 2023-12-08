import express from "express";
import asyncHandler from 'express-async-handler';
import { addMission, addRegion } from "../controllers/owner.controller";

export const ownerRouter = express.Router();

ownerRouter.post('/mission', asyncHandler(addMission));
ownerRouter.post('/region', asyncHandler(addRegion));