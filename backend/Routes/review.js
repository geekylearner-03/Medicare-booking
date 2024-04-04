import express from 'express'
import { getAllreviews, createReview } from '../Controllers/reviewController.js'
import {authenticate, restrict} from './../auth/verifyToken.js'

const router = express.Router({mergeParams:true})

router
    .route('/')
    .get(getAllreviews)
    .post(authenticate, restrict(['patient']), createReview);

export default router;