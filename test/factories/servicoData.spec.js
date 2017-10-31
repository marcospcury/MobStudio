describe("servicoData", function() {
  beforeEach(function() {
    bard.appModule("appMobStudio");
    bard.inject("$http", "$httpBackend", "servicoData");
  });

  describe("Servico Data Service", function() {
    describe("Após ativação", function() {
      it("Deve ser criado", function() {
        expect(servicoData).to.exist;
      });
    });

    describe("Após acionamento", function() {
      it("getServicos aciona API", function() {
        $httpBackend.when("GET", "api/servicos").respond(200, [{}]);
        servicoData.getServicos().then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("getServico aciona API", function() {
        $httpBackend.when("GET", "api/servicos/1").respond(200, {});
        servicoData.getServico(1).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("createServico aciona API", function() {
        $httpBackend.when("POST", "api/servicos").respond(200, {});
        servicoData.createServico({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("updateServico aciona API", function() {
        $httpBackend.when("PUT", "api/servicos/1").respond(200, {});
        servicoData.updateServico({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("deleteServico aciona API", function() {
        $httpBackend.when("DELETE", "api/servicos/1").respond(200, {});
        servicoData.deleteServico({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("getCount aciona API", function() {
        $httpBackend.when("GET", "api/servicos/count").respond(200, {});
        servicoData.getCount().then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });
    });
  });
});
