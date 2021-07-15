const path = require('path');
const archiver = require('archiver');
const helperFunctions = require('./../functions/helperFunctions');
const initResults = require('../server')
const colors = require('../config/chalk')
const { dirname } = require('path');
const fs = require('fs')
// const manifest = require('../Collections/manifest.json')
const apiTest = (req, res, next) => {
    res.status(200).json({msg: 'Api Test Success!'})
}
const getArchiveFiles =(req, res, next)=> {
    if (!req.params.path) {
        helperFunctions.rej('No path specified')
        res.status(400).json({msg: 'No path specified'})
        return
    }
    res.status(200).sendFile(path.resolve(__dirname + `./../Collections/${req.params.path}`))

}
const getArchiveDirectory =(req, res, next)=> {
    if (!req.params.path) {
        helperFunctions.rej('No path specified')
        res.status(400).json({msg: 'No path specified'})
        return
    }
    res.status(200).json({msg: helperFunctions.getArchiveDirectory(`./Collections/${req.params.path}`)})
}
const getCollectionManifest = async (req, res, next) => {
    
    res.status(200).json(await helperFunctions.generateManifest())
}


module.exports.apiTest = apiTest
module.exports.getArchiveFiles = getArchiveFiles
module.exports.getArchiveDirectory = getArchiveDirectory
module.exports.getCollectionManifest = getCollectionManifest