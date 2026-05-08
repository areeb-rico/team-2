var {MongoClient} = require ('mongodb')
var express = require ('express')
var jwt = require ('jsonwebtoken')
var cors = require ('cors')


var mongoserver = new MongoClient ('mongodb://localhost:27017/')
var apiserver = express()
apiserver.use(express.json())
apiserver.use(cors())

// GET API to fetch random data from MongoDB collection
apiserver.get('/api/random-data', async (req, res) => {
  try {
    // Connect to MongoDB
    await mongoserver.connect()
    console.log('Connected to MongoDB')
    
    // Access database and collection
    var database = mongoserver.db('team2db')  // Database name
    var collection = database.collection('data')  // Collection name
    
    // Fetch all documents from collection
    var data = await collection.find({}).toArray()
    console.log('Fetched data:', data)
    
    // Get random document
    if (data.length > 0) {
      var randomIndex = Math.floor(Math.random() * data.length)
      var randomData = data[randomIndex]
      console.log('Random document:', randomData)
      
      res.json({
        success: true,
        message: 'Random data fetched successfully',
        data: randomData
      })
    } else {
      res.json({
        success: false,
        message: 'No data found in collection'
      })
    }
    
  } catch (error) {
    console.log('Error fetching data:', error.message)
    res.status(500).json({
      success: false,
      message: 'Error fetching data',
      error: error.message
    })
  } finally {
    // Close connection
    await mongoserver.close()
  }
})

// Server listening
apiserver.listen(5000, () => {
  console.log('Server running on port 5000')
})

