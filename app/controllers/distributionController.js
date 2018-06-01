
var async = require('async'),
    securityUtils = require('../utils/securityUtils'),
    productService = require('../services/productService'),
    userService = require('../services/userService'),
    // destService = require('../services/destinationService'),
    reviewService = require('../services/reviewService'),
    pageConstants = require('../constants/pageInfoConstants'),
    productConstants = require('../constants/productConstants'),
    seoConstants = require('../constants/seoConstants');

var jade = require('jade'),
    html_pdf = require('html-pdf');

var download_config = {
  'image' : {
    "height": "10000px",
    "width": "600px",
    "border": "10px",
    "type": "jpg",
    "quality": "100"    
  },
  'pdf' : {
    "format": "a4",
    "orientation": "portrait",
    "border": "15px",
    "type": "pdf",
    // "header": {
    //   "height":"60px",
    //   "contents" : '</center style="background-color: white">traveldglobe<br>&nbsp;</center>'
    // },
    "footer":{
      "height":"60px",
      "contents" : {
        default: '<center style="background-color: white"><a href="http://www.traveldglobe.com">www.traveldglobe.com</a><br>&nbsp;<br>&nbsp;</center>',
        last: "<div style='background-color: white;font-size:8px;line-height:10px;'><strong>Disclaimer:- </strong>travel d'globe has created itinerary for its travellers and is responsible for the travellers who booked it from traveldglobe.com only. Based upon the weather conditions, traveldglobe.com reserves all right to change this itinerary.</div><center><a href='http://www.traveldglobe.com'>www.traveldglobe.com</a></center>"
      }
    }
  }
}

var html2Img = function(htmlSource, cb){
  html_pdf.create(htmlSource, download_config.image).toBuffer(function(err, buffer){
    if (err) {
      console.log(err);
      cb && cb(false);
    }
    cb && cb(buffer);
  });
}

var img2Pdf = function(imgBuffer, cb){

  imgHtml = '<html><head></head><body><img src="data:image/jpg;base64,' + imgBuffer.toString('base64') +'"></body></html>'
  html_pdf.create(imgHtml, download_config.pdf).toBuffer(function(err, buffer){
    if(err) {
      console.log(err);
      cb && cb(false);
    }
    cb && cb(buffer);
  });
}

exports.getProductDist = function(req, res){
  var type = req.body.type,
      product_slug = req.body.product_slug,
      watermark_req = req.body.msk2b=='yes';
      
  productService.getPlanProduct(product_slug, productConstants.PLANS, function(err, data){
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }
    data.watermark = watermark_req;
    res.render('distribution/productDist', data, function(err, htmlSource){
      if(err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      
      html2Img(htmlSource,function(imgBuffer){
        if(!imgBuffer){
          res.sendStatus(500);
          return;
        }
        if(type=='pdf'){
          img2Pdf(imgBuffer, function (pdfBuffer){
            if(!pdfBuffer){
              res.sendStatus(500);
              return;
            }
            res.status(200);
            res.set({'Content-Type':'application/pdf', "Content-Disposition": "attachment" });
            res.send(pdfBuffer);
          });
        }else{
          res.status(200);
          res.set({'Content-Type':'image/jpg', "Content-Disposition": "attachment" });
          res.send(imgBuffer);
        }
      });
    });
  });
}