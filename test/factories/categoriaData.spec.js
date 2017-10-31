describe("categoriaData", function() {
  beforeEach(function() {
    bard.appModule("appMobStudio");
    bard.inject("$http", "$httpBackend", "categoriaData");
  });

  describe("Categoria Data Service", function() {
    describe("Após ativação", function() {
      it("Deve ser criado", function() {
        expect(categoriaData).to.exist;
      });
    });

    describe("Após acionamento", function() {
      it("getCategoriasPorTipo aciona API", function() {
        $httpBackend.when("GET", "api/categorias?Tipo=Produto").respond(200, [{}]);
        categoriaData.getCategoriasPorTipo("Produto").then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("getCategorias aciona API", function() {
        $httpBackend.when("GET", "api/categorias").respond(200, [{}]);
        categoriaData.getCategorias().then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("getCategoria aciona API", function() {
        $httpBackend.when("GET", "api/categorias/1").respond(200, {});
        categoriaData.getCategoria(1).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("createCategoria aciona API", function() {
        $httpBackend.when("POST", "api/categorias").respond(200, {});
        categoriaData.createCategoria({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("updateCategoria aciona API", function() {
        $httpBackend.when("PUT", "api/categorias/1").respond(200, {});
        categoriaData.updateCategoria({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("deleteCategoria aciona API", function() {
        $httpBackend.when("DELETE", "api/categorias/1").respond(200, {});
        categoriaData.deleteCategoria({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("getCount aciona API", function() {
        $httpBackend.when("GET", "api/categorias/count").respond(200, {});
        categoriaData.getCount().then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });
    });
  });
});
