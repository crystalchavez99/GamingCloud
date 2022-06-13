// backend/routes/api/songs.js
const express = require('express');
const db = require('../../db/models');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {requireAuth} = require("../../utils/auth");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {multipleMulterUpload, singlePublicFileUpload, singleMulterUpload} = require('../../awsS3.js')

const validateSong = [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a title.'),
  check('songCover')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a song cover.'),
  check('genre')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a genre.'),
  handleValidationErrors
];


 router.get('/all',asyncHandler(async(req,res)=>{
     const songs = await db.Song.findAll({
       include: [db.User,db.Comment]
     });
     return res.json({songs});
 }));
 router.get(
  '/',
  (req, res) => {
    const { song } = req;
    if (song) {
      return res.json({
        song
      });
    } else return res.json({});
  }
);
 router.post(`/`,singleMulterUpload("audio"),validateSong,asyncHandler(async (req,res)=>{

  const {title, genre, userId,songCover} = req.body;
  const url =  await singlePublicFileUpload(req.file);
  const song = await db.Song.create({
      title,
      songCover,
      url: url,
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

 router.put(`/:songId`, validateSong,asyncHandler(async(req,res)=>{
  console.log('enter edit route')
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
    console.log('song update status',song)
    await song.save();
    return res.json({song});
 }))
 router.delete(`/:songId`, asyncHandler(async(req,res)=>{
    const id = parseInt(req.params.songId, 10);
    const song = await db.Song.findByPk(id);
   await song.destroy();
   res.json({song})
   //res.redirect("/");
 }))
module.exports =router;
