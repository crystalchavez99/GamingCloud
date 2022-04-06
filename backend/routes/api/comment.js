const express = require('express');
const db = require('../../db/models');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {requireAuth} = require("../../utils/auth");

router.get('/',asyncHandler(async(req,res)=>{{
    const comments = await db.Comment.findAll({
        order: [["createdAt", "DESC"]]
    });
}}));


