const router = require('express').Router();
let rPost = require('../models/post.model');

router.route('/viewAllPosts').get((request, response) => {
    rPost.find()
        .then(posts => response.status(200).json(posts))
        .catch(err => response.status(400).json(err));
});

router.route('/viewYourPosts/:id').get((request, response) => {
    rPost.find()
        .then(posts => {response.status(200).json(posts.filter(p => p.userEmail == request.params.id));})
        .catch(err => response.status(400).json("Error:" + err));
});

router.route('/createPost').post((request, response) => {
    const {userFirstName, userLastName, userEmail, emoji, content} = request.body;
    const d = new Date();
    const datePosted = d.toLocaleString("en-US", {timeZone: "America/New_York"});


    const newPost = new rPost({
        userFirstName,
        userLastName,
        userEmail,
        emoji,
        content,
        datePosted
    });

    newPost.save()
        .then(() => response.status(200).json("Post Added!"))
        .catch(err => response.status(400).json("Errorsped: " + err));
});

router.route('/updatePost/:id').post((request, response) => {
    rPost.findById(request.params.id)
        .then(post => {
            if (post.userEmail != request.body.userEmail) {
                return response.status(400).json("This isn't your post. You can't edit it..");
            }

            post.userFirstName = request.body.userFirstName;
            post.userLastName = request.body.userLastName;
            post.userEmail = request.body.userEmail;
            post.emoji = request.body.emoji;
            post.content = request.body.content;

            post.save()
                .then(() => response.status(200).json("Post Updated!"))
                .catch(err => response.status(400).json("Error: " + err));
        });
});

router.route('/deletePost/:id').delete((request, response) => {
    rPost.findByIdAndDelete(request.params.id)
        .then(() => response.status(200).json("Post Deleted"))
        .catch(err => response.status(400).json("Error: " + err));
})

module.exports = router;