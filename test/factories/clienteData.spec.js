describe("clienteData", function() {
  beforeEach(function() {
    bard.appModule("appMobStudio");
    bard.inject("$http", "$httpBackend", "clienteData");
  });

  describe("Cliente Data Service", function() {
    describe("Após ativação", function() {
      it("Deve ser criado", function() {
        expect(clienteData).to.exist;
      });
    });

    describe("Após acionamento", function() {
      it("getClientes aciona API", function() {
        $httpBackend.when("GET", "api/clientes").respond(200, [{}]);
        clienteData.getClientes().then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("getCliente aciona API", function() {
        $httpBackend.when("GET", "api/clientes/1").respond(200, {});
        clienteData.getCliente(1).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("createCliente aciona API", function() {
        $httpBackend.when("POST", "api/clientes").respond(200, {});
        clienteData.createCliente({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("updateCliente aciona API", function() {
        $httpBackend.when("PUT", "api/clientes/1").respond(200, {});
        clienteData.updateCliente({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("deleteCliente aciona API", function() {
        $httpBackend.when("DELETE", "api/clientes/1").respond(200, {});
        clienteData.deleteCliente({_id: 1}).then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });

      it("getCount aciona API", function() {
        $httpBackend.when("GET", "api/clientes/count").respond(200, {});
        clienteData.getCount().then(function(data) {
          expect(data).to.exist;
        });
        $httpBackend.flush();
      });
    });
  });
});
