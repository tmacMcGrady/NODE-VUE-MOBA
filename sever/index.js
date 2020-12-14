const express = require("express")

const app = express()

app.use(require('cors')())
app.use(express.json())

//托管静态文件的路由
app.use('/uploads', express.static(__dirname + '/uploads'))
require('./routes/admin')(app)
require('./plugins/db')(app)
app.listen(3000,()=>{
  console.log("dsfgdfghttp://localhost:3000")
})