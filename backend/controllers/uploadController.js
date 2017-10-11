const AWS = require('aws-sdk')

exports.post = (req, res) => {
    AWS.config.update({ accessKeyId: process.env.MOB_AWS_KEY, secretAccessKey: process.env.MOB_AWS_SECRET })

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