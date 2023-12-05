const express = require('express')
const app = express()
const port = 3000


//these are all middleware. facilitate communication or perform specific functions. access to the request and response objects.
//log info about incoming requests or outgoing responses, check whether user is authenticated before allowing access to certain routes or catch errors

app.use((req,res,next) => {
  console.log("first middleware");
  next() //go to next middleware
})

//shows hello world response from server
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/two', (req, res) => {
    res.send('Hello World 2!')
  })

//console.log
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//npx nodemon index.js --> automatically retarts server whenver i make changes to code
//node index.js --> stop server manually and run again to see changes in page