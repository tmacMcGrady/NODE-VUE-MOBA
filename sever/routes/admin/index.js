
module.exports = app =>{
  const express = require("express")
  const router = express.Router({
    mergeParams:true // 这里是将参数合并
  })
  // const Category = require("../../models/category")
  router.get('/', async (req,res)=>{
    const queryOptions = {}
    if(req.Model.modelName === "Category"){
      queryOptions.populate = 'parent'
    }
    const model = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(model)
  })
  router.get('/:id', async (req,res)=>{
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  router.post('/', async (req,res)=>{
    const items = await req.Model.create(req.body)
    res.send(items)
  })
  router.put('/:id', async (req,res)=>{
    const items = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(items)
  })
  router.delete('/:id', async (req,res)=>{
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success:true
    })
  })
  app.use('/admin/api/rest/:resource',async (req, res, next)=>{
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  },router)


  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  app.post('/admin/api/upload',upload.single('file'),async (req, res)=>{
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}