const AWS = require('aws-sdk')

exports.post = (req, res) => {
    AWS.config.update({ accessKeyId: 'AKIAIHGNPTOCHQD2CVFA', secretAccessKey: '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' })

    const base64data = new Buffer(req.files.file.data, 'binary')
    const s3 = new AWS.S3()

    s3.putObject({
        Bucket: 'mobstudio',
        Key: req.files.file.name,
        Body: base64data,
        ACL: 'public-read'
      }, (err, data) => {
        if(err) throw err

        if(data) {
            res.json(data)       
        }
    })
}