var tesseract = require('node-tesseract');

const config = {
    lang: 'eng',
    oem: 1,
    psm: 3
}


tesseract.process('../uploads/p.jpg', config,(err,data)=>{

    if(err)
    {
        console.log(err)
    }
    else{
        console.log(data)
    }
});