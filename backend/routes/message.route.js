const router = require('express').Router();
const accountSid = 'private';
const authToken = 'private';
const client = require('twilio')(accountSid, authToken);

var dict = {
    "angry": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/serious-face-with-symbols-covering-mouth_1f92c.png",
    "crying": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/loudly-crying-face_1f62d.png",
    "happy": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/smiling-face-with-open-mouth_1f603.png",
    "hearts": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/smiling-face-with-smiling-eyes-and-three-hearts_1f970.png",
    "neutral": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/neutral-face_1f610.png",
    "party": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/face-with-party-horn-and-party-hat_1f973.png",
    "poop": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/pile-of-poo_1f4a9.png",
    "rich": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/money-mouth-face_1f911.png",
    "sad": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/white-frowning-face_2639.png",
    "sick": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/nauseated-face_1f922.png"
};

router.route('/').post((request, response) => {
    const {body, from, to, emoji} = request.body;

    client.messages.create({
        body: body,
        from: from,
        to: to,
        mediaUrl: dict[emoji],
    })
    .then(message => response.json(message.sid))
    .catch(err => response.json(err));
});

router.route('/log').get((request, response) => {
    client.messages.list()
        .then(messages => {
            response.json(messages);
        })
        .catch(err => response.json(err));
});

module.exports = router;