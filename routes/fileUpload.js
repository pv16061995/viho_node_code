const filePathCommon = `../smpp_panel_viho/`;
const express = require('express');
const fs = require('fs');
const xlsx = require('xlsx');

var router = express.Router();

router.post('/getFileContent', (req, res) => {
    let filePath = filePathCommon + req.body.path;
    let fileExt = req.body.extension;
    console.log("reqBody>>",req.body,filePath);
    fileExt = fileExt.toLowerCase();

    fs.exists(filePath, function (doesExist) {
      if (doesExist) {
        console.log('file exists');
        if (fileExt == "csv") {
          fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
            if (!err) {
              let responseData = data.trim().split("\n");
              console.log('received data: ' + responseData);
              res.status(200).json({ success: true, message: "Data has been getting successfully!", data: responseData });
            } else {
              console.log(err);
              res.status(400).json({ success: false, message: "Error occued while getting the details!", data: err });
            }
          });
        }
        if (fileExt == "xlsx") {
          const file = xlsx.readFile(filePath)
          const sheets = file.SheetNames;
          const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
          let responseData = temp.map((value) => { return value["phone"] });
          console.log('received data: ' + responseData);
          res.status(200).json({ success: true, message: "Data has been getting successfully!", data: responseData });
        }
      } else {
        console.log('file not found!');
        res.status(400).json({ success: false, message: "file not found!", data: {} });
      }
    });
  });

  
module.exports = router;