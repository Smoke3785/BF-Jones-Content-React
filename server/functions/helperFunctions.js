const fs = require("fs")
const path = require("path")
const colors = require('../config/chalk')
let files  = [];

const getTime =()=> {
    let currentDate = new Date();
    if (currentDate.getMinutes() > 9) {
        if (currentDate.getSeconds() > 9 ) {
            return currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        } else {
            return currentDate.getHours() + ":" + currentDate.getMinutes() + ":0" + currentDate.getSeconds();
        }
    } else {
        if (currentDate.getSeconds() > 9 ) {
            return currentDate.getHours() + "0:" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        } else {
            return currentDate.getHours() + ":0" + currentDate.getMinutes() + ":0" + currentDate.getSeconds();
        }
    }
}


const err = (msg) => {
    console.log(`${colors.highlight(getTime())} ${colors.failure('ERR')} ${msg}`)
}
const rej = (msg) => {
    console.log(`${colors.highlight(getTime())} ${colors.failure('REJ')} ${msg}`)
}
const getFilesRecursively = (directory) => {
    const filesInDirectory = fs.readdirSync(directory);
    for (const file of filesInDirectory) {
      const absolute = path.join(directory, file);
      if (fs.statSync(absolute).isDirectory()) {
          getFilesRecursively(absolute);
      } else {
          files.push(absolute);
      }
    }
};

const getArchiveFiles =(dir)=> {
    getFilesRecursively(dir)
    return files
}

const getArchiveDirectory =(dir) => {
    return fs.readdirSync(dir);
}

const generateManifest = async () => {
    return new Promise((resolve, reject)=> {
        let collections = fs.readdirSync('./Collections')
        let finalManifest = []
        collections.forEach((data)=> {
            let manifestFile = require(`../Collections/${data}/manifest.json`)
            finalManifest.push(manifestFile)
            if (finalManifest.length == collections.length) {
                resolve(finalManifest)
            }
        })
    })
}
module.exports.generateManifest = generateManifest
module.exports.rej = rej
module.exports.err = err
module.exports.getTime = getTime
module.exports.getArchiveFiles = getArchiveFiles
module.exports.getArchiveDirectory = getArchiveDirectory