const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');
var path = require('path');

router.get('/apiTest', controllers.apiTest);
router.get('/getArchiveFiles/:path?', controllers.getArchiveFiles)
router.get('/getArchiveDirectory/:path?', controllers.getArchiveDirectory)
router.get('/getManifest', controllers.getCollectionManifest)
module.exports = router;




