var {MongoClient} = require ('mongodb')
var express = require ('express')
var jwt = require ('jsonwebtoken')
var cors = require ('cors')



var mongoserver = new MongoClient ('mongodb://localhost:27017/')
var apiserver = express()
apiserver.use(express.json())
apiserver.use(cors())

apiserver.get('/getproduct',async(req,res)=>{
    await mongoserver.db('Mydata').collection('users').find().toArray()
    res.json({rec})
})