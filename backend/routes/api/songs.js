// backend/routes/api/songs.js
const express = require('express');
const db = require('../../db/models');
const asyncHandler = require('express-async-handler');
const router = express.Router();


 router.get('/',asyncHandler(async(req,res)=>{
     const songs = await db.Song.findAll();
     console.log(songs);
     return res.json({songs});
 }));
// router.get(`/:songId`,asyncHandler(async(req,res)=>{
//     const id = parseInt(req.params.songId);
//     const song = await db.Song.findByPk(id);
//     return res.json(song)
// }))

module.exports =router;
