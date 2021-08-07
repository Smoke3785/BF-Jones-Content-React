const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');
var path = require('path');

router.get('/apiTest', controllers.apiTest);
router.get('/getArchiveFiles/:path?', controllers.getArchiveFiles)
router.get('/getArchiveDirectory/:path?', controllers.getArchiveDirectory)
router.get('/getManifest', controllers.getCollectionManifest)
router.get('/getDirImage/:path?', controllers.getDirImage)
router.get('/getImageFile/:path?', controllers.getImageFile)
module.exports = router;




