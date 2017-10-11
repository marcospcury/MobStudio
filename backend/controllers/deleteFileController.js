const AWS = require('aws-sdk')
const _ = require('lodash')

exports.delete_multiple = (req, res) => {
    AWS.config.update({ accessKeyId: process.env.MOB_AWS_KEY, secretAccessKey: process.env.MOB_AWS_SECRET })

    const s3 = new AWS.S3()

    var obj = _.map(req.body, (foto) => {
        return { Key: foto.NomeArquivo }
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
    AWS.config.update({ accessKeyId: process.env.MOB_AWS_KEY, secretAccessKey: process.env.MOB_AWS_SECRET })
        const s3 = new AWS.S3()
        
        s3.deleteObject({
            Bucket: 'mobstudio',
            Key: req.params.nome_arquivo
          }, (err, data) => {
            if(err) throw err

            if(data) {
                res.json(data)       
            }
        })
}