const { v4: uuidv4 } = require("uuid")
var moment = require("moment")

const shortid = require("shortid")
const URL = require("../models/url.js")

async function handleGenerateNewShortURL(req, res) {
  const body = req.body
  if (!body.url) return res.status(400).json({ error: "url is required" })
  const shortID = shortid()

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    emailM: body.emailM,
    username: body.username,
    visitHistory: [],
  })

  return res.json({ id: shortID })
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId
  const result = await URL.findOne({ shortId })
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  })
}
async function handleAllAnalytics(req, res) {
  const getExpireDate = (date_string) => {
    var expiration = moment(date_string).format("YYYY-MM-DD")
    var current_date = moment().format("YYYY-MM-DD")
    var days = moment(expiration).diff(current_date, "days")
    return days
  }

  const users = await URL.find()
  let response = users.filter((user) => {
    const expiryDate = getExpireDate(user?.createdAt)
    if (expiryDate < -1.9) {
      return false
    }
    return true
  })
  console.log(response);


  response = response?.map((user) => ({
    key: uuidv4(),
    shortId: user?.shortId,
    redirectURL: user?.redirectURL,
    email: user?.emailM,
    username: user?.username,
    visitHistory: user?.visitHistory.length,
    expireDate: getExpireDate(user?.createdAt) ,
  }))

  return res.status(200).json({
    success: true,
    response,
    message: "All fetch",
  })
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleAllAnalytics,
}
