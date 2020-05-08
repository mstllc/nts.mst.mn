const express = require('express')
const bodyParser = require('body-parser')
const youtubedl = require('youtube-dl')

const port = 3000

const app = express()
app.use(bodyParser.json())

app.post('/api/mc', async (req, res, next) => {
  try {
    const info = await getMixcloudInfo(req.body.url)

    const data = {
      url: info.url,
      image: info.thumbnail,
      title: info.title,
      description: info.description,
      user: info.uploader,
      duration: info._duration_raw,
      contentType: `audio/${info.ext}`
    }

    return res.json(data)
  } catch (error) {
    console.log(error)

    res.status(500)
    return res.json({ error: error.message, status: 500 })
  }
})

app.listen(port, () => console.log(`nts.mst.mn listening on port ${port}`))



function getMixcloudInfo(url) {
  return new Promise((resolve, reject) => {
    try {
      youtubedl.getInfo(url, (error, info) => {
        if (error) return reject(error)

        return resolve(info)
      })
    } catch (error) {
      return reject(error)
    }
  })
}
