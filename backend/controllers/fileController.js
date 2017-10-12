const AWS = require('aws-sdk')
AWS.config.update({ accessKeyId: process.env.MOB_AWS_KEY, secretAccessKey: process.env.MOB_AWS_SECRET })

exports.upload = (req, res) => {
    const base64data = new Buffer(req.files.file.data, 'binary')
    const s3 = new AWS.S3()

    const key = `${req.params.origem}/${req.files.file.name}`

    s3.putObject({
        Bucket: 'mobstudio',
        Key: key,
        Body: base64data,
        ACL: 'public-read'
      }, (err, data) => {
        if(err) throw err

        if(data) {
            res.json(data)       
        }
    })
}

exports.delete_multiple = (req, res) => {

    const s3 = new AWS.S3()

    var obj = _.map(req.body, (foto) => {
        return { Key: `${req.params.origem}/${foto.NomeArquivo}` }
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
        const s3 = new AWS.S3()
        
        s3.deleteObject({
            Bucket: 'mobstudio',
            Key: `${req.params.origem}/${req.params.nome_arquivo}`
          }, (err, data) => {
            if(err) throw err

            if(data) {
                res.json(data)       
            }
        })
}