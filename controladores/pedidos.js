const { pool } = require("../config");
const { request, response } = require("express");

//============================================================================================

const getPedidos = (request, response) => {
    pool.query("select id, Numero_Phoenix , ProcessoCRM , IndicadorDeInscricaoEstadual , InscricaoEstadual , Cnpj,Nome,Endereco,Numero,Complemento,Bairro,Cidade,Estado,Cep,DDD,Telefone,EmailComercial,EmailCobranca,Emissao,Entrega,EntregaMaxima,PedidoDoCliente,Vendedor,AgenteDeVenda,AgenteDeVenda2,Instalador,Transportadora,FretePorConta,OperadorLeasing,Distribuidora,UsoDaMercadoria,Ent_MesmoEndereco,Ent_Cnpj,Ent_Endereco,Ent_Numero,Ent_Complemento,Ent_Bairro,Ent_Cidade,Ent_Estado,CondicaoDePagamentoFat,ValorFinanciado,TipoDeFinanciamento from Pedidos_Cab order by id", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os Pedidos: ' + error});
        }
        response.status(200).json(results.rows)
    })
}
module.exports.getPedidos = getPedidos;


//============================================================================================

const addPedido = async (request, response) =>
{
   const Ins3 = []
   let  Id2  = 0
   try
   {
//       const { id_original , NumeroDoPedido , Situacao , DataPrevista , DataDaOcorrencia , MensagemDeLog , Arquivo , Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto  , criacao , id_origem , mensagem , Produtos } = request.body

       const { 
               ProcessoCRM , 
               IndicadorDeInscricaoEstadual , 
               InscricaoEstadual , 
               Cnpj,
               Nome,
               Endereco,
               Numero,
               Complemento,
               Bairro,
               Cidade,
               Estado,
               Cep,
               DDD,
               Telefone,
               EmailComercial,
               EmailCobranca,
               Emissao,
               Entrega,
               EntregaMaxima,
               PedidoDoCliente,
               Vendedor,
               AgenteDeVenda,
               AgenteDeVenda2,
               Instalador,
               Transportadora,
               FretePorConta,
               OperadorLeasing,
               Distribuidora,
               UsoDaMercadoria,
               Ent_MesmoEndereco,
               Ent_Cnpj,
               Ent_Endereco,
               Ent_Numero,
               Ent_Complemento,
               Ent_Bairro,
               Ent_Cidade,
               Ent_Estado,
               CondicaoDePagamentoFat,
               Titulos,
               ValorFinanciado,
               TipoDeFinanciamento,
               Produtos
              } = request.body

   let Ins3 = await pool.query
           (
'insert into pedidos_cab( Cnpj,Nome,Endereco,Numero,Complemento,Bairro,Cidade,Estado,Cep,DDD,Telefone,EmailComercial,EmailCobranca,Emissao,Entrega,EntregaMaxima,PedidoDoCliente,Vendedor,AgenteDeVenda,AgenteDeVenda2,Instalador,Transportadora,FretePorConta,OperadorLeasing,Distribuidora,UsoDaMercadoria,Ent_MesmoEndereco,Ent_Cnpj,Ent_Endereco,Ent_Numero,Ent_Complemento,Ent_Bairro,Ent_Cidade,Ent_Estado,CondicaoDePagamentoFat,ValorFinanciado,TipoDeFinanciamento,Situacao_Proc ) '+
'values ( $1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 , $14 , $15 , $16 , $17 , $18  , $19 , $20  , $21 , $22 , $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35 , $36 , $37 , $38 , $39 , $40 , $41 ) RETURNING id '
,
//            [ id_original , NumeroDoPedido , Situacao , DataPrevista , DataDaOcorrencia , MensagemDeLog , Arquivo , 0 , Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto , criacao , id_origem , mensagem , '0' ]
              [ ProcessoCRM , IndicadorDeInscricaoEstadual , InscricaoEstadual , Cnpj,Nome,Endereco,Numero,Complemento,Bairro,Cidade,Estado,Cep,DDD,Telefone,EmailComercial,EmailCobranca,Emissao,Entrega,EntregaMaxima,PedidoDoCliente,Vendedor,AgenteDeVenda,AgenteDeVenda2,Instalador,Transportadora,FretePorConta,OperadorLeasing,Distribuidora,UsoDaMercadoria,Ent_MesmoEndereco,Ent_Cnpj,Ent_Endereco,Ent_Numero,Ent_Complemento,Ent_Bairro,Ent_Cidade,Ent_Estado,CondicaoDePagamentoFat,ValorFinanciado,TipoDeFinanciamento , '0' ]
           )
        if (Ins3.rows[0] )
           {

if (Titulos) {
            // Inicio dos titulos do adiantamento
              const jsTitulos = JSON.stringify( Titulos );
              const aTitulos  = JSON.parse( jsTitulos );

              for (let zFor = 0 ; zFor < aTitulos.length ; zFor++ )
              {
                  const Prods = pool.query
                  (
                   'insert into Pedidos_Titulos ( ID,Sequencial,Tipo,Valor,Vencimento ) values ( $1, $2, $3 , $4 , $5  ) ',
                    [ Ins3.rows[0]['id'] , zFor+1 , 'P' , aTitulos[ zFor ].Valor , aTitulos[ zFor ].Vencimento ],
                  )
              }
                  // Fim dos titulos do adiantamento
           }
        }
        if (Ins3.rows[0] )
           {
            // Inicio dos produtos
              const jsProdutos = JSON.stringify( Produtos );

              const aProdutos  = JSON.parse( jsProdutos );

              for ( let zFor = 0 ; zFor < aProdutos.length ; zFor++ )
              {
                  const Prods = pool.query
                  (
                   'insert into Pedidos_produtos ( ID,ID_Prod,CodigoDoProduto,Descricao,Quantidade,ValorUnitario,Instalacao,Opcionais,Frete ) values ( $1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 ) ',
                    [ Ins3.rows[0]['id'] , zFor+1 ,aProdutos[ zFor ].CodigoDoProduto, aProdutos[ zFor ].Descricao, aProdutos[ zFor ].Quantidade, aProdutos[ zFor ].ValorUnitario, aProdutos[ zFor ].Instalacao, aProdutos[ zFor ].Opcionais, aProdutos[ zFor ].Frete  ],
                  )
                  if (aProdutos[ zFor ].Caracteristicas) {
                  // Gravação das caracteristicas
                  const jsCaracs = JSON.stringify( aProdutos[ zFor ].Caracteristicas );
                  const aCaracs  = JSON.parse( jsCaracs );
   
                  for ( let zFor2 = 0 ; zFor2 < aCaracs.length ; zFor2++ )
                  {
                     const Prods = pool.query
                     (
                      'insert into Pedidos_Caracteristicas ( ID,ID_Prod,Sequencial, Codigo,Valor ) values ( $1, $2, $3 , $4 , $5 ) ',
                       [ Ins3.rows[0]['id'] , zFor+1  , zFor2+1 ,aCaracs[ zFor2 ].Codigo,aCaracs[ zFor2 ].Valor  ],
                     )
                  } 

                 // Fim da gravação das caracteristicas
                }



              }

                  // Fim dos produtos
           }

           id2 = Ins3.rows[0]['id']

   }
   catch(error)
                 {
                    if (error)
                    { return response.status(400).send( error  ) } else { return response.status(200).Send( Ins3.rows[0]['id'] ) }
                 }


response.status(201).json({ status: 'sucesso na inclusão do pedido', id: id2})

                 

}        
module.exports.addPedido = addPedido;

//============================================================================================



const updatePedido = (request, response) => {
    const { id, Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto  , criacao , id_origem , mensagem } = request.body
    

    pool.query(
        'update Pedidos set nome = $1, email = $2, Cpf_Cnpj = $3, ddi = $4 , ddd = $5 , Telefone  = $6, Cep  = $7, Cidade  = $8, Uf  = $9, assunto = $10 ,id_Segmento = $11,id_Produto = $12 , criacao = $13 , id_origem = $14, mensagem = $15 where id = $16',
        [Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto,  criacao , id_origem , mensagem , id],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o Pedido: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Pedido atualizado.' })


        }        
    )
}
module.exports.updatePedido = updatePedido;

//============================================================================================



const getPedidos_Phoenix = async (request, response) => 
{
    let aNovo = ''

    try
   {

       Get3 = await pool.query("select id, numero_phoenix , ProcessoCRM , IndicadorDeInscricaoEstadual , InscricaoEstadual , Cnpj,Nome,Endereco,Numero,Complemento,Bairro,Cidade,Estado,Cep,DDD,Telefone,EmailComercial,EmailCobranca,Emissao,Entrega,EntregaMaxima,PedidoDoCliente,Vendedor,AgenteDeVenda,AgenteDeVenda2,Instalador,Transportadora,FretePorConta,OperadorLeasing,Distribuidora,UsoDaMercadoria,Ent_MesmoEndereco,Ent_Cnpj,Ent_Endereco,Ent_Numero,Ent_Complemento,Ent_Bairro,Ent_Cidade,Ent_Estado,CondicaoDePagamentoFat,ValorFinanciado,TipoDeFinanciamento from pedidos_cab Where ( Situacao_proc = '0'  ) "+
       " order by id ")



       const Get3Str  = JSON.stringify( Get3 );
       const Get3Json = JSON.parse( Get3Str );
       for (let zFor = 0 ; zFor < Get3Json.rows.length ; zFor++ )
       {
        Get4 = await pool.query("Select Sequencial,Valor,Vencimento from Pedidos_Titulos Where id = $1 and Tipo = 'P' order by Sequencial",[ Get3Json.rows[zFor].id ] )
        const Get4Str  = JSON.stringify( Get4 );
        const Get4Json = JSON.parse( Get4Str );

        Get5 = await pool.query("Select ID_Prod,CodigoDoProduto,Descricao,Quantidade,ValorUnitario,Instalacao,Opcionais,Frete from Pedidos_Produtos Where id = $1 order by ID_Prod",[ Get3Json.rows[zFor].id ] )
        const Get5Str  = JSON.stringify( Get5 );
        const Get5Json = JSON.parse( Get5Str );

        const aNovo3 = JSON.stringify( Get3Json.rows[zFor] )
        const aNovo4 = JSON.stringify( Get4Json.rows )
        const aNovo5 = JSON.stringify( Get5Json.rows )
 
        aNovo  = aNovo + ( aNovo3.substring( 0 , aNovo3.length - 1 ) + ',"Titulos":'+aNovo4+ ',"produto":'+aNovo5+'}' )

       }
 

   }     
   catch(error) {
                  return response.status(401).json({status: 'error',message: 'Erro ao recuperar os Pedidos: ' +error });
                }     
              response.status(200).send( aNovo )
}
module.exports.getPedidos_Phoenix = getPedidos_Phoenix;



//============================================================================================

const getPedidos_Produtos = async (request, response) => 
{
    let aNovo = ''

    try
   {

       Get3 = await pool.query("select id, seq , codigo , quantidade , valorunitario , instalacao , opcionais , frete , proposta from pedidos_produtos "+
       " order by id ")
      aNovo   = JSON.stringify( Get3 );

   }     
   catch(error) {
                  return response.status(401).json({status: 'error',message: 'Erro ao recuperar os Pedidos: ' +error });
                }     
              response.status(200).send( aNovo )
}
module.exports.getPedidos_Produtos = getPedidos_Produtos;

//============================================================================================



const updatePedido_Phoenix = (request, response) => {
    
  const id = parseInt( request.params.id )    
  const st = parseInt( request.params.st )    
  const np = parseInt( request.params.np )   // numero do pedido no Phoenix

    pool.query(
        'update Pedidos set Situacao_Proc = $1, pedido_phoenix = $2 where id = $3',
        [ st , np , id],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o Pedido: ' + error +'-->' + id });
            }
            response.status(201).json({ status: 'success', message: 'Pedido atualizado.' })
        }        
    )
}
module.exports.updatePedido_Phoenix = updatePedido_Phoenix;

//============================================================================================


const getPedidoPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select l.codigo as codigo, l.nome as nome, l.autor as autor, to_char(l.data_lancamento, \'YYYY-MM-DD\') as data_lancamento, \
        l.editora as editora, e.nome as editora_nome \
        from Pedidos l \
        join editoras e on e.codigo = l.editora where l.codigo = $1 order by l.codigo ',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar o Pedido: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}
module.exports.getPedidoPorCodigo = getPedidoPorCodigo;



//============================================================================================

const deletePedido = (request, response) => {

    const id = parseInt(request.params.id)    

    pool.query(
        'delete from Pedidos where id = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível deletar o Pedido: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Pedido deletado.' })
        }        
    )
}
module.exports.deletePedido = deletePedido;

//============================================================================================
