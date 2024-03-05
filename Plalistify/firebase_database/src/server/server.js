
require('dotenv').config()
const express = require('express')
const spotifyWebApi = require('spotify-web-api-node')
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// 处理post请求
app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new spotifyWebApi({
        redirectUri : process.env.REDIRECT_URI,
        clientId : process.env.CLIENT_ID, 
        clientSecret : process.env.CLIENT_SECRET,
        refreshToken : refreshToken
    })

    spotifyApi.refreshAccessToken().then(
        (data) => {
            res.json({
                accessToken : data.body.accessToken,
                expiresIn : data.body.expiresIn
            })

        }).catch(() => {
            res.sendStatus(400)
        })
})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
        redirectUri : process.env.REDIRECT_URI,
        clientId : process.env.CLIENT_ID, 
        clientSecret : process.env.CLIENT_SECRET,
    })
    console.log("1")
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken : data.body.access_token,
            refreshToken : data.body.refresh_token,
            expiresIn : data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})


app.listen(3001)