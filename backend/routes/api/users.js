// backend/routes/api/users.js
const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const db = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
const {singleMulterUpload, singlePublicFileUpload} = require('../../awsS3.js')

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('bio')
      .isLength({max: 256}),
    handleValidationErrors
  ];

router.get('/',asyncHandler(async(req,res)=>{
    const users = await User.findAll({
      include: [db.Song,db.Comment]
    });
    return res.json({users});
}));

router.get('/:userName',asyncHandler(async(req,res)=>{
  const username = req.params.userName;
    const user = await User.findOne({
      where: {username},
      include: [db.Song]
    });
    return res.json({user});
}));

// Sign up
router.post(
    '/',
    singleMulterUpload("image"),
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username, bio } = req.body;
      let profilePicture;
      if(req.file){
        profilePicture  = await singlePublicFileUpload(req.file)
      }

      const user = await User.signup({ email, username, password, profilePicture, bio});

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    })
  );

  // edit user
  router.put('/:userName', asyncHandler(async (req, res) => {
    const username = req.params.userName;
    const user = await User.findOne({
      where: {username},
      include: [db.Song]
    });
    const {bio} = req.body;
    user.update({bio})
    await user.save();
    return res.json({user})

  }));
module.exports = router;
