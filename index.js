const express = require("express")
const cookieParser = require('cookie-parser')
require('dotenv').config()

const { connectToMongoDB } = require("./connect.js")
const urlRoute = require("./routes/url.js")
const userRoutes = require("./routes/user.js")
const URL = require("./models/url.js")

const app = express()

const cors = require("cors")

// connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
//   console.log("Mongodb connected")
// )
// connectToMongoDB(process.env.MONGO_DB).then(() =>
//   console.log("Mongodb connected")
// )
var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser());
//
app.use("/url", urlRoute)
app.use('/api/auth', userRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: "we are live",
  })
})

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  )
  res.redirect(entry.redirectURL)
})

app.listen(process.env.PORT, () => console.log(`Server Started at PORT:${process.env.PORT}`))
