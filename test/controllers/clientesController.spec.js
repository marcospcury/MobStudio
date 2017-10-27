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
    sinon.stub(clienteData, "deleteCliente").returns($q.when({}));
    sinon.stub(clienteData, "createCliente").returns($q.when({ _id: 10 }));
    sinon.stub(clienteData, "getCount").returns(
      $q.when({
        data: { value: 15 }
      })
    );
    sinon.stub(msgs, "addSuccess").returns("");
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

    describe("Ao criar um cliente novo", function() {
      beforeEach(function() {
        $rootScope.$apply();
        $scope.cliente.Nome = "Teste";
        $scope.createCliente();
        $scope.$apply();
      });

      it("Serviço de dados deve ser acionado", function() {
        expect(clienteData.createCliente.getCall(0).args[0].Nome).to.equal(
          "Teste"
        );
      });

      it("Cliente carregado deve estar redefinido", function() {
        expect($scope.cliente._id).to.be.undefined;
      });

      it("Cliente deve ter endereços inicializados", function() {
        expect($scope.cliente.Enderecos).to.be.defined;
      });

      it("Mensagem de sucesso deve ser apresentada", function() {
        $scope.$apply();
        expect(msgs.addSuccess.getCall(0).args[0]).to.equal(
          "Cliente incluído com sucesso!"
        );
      });
    });

    describe("Ao salvar um cliente alterado", function() {
      beforeEach(function() {
        $rootScope.$apply();
        $scope.showTabUpdate(clientes[0]);
        $scope.updateCliente();
      });

      it("Serviço de dados deve ser acionado", function() {
        expect(clienteData.updateCliente.getCall(0).args[0]).to.equal(
          $scope.cliente
        );
      });

      it("Cliente carregado deve estar redefinido", function() {
        $scope.$apply();
        expect($scope.cliente._id).to.be.undefined;
      });

      it("Mensagem de sucesso deve ser apresentada", function() {
        $scope.$apply();
        expect(msgs.addSuccess.getCall(0).args[0]).to.equal(
          "Cliente atualizado com sucesso!"
        );
      });
    });

    describe("Ao cancelar uma alteração", function() {
      beforeEach(function() {
        $rootScope.$apply();
        $scope.showTabUpdate(clientes[0]);
        $scope.cancel();
      });

      it("Cliente deve ser redefinido", function() {
        expect($scope.cliente._id).to.be.undefined;
      });

      it("Aba lista deve estar visível", function() {
        expect($scope.tabList).to.be.true;
      });
    });

    describe("Ao excluir um cliente", function() {
      beforeEach(function() {
        $rootScope.$apply();
        $scope.showTabDelete(clientes[0]);
        $scope.deleteCliente();
      });

      it("Aba excluir deve estar visível", function() {
        expect($scope.tabDelete).to.be.true;
      });

      it("Cliente selecionado deve estar carregado", function() {
        expect($scope.cliente._id).to.be.equal(clientes[0]._id);
      });

      it("Serviço de dados deve ser acionado", function() {
        expect(clienteData.deleteCliente.getCall(0).args[0]).to.equal(
          $scope.cliente
        );
      });

      describe("Ao confirmar a exclusão de um cliente", function() {
        beforeEach(function() {
          $scope.$apply();
        });

        it("Cliente deve ser redefinido", function() {
          expect($scope.cliente._id).to.be.undefined;
        });

        it("Cliente deve ter endereços inicializados", function() {
          expect($scope.cliente.Enderecos).to.be.defined;
        });

        it("Aba lista deve estar visível", function() {
          expect($scope.tabList).to.be.true;
        });

        it("Mensagem de sucesso deve ser apresentada", function() {
          expect(msgs.addSuccess.getCall(0).args[0]).to.equal(
            "Cliente excluído com sucesso!"
          );
        });
      });

      describe("Ao adicionar um endereço", function() {
        beforeEach(function() {
          $rootScope.$apply();
          $scope.addEndereco(0);
        });

        it("Lista de endereços deve conter 2 elementos", function() {
          expect($scope.cliente.Enderecos).to.have.length(2);
        });

        describe("Ao excluir um endereço", function() {
          beforeEach(function() {
            $scope.deleteEndereco(1);
          });

          it("Lista de endereços deve conter 1 elemento", function() {
            expect($scope.cliente.Enderecos).to.have.length(1);
          });
        });
      });
    });
  });
});
