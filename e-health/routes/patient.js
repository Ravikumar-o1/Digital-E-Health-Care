var express = require('express');
var router = express.Router();
var multer = require('multer');
var Busboy = require('busboy');
var deepModel = require('node-tesseract-ocr');
const metaConfig = {
    lang: 'eng',
    oem: 1,
    psm: 3
}
var file = __dirname + "/uploads/";
const patientProfile = require('../Model/patientProfile.model');
const PatientData = require('../Model/PatientData.model');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: storage }).single('image');
router.post('/login', function(req, res, next) {
    var uid = req.body.uid;
    patientProfile.findOne({ uid: uid }, (err, data) => {
        if (err) {
            res.json('false');
            console.log(uid);
        } else if (data) {
            res.json('true');
        } else {
            res.json('false');
        }
    })
});

router.post('/profile', function(req, res, next) {
    var uid = req.body.uid;
    patientProfile.findOne({ uid: uid }, (err, data) => {
        if (err) {
            res.json('false');
        } else {
            // console.log(data);
            res.json(data);
            
        }
    })
});


router.post('/data', function(req, res) {
    const patient_uid = req.body.uid;
    //  console.log(uid);
    PatientData.find({ patient_uid: patient_uid }, (err, data) => {
        // if(data){
        // data.image = data.image.replace("\n","<br>");
        console.log(data.image);
        
        res.json(data);
        // }
    });
});

router.post('/upload', (req, res) => {

    var path = '';
    upload(req, res, (err) => {
        if (err) {
            // An error occurred when uploading
            console.log("err");
            return res.status(422).send("an Error occured");
        }

        req.body.image = req.file.filename;
        file = file + req.body.filename;
        console.log(req.file);

        deepModel.recognize(req.file.path, metaConfig)
            .then(data => {
                console.log(data);
                req.body.image = data;
                
                const patientdata = new PatientData(req.body);
                     patientdata.save(err => {
                if (err) {
                    res.json("Upload unsuccessful for ");
                } else {

                }
                path = req.file.filename;
                res.json("Upload Completed for " + path);
            });
            }).catch(err => {
                console.log("jkwefb")
            })


        console.log(req.body.image)
            // No error occured.
        
            //  req.body.image = textData;
            


    });

});



module.exports = router;