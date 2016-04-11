'use strict';

var express = require('express');
var controller = require('./upload.controller');
var multiparty = require('connect-multiparty');
import * as auth from '../../auth/auth.service';

var multipartyMiddleware = multiparty();
var router = express.Router();

router.post('/image', multipartyMiddleware, auth.hasRole('admin'), controller.uploadImage);
module.exports = router;