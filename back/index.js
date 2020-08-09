const express = require("express");
const request = require("request");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//keyword=${word.basic_form}%20%23${this.getPos(word.pos)}
app.post("/getMeaning", (req, res) => {
  console.log(req.body)
  var url = "https://jisho.org/api/v1/search/words?keyword=" + req.body.word + "%20%23" + req.body.pos
  console.log(url)
  console.log(encodeURI(url))
  request(
    { url: encodeURI(url)},
    (error, response, body) => {
      if (error || response.statusCode != 200) {
        return res.status(500).json({type: "error", message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
