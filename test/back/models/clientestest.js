const expect = require('chai').expect;
const mongoose = require('mongoose');

const clienteModel = require('../../../models/clienteModel');
const Cliente = mongoose.model('Clientes');

describe('Models -> Clientes', function() {
    var cliente = new Cliente();
    
    it('Nome deve ser preenchido no modelo', function(done) {
        cliente.validate(function(err) {
            expect(err.errors.Nome).to.exist;
            done();
        });
    });

    it('Email deve ser preenchido no modelo', function(done) {
        cliente.validate(function(err) {
            expect(err.errors.Email).to.exist;
            done();
        });
    });
});