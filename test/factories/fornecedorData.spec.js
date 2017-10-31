describe("fornecedorData", function() {
  beforeEach(function() {
    bard.appModule("appMobStudio");
    bard.inject("$http", "$httpBackend", "fornecedorData");
  });

  describe("Fornecedor Data Service", function() {
    describe("Após ativação", function() {
      it("Deve ser criado", function() {
        expect(fornecedorData).to.exist;
      });
    });

    describe("Após acionamento", function() {
      it("getFornecedores aciona API", function() {
        $httpBackend.when("GET", "api/fornecedores").respond(200, [{}]);
        fornecedorData.getFornecedores().then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("getFornecedor aciona API", function() {
        $httpBackend.when("GET", "api/fornecedores/1").respond(200, {});
        fornecedorData.getFornecedor(1).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("createFornecedor aciona API", function() {
        $httpBackend.when("POST", "api/fornecedores").respond(200, {});
        fornecedorData.createFornecedor({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("updateFornecedor aciona API", function() {
        $httpBackend.when("PUT", "api/fornecedores/1").respond(200, {});
        fornecedorData.updateFornecedor({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("deleteFornecedor aciona API", function() {
        $httpBackend.when("DELETE", "api/fornecedores/1").respond(200, {});
        fornecedorData.deleteFornecedor({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("getCount aciona API", function() {
        $httpBackend.when("GET", "api/fornecedores/count").respond(200, {});
        fornecedorData.getCount().then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });
    });
  });
});
