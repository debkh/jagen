'use strict';

var express = require('express');
var controller = require('./document.controller');
var multiparty = require('connect-multiparty');
import * as auth from '../../auth/auth.service';

var multipartyMiddleware = multiparty();
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', multipartyMiddleware, auth.isAuthenticated(), controller.uploadPhoto, controller.create);
router.put('/:id', multipartyMiddleware, controller.uploadPhoto, controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;


// 'use strict';
//
// var express = require('express');
// var controller = require('./document.controller');
// import * as auth from '../../auth/auth.service';
//
// var multer = require('multer');
// // Requires multiparty
// var multiparty = require('connect-multiparty'),
//   multipartyMiddleware = multiparty();
//
// // app.use(function(req, res, next) {
// //   res.header("Access-Control-Allow-Origin", "http://localhost");
// //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// //   next();
// // });
// var storage = multer.diskStorage({ //multers disk storage settings
//   destination: function (req, file, cb) {
//     cb(null, __dirname + '../../../client/assets/')
//   },
//   filename: function (req, file, cb) {
//     var datetimestamp = Date.now();
//     cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
//   }
// });
//
// var upload = multer({ //multer settings
//   storage: storage
// }).single('file');
//
//
//
//
// var router = express.Router();
//
// router.get('/', controller.index);
// router.get('/:id', controller.show);
// // router.post('/', multipartyMiddleware, auth.isAuthenticated(), function(req, res) {
// //   upload(req,res,function(err){
// //     if(err){
// //       res.json({error_code:1,err_desc:err});
// //       return;
// //     }
// //     res.json({error_code:0,err_desc:null});
// //   })
// //
// // });
// router.post('/', multipartyMiddleware, auth.isAuthenticated(), controller.create);
// // router.post('/', multipartyMiddleware, controller.uploadPhoto);
//
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);
//
// module.exports = router;
