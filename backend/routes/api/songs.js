// backend/routes/api/songs.js
const express = require('express');
const db = require('../../db/models');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {requireAuth} = require("../../utils/auth");
const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

 router.get('/',asyncHandler(async(req,res)=>{
     const songs = await db.Song.findAll();
     console.log(songs);
     return res.json({songs});
 }));
 router.post(`/`,asyncHandler(async (req,res)=>{
    const {title, url, genre, userId} = req.body;
     const song = await db.Song.create({
         title,
         url,
         genre,
         userId
     })
     return res.json({song})
 }))
 router.get(`/:songId`,asyncHandler(async(req,res)=>{
     const id = parseInt(req.params.songId);
     const song = await db.Song.findByPk(id);
     return res.json(song)
 }))

module.exports =router;
