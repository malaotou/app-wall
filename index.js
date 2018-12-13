const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use('/wall',express.static('wall'))
  .use(bodyParser.urlencoded({
    extended: true
}))
.use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.send("req.header"))
  .post('/',(req,res)=>{res.send(200,req.body);})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
