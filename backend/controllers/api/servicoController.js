const _ = require('lodash')
const Servicos = require('../../models/servicoModel')

Servicos.methods(['get', 'post', 'put', 'delete'])
Servicos.updateOptions({new: true, runValidators: true})

Servicos.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

Servicos.route('count', function(req, res, next) {
    Servicos.count(function(error, value) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

module.exports = Servicos
