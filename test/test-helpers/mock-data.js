var mockData = (function() {
  return {
    getClientes: getClientes,
    getFornecedores: getFornecedores
  };
  function getClientes() {
    return [
      {
        _id: "1",
        Nome: "Cliente A",
        Email: "clienteA@gmail.com",
        NomeContato: "O mesmo",
        Profissao: "Profissão Teste",
        Estilo: "Contemporâneo",
        __v: 0,
        Telefones: { Contato: "(11) 5555-4444", Celular: "(11) 95555-4444" },
        Enderecos: [
          {
            Rua: "Rua Teste",
            Numero: 400,
            Bairro: "Bairro Teste",
            CEP: "04200-000",
            Cidade: "São Paulo",
            Estado: "SP",
            _id: "1"
          }
        ]
      },
      {
        _id: "2",
        Nome: "Cliente B",
        Email: "clienteB@gmail.com",
        NomeContato: "O mesmo",
        Profissao: "Profissão Teste",
        Estilo: "Contemporâneo",
        __v: 0,
        Telefones: { Contato: "(11) 5555-4444", Celular: "(11) 95555-4444" },
        Enderecos: [
          {
            Rua: "Rua Teste",
            Numero: 400,
            Bairro: "Bairro Teste",
            CEP: "04200-000",
            Cidade: "São Paulo",
            Estado: "SP",
            _id: "2"
          }
        ]
      }
    ];
  }

  function getFornecedores() {
    return [
      {
        _id: "1",
        Nome: "Fornecedor A",
        Email: "fornecedorA@gmail.com",
        NomeContato: "O mesmo",
        Telefones: { Comercial: "(11) 5555-4444", Celular: "(11) 95555-4444" },
        Tipo: "Loja",
        Enderecos: [
          {
            Rua: "Rua Teste",
            Numero: 400,
            Bairro: "Bairro Teste",
            CEP: "04200-000",
            Cidade: "São Paulo",
            Estado: "SP",
            _id: "1"
          }
        ]
      },
      {
        _id: "2",
        Nome: "Fornecedor B",
        Email: "fornecedorB@gmail.com",
        NomeContato: "O mesmo",
        Telefones: { Comercial: "(11) 5555-4444", Celular: "(11) 95555-4444" },
        Tipo: "Loja",
        Enderecos: [
          {
            Rua: "Rua Teste",
            Numero: 400,
            Bairro: "Bairro Teste",
            CEP: "04200-000",
            Cidade: "São Paulo",
            Estado: "SP",
            _id: "1"
          }
        ]
      }
    ]
  }
})();
