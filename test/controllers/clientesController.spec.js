describe("ClientesController", function() {
  var clientes = mockData.getClientes();
  var controller;
  var $scope;
  beforeEach(function() {
    bard.appModule("appMobStudio");
    bard.inject(
      "$controller",
      "$q",
      "$rootScope",
      "clienteData",
      "msgs",
      "tabs",
      "consts"
    );
  });

  beforeEach(function() {
    sinon.stub(clienteData, "getClientes").returns(
      $q.when({
        data: clientes
      })
    );
    sinon.stub(clienteData, "updateCliente").returns($q.when({}));
    sinon.stub(clienteData, "getCount").returns(
      $q.when({
        data: { value: 15 }
      })
    );
    $scope = $rootScope.$new();
    controller = $controller("clientesController", {
      $scope: $scope
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe("Clientes Controller", function() {
    it("Deve ser criado", function() {
      expect(controller).to.be.defined;
    });

    describe("Após ativação", function() {
      beforeEach(function() {
        $rootScope.$apply();
      });
      it("Deve possuir total de páginas", function() {
        expect($scope.pages).to.be.defined;
      });

      it("Total de páginas deve ser 2", function() {
        expect($scope.pages).to.equal(2);
      });

      it("Deve possuir lista de clientes", function() {
        expect($scope.clientes).to.have.length(clientes.length);
      });

      it("Cliente deve estar definido", function() {
        expect($scope.cliente).to.be.defined;
      });

      it("Cliente deve ter endereços inicializados", function() {
        expect($scope.cliente.Enderecos).to.be.defined;
      });

      it("Aba lista deve estar visível", function() {
        expect($scope.tabList).to.be.true;
      });
    });

    describe("Ao editar um cliente", function() {
      beforeEach(function() {
        $rootScope.$apply();
        $scope.showTabUpdate(clientes[0]);
      });

      it("Cliente selecionado deve estar carregado", function() {
        expect($scope.cliente._id).to.be.equal(clientes[0]._id);
      });

      it("Aba editar deve estar visível", function() {
        expect($scope.tabUpdate).to.be.true;
      });
    });

    describe("Ao salvar um cliente alterado", function() {
      beforeEach(function() {
        $rootScope.$apply();
        $scope.showTabUpdate(clientes[0]);
        $scope.updateCliente();
      });

      it("Serviço de dados deve ser acionado", function() {
        expect(clienteData.updateCliente.getCall(0).args[0]).to.equal($scope.cliente);
      });
    });
  });
});
