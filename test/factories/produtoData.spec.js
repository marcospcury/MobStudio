describe("produtoData", function() {
  beforeEach(function() {
    bard.appModule("appMobStudio");
    bard.inject("$http", "$httpBackend", "produtoData");
  });

  describe("Produto Data Service", function() {
    describe("Após ativação", function() {
      it("Deve ser criado", function() {
        expect(produtoData).to.exist;
      });
    });

    describe("Após acionamento", function() {
      it("getProdutos aciona API", function() {
        $httpBackend.when("GET", "api/produtos").respond(200, [{}]);
        produtoData.getProdutos().then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("getProduto aciona API", function() {
        $httpBackend.when("GET", "api/produtos/1").respond(200, {});
        produtoData.getProduto(1).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("createProduto aciona API", function() {
        $httpBackend.when("POST", "api/produtos").respond(200, {});
        produtoData.createProduto({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("updateProduto aciona API", function() {
        $httpBackend.when("PUT", "api/produtos/1").respond(200, {});
        produtoData.updateProduto({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("deleteProduto aciona API", function() {
        $httpBackend.when("DELETE", "api/produtos/1").respond(200, {});
        produtoData.deleteProduto({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("getCount aciona API", function() {
        $httpBackend.when("GET", "api/produtos/count").respond(200, {});
        produtoData.getCount().then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });
    });
  });
});
