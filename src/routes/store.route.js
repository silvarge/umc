import express from "express";
import asyncHandler from 'express-async-handler';
import { reviewPreview, addReview, getStoreMissions } from "../controllers/store.controller";

export const storeRouter = express.Router({mergeParams: true});

storeRouter.post('/review', asyncHandler(addReview));

storeRouter.get('/reviews', asyncHandler(reviewPreview));
storeRouter.get('/mission', asyncHandler(getStoreMissions));