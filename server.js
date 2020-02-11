const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const port = process.env.PORT | 5000;

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, callback) =>{
        callback(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
}) 

// init

const upload = multer({
    storage: storage
}).single('myFile');

app.use(express.static('./public'));

app.get('/api/uploads', (req, res)=> {
    res.send('test');
})

app.post('/api/uploads', (req, res, ) => {

    upload(req, res, (error)=> {
         if(error) {
             res.send({ 'msg':error});
         } else {
             console.log(req.file);
             res.send("works");
         }
    })
    

})


app.listen(port, () => console.log(`Server is up and runnging on port ${port}`));