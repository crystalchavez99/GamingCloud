const express = require('express');
const db = require('../../db/models');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {requireAuth} = require("../../utils/auth");

router.get('/',asyncHandler(async(req,res)=>{{
    const comments = await db.Comment.findAll({
        include: [{model:db.User},{model:db.Song}],
        order: [["createdAt", "DESC"]]
    });
    return res.json({comments})
}}));
router.get('/:commentId',asyncHandler(async(req,res)=>{{
    const songId = parseInt(req.params.songId,10);
    const comments = await db.Comment.findAll({
        where: {songId},
        include: [{model:db.User},{model:db.Song}],
        order: [["createdAt", "DESC"]]
    })
    return res.json(comments)
}}));

router.post('/', asyncHandler(async(req,res)=>{
    const {userId,songId,body} = req.body;
    const comment = await db.Comment.create({
        userId,
        songId,
        body
    });
    return res.json({comment});
}))

router.delete('/:commentId', asyncHandler(async(req,res)=>{
    const id = parseInt(req.params.commentId,10);
    const comment = await db.Comment.findByPk(id)
    await comment.destroy();
    res.json({comment})
}))

module.exports =router;
