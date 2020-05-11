const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const {addVideoValidation} = require('../validation');

router.get('/', verify, async(req,res) => {
    console.log('/posts')
    const user = await User.findById({_id: req.user._id});
    //only return the posts for this user
    res.send(user);
})

router.post('/addVideo', verify, async(req,res) => {
      //Validate input
      const {error} = addVideoValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      //Get all user videos
      const user = await User.findById({_id: req.user._id});

      //Does the video exist?
      if (Object.values(user.videos).indexOf(req.body.url) > -1) return res.status(400).send('This URL already exists');

      //Add the new URL to the user's videos
      user.videos.push(req.body.url)
      
      //Save it in the DB
      try {
          const savedUser = await user.save();
          //let response = {message: 'Video added', videos: savedUser.user.videos}
          res.status(200).send({url: req.body.url});
      } catch(err){
          res.status(400).send(err)
      }

    //const user = await User.findById({_id: req.user._id});
    //only return the posts for this user
    
    // res.send(user);
})

module.exports = router;