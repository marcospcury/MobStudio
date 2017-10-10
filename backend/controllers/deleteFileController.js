const AWS = require('aws-sdk')
const _ = require('lodash')

exports.delete_multiple = (req, res) => {
    AWS.config.update({ accessKeyId: 'AKIAIHGNPTOCHQD2CVFA', secretAccessKey: '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' })

    const s3 = new AWS.S3()

    var obj = _.map(req.body.Fotos, (foto) => {
        return { Key: foto.ETag }
    })

    s3.deleteObjects({
        Bucket: 'mobstudio',
        Delete: { Objects: obj }
      }, (err, data) => {
        if(err) throw err

        if(data) {
            res.json(data)       
        }
    })
}

exports.delete_one = (req, res) => {
    AWS.config.update({ accessKeyId: 'AKIAIHGNPTOCHQD2CVFA', secretAccessKey: '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' })
    
        const s3 = new AWS.S3()
        
        s3.deleteObject({
            Bucket: 'mobstudio',
            Key: req.params.etag
          }, (err, data) => {
            if(err) throw err
    
            if(data) {
                res.json(data)       
            }
        })
}