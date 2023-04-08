const express = require("express")
const cors = require("cors");
const authRoutes = require('./routes/auth.js')
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const bodyParser = require('body-parser');

const accountsid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingid=process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClinet = require('twilio')(accountsid, authToken);


app.use(cors({
    methods: ['GET', 'POST']
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({
    extended: false
}));



app.get('/', (req, res) => {
    res.send("hello World");
});



app.post('/', (req, res) => {
    const { message, user: sender, type, members } = req.body;
    if (type === 'message.new') {
        members
            .filter((member)=>member.user_id!==sender.id)
            .forEach(({ user }) => {
            if (!user.online) {

                    twilioClinet.messages.create({
                        body:`You got a new message from ${message.user.fullName} -${message-text}`,
                        messagingServiceSid: messagingid,
                        to:user.phoneNumber
                    }).then(()=>console.log("Message sent"))
                        .catch((err)=>console.log(err))
            }
        })
        return res.status(200).send("Message sent");
    }
    return res.status(200).send("Not a new message request");
})




app.use('/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})