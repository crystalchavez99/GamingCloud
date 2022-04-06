// backend/routes/api/songs.js
const express = require('express');
const db = require('../../db/models');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {requireAuth} = require("../../utils/auth");

 router.get('/',asyncHandler(async(req,res)=>{
     const songs = await db.Song.findAll({
       include: [db.User,db.Comment]
     });
     return res.json({songs});
 }));
 router.post(`/`,asyncHandler(async (req,res)=>{
    const {title, url, genre, songCover,userId} = req.body;
     const song = await db.Song.create({
         title,
         songCover,
         url,
         genre,
         userId
     })
     return res.json({song})
 }))
 router.get(`/:songId`,asyncHandler(async(req,res)=>{
     const id = parseInt(req.params.songId);
     const song = await db.Song.findByPk(id, {
      include: [{ model: db.User},]
    });
     return res.json(song)
 }))

 router.put(`/:songId`, asyncHandler(async(req,res)=>{
    const id = parseInt(req.params.songId, 10);
    const song = await db.Song.findByPk(id, {
      include: [{ model: db.User},]
    });
    const {title, url, genre,songCover} = req.body;
    song.update({
        title,
        url,
        genre,
        songCover
    });
    await song.save();
    res.json(song);
 }))
 router.delete(`/:songId`, asyncHandler(async(req,res)=>{
    const id = parseInt(req.params.songId, 10);
    const song = await db.Song.findByPk(id, {
      include: [{ model: db.User},]
    });
   await song.destroy();
   res.redirect("/");
 }))
module.exports =router;
