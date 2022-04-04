// backend/routes/api/songs.js
const express = require('express');
const db = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection, isAuthorized } = require("../utils");
const { requireAuth } = require('../auth');
const router = express.Router();

router.get('/upload',requireAuth,asyncHandler(async(req,res)=>{
    const song = await db.Song.build();
    if(!res.locals.authenticared){
        return res.redirect(`/login`);
    }
}));
