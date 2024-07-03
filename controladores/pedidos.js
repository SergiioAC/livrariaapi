const { pool } = require("../config");
const { request, response } = require("express");

//============================================================================================

const getPedidos = (request, response) => {
    pool.query("select id, Numero_Phoenix , ProcessoCRM , IndicadorDeInscricaoEstadual , InscricaoEstadual , Cnpj,Nome,Fantasia,Endereco,Numero,Complemento,"+
                      "Bairro,Cidade,Estado,Cep,DDD,Telefone,Atividade,Regiao,EmailComercial,EmailCobranca,EmailNFe,ContatoComercial,ContatoCobranca,TelComercial,TelCobranca,Emissao,Entrega,"+
                      "EntregaMaxima,PedidoDoCliente,Vendedor,AgenteDeVenda,AgenteDeVenda2,Instalador,Transportadora,FretePorConta,OperadorLeasing,Distribuidora,"+
                      "UsoDaMercadoria,Ent_MesmoEndereco,Ent_Cnpj,Ent_Endereco,Ent_Numero,Ent_Complemento,Ent_Bairro,Ent_Cidade,Ent_Estado,Ent_Cep,TipoDeTitulo,DataBasePed,CondicaoDePagamentoFat,"+
                      "TipoDeDistribuicaoFat,DistribuicaoFat,ObservacaoFat,"+
                      "ValorFinanciado,TipoDeFinanciamento,Observacao_Pedido,Observacao_Producao,Observacao_Ambos,Observacao_Cliente,Finalizado from Pedidos_Cab order by id", 
                      (error, results) => {
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
//       const { id_original , NumeroDoPedido , Situacao , DataPrevista , DataDaOcorrencia , MensagemDeLog , Arquivo , Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, Atividade , assunto, id_Segmento, id_Produto  , criacao , id_origem , mensagem , Produtos } = request.body

       const { 
               id_cliente , 
               ProcessoCRM , 
               IndicadorDeInscricaoEstadual ,
               InscricaoEstadual , 
               Cnpj,
               Nome,
               Fantasia,
               Endereco,
               Numero,
               Complemento,
               Bairro,
               Cidade,
               Estado,
               Cep,
               DDD,
               Telefone,
               Atividade,
               Regiao,
               EmailComercial,
               EmailCobranca,
               EmailNFe,
               ContatoComercial,
               ContatoCobranca,
               TelComercial,
               TelCobranca,
               Emissao,
               Entrega,
               NaoFaturarAntes,
               EntregaMaxima,
               PedidoDoCliente,
               Vendedor,
               AgenteDeVenda,
               AgenteDeVenda2,
               Instalador,
               AbatimentoNaComissao1,
               AbatimentoNaComissao2,
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
               Ent_Cep,
               TipoDeTitulo,
               DataBasePed,
               CondicaoDePagamentoFat,
               TipoDeDistribuicaoFat,
               DistribuicaoFat,
               ObservacaoFat,
               Titulos,
               ValorFinanciado,
               TipoDeFinanciamento,
               Observacao_Pedido,
               Observacao_Producao,
               Observacao_Ambos,
               Observacao_Cliente,
               Finalizado,
               Produtos
              } = request.body

          //    console.log('OK1-->'+id_cliente+'<--' )
              
              let vid_cliente = 0
              if (!id_cliente)
              {
                vid_cliente = 362
              }
              else
              {
                vid_cliente=id_cliente
              }
         //     console.log('OK2-->'+vid_cliente+'<--' )
/*
              if (id_cliente)
              {
                vid_cliente = 19
              }
              
           //   console.log('OK3-->'+id_cliente+'<--' )

              if (!id_cliente)
              {
                vid_cliente = 19
              }
              
           //   console.log('OK4-->'+id_cliente+'<--' )

*/

   let Ins3 = await pool.query
              (
              'insert into pedidos_cab(  id_cliente,'+
                                        'ProcessoCRM ,'+ 
                                        'IndicadorDeInscricaoEstadual ,'+  
                                        'InscricaoEstadual ,'+ 
                                        'Cnpj,'+
                                        'Nome,'+
                                        'Fantasia,'+
                                        'Endereco,'+
                                        'Numero,'+
                                        'Complemento,'+
                                        'Bairro,'+
                                        'Cidade,'+
                                        'Estado,'+
                                        'Cep,'+
                                        'DDD,'+
                                        'Telefone,'+
                                        'Atividade,'+
                                        'Regiao,'+
                                        'EmailComercial,'+
                                        'EmailCobranca,'+
                                        'EmailNFe,'+
                                        'ContatoComercial,'+
                                        'ContatoCobranca,'+
                                        'TelComercial,'+
                                        'TelCobranca,'+
                                        'Emissao,'+
                                        'Entrega,'+
                                        'NaoFaturarAntes,'+
                                        'EntregaMaxima,'+
                                        'PedidoDoCliente,'+
                                        'Vendedor,'+
                                        'AgenteDeVenda,'+
                                        'AgenteDeVenda2,'+
                                        'Instalador,'+
                                        'AbatimentoNaComissao1,'+
                                        'AbatimentoNaComissao2,'+
                                        'Transportadora,'+
                                        'FretePorConta,'+
                                        'OperadorLeasing,'+
                                        'Distribuidora,'+
                                        'UsoDaMercadoria,'+
                                        'Ent_MesmoEndereco,'+
                                        'Ent_Cnpj,'+
                                        'Ent_Endereco,'+
                                        'Ent_Numero,'+
                                        'Ent_Complemento,'+
                                        'Ent_Bairro,'+
                                        'Ent_Cidade,'+
                                        'Ent_Estado,'+
                                        'Ent_Cep,'+
                                        'TipoDeTitulo,'+
                                        'DataBasePed,'+
                                        'CondicaoDePagamentoFat,'+
                                        'TipoDeDistribuicaoFat,'+
                                        'DistribuicaoFat,'+
                                        'ObservacaoFat,'+
                                        'ValorFinanciado,'+
                                        'TipoDeFinanciamento,'+
                                        'Observacao_Pedido,'+
                                        'Observacao_Producao,'+
                                        'Observacao_Ambos,'+
                                        'Observacao_Cliente,'+
                                        'Finalizado,'+
                                        'Situacao_Proc'+
                                        ') '+
              'values ( $1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 , $14 , $15 , $16 , $17 , $18  , $19 , $20  , $21 , $22 , $23, $24, $25, $26, $27, $28, $29, $30,'+
                      ' $31, $32, $33, $34, $35 , $36 , $37 , $38 , $39 , $40 , $41 , $42 , $43 , $44 , $45 , $46 , $47  , $48 , $49 , $50 , $51 , $52 , $53 , $54 , $55 , $56 , $57 , $58 , $59 , $60 , $61 , $62  , $63 , $64   ) RETURNING id '
              
,
//            [ id_cliente ,  id_original , NumeroDoPedido , Situacao , DataPrevista , DataDaOcorrencia , MensagemDeLog , Arquivo , 0 , Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto , criacao , id_origem , mensagem , '0' ]
              [ vid_cliente , 
                ProcessoCRM , 
                IndicadorDeInscricaoEstadual , 
                InscricaoEstadual , 
                Cnpj,
                Nome,
                Fantasia,
                Endereco,
                Numero,
                Complemento,
                Bairro,
                Cidade,
                Estado,
                Cep,
                DDD,
                Telefone,
                Atividade,
                Regiao,
                EmailComercial,
                EmailCobranca,
                EmailNFe,
                ContatoComercial,
                ContatoCobranca,
                TelComercial,
                TelCobranca,
                Emissao,
                Entrega,
                NaoFaturarAntes,
                EntregaMaxima,
                PedidoDoCliente,
                Vendedor,
                AgenteDeVenda,
                AgenteDeVenda2,
                Instalador,
                AbatimentoNaComissao1,
                AbatimentoNaComissao2,
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
                Ent_Cep,
                TipoDeTitulo,
                DataBasePed,
                CondicaoDePagamentoFat,
                TipoDeDistribuicaoFat,
                DistribuicaoFat,
                ObservacaoFat,
                ValorFinanciado,
                TipoDeFinanciamento,
                Observacao_Pedido,
                Observacao_Producao,
                Observacao_Ambos,
                Observacao_Cliente,
                Finalizado,
                 '0' ]
           )

       //    console.log('OK3')

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
                   'insert into Pedidos_Titulos ( ID,Sequencial,Tipo,Valor,Vencimento,FormaDePagto ) values ( $1, $2, $3 , $4 , $5 , $6 ) ',
                    [ Ins3.rows[0]['id'] , zFor+1 , 'P' , aTitulos[ zFor ].Valor , aTitulos[ zFor ].Vencimento, aTitulos[ zFor ].FormaDePagto ],
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
                   'insert into Pedidos_produtos ( ID,ID_Prod,CodigoDoProduto,Descricao,Quantidade,QualEstoque,ValorUnitario,Instalacao,Opcionais,Frete ) values ( $1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10) ',
                    [ Ins3.rows[0]['id'] , zFor+1 ,aProdutos[ zFor ].CodigoDoProduto, aProdutos[ zFor ].Descricao, aProdutos[ zFor ].Quantidade, aProdutos[ zFor ].QualEstoque,aProdutos[ zFor ].ValorUnitario, aProdutos[ zFor ].Instalacao, aProdutos[ zFor ].Opcionais, aProdutos[ zFor ].Frete  ],
                  )
                  if (aProdutos[ zFor ].Caracteristicas) {
                  // Gravação das caracteristicas
                  const jsCaracs = JSON.stringify( aProdutos[ zFor ].Caracteristicas );
                  const aCaracs  = JSON.parse( jsCaracs );
   
                  for ( let zFor2 = 0 ; zFor2 < aCaracs.length ; zFor2++ )
                  {
                     const Prods = pool.query
                     (
                      'insert into Pedidos_Caracteristicas ( ID,ID_Prod, Codigo,Valor,Cpl,Cpsl ) values ( $1, $2, $3 , $4 , $5 , $6 ) ',
                       [ Ins3.rows[0]['id'] , zFor+1  , aCaracs[ zFor2 ].Codigo , aCaracs[ zFor2 ].Valor  , aCaracs[ zFor2 ].Cpl , aCaracs[ zFor2 ].Cpsl ],
                     )
                  } 

                 // Fim da gravação das caracteristicas 
                }
                // Datas de entrega

                if (aProdutos[ zFor ].Entregas) {
                    // Gravação das entregas

//                    console.log('Entregas 1 -->'+id_cliente+'<--' )

                    const jsEntregas = JSON.stringify( aProdutos[ zFor ].Entregas );
                    const aEntregas  = JSON.parse( jsEntregas );
     
//                    console.log('Entregas 2 -->'+id_cliente+'<--' )
                    for ( let zFor2 = 0 ; zFor2 < aEntregas.length ; zFor2++ )
                    {
   
//                      console.log('Entregas 3 -->'+id_cliente+'<--' )
                        const Ents = pool.query
                       (
                        'insert into Pedidos_Entregas ( ID , ID_Prod , Quantidade , DataDeEntrega ) values ( $1, $2, $3 , $4 ) ',
//                       [ Ins3.rows[0]['id'] , zFor+1  , aEntregas[ zFor2 ].Quantidade , aEntregas[ zFor2 ].DataDeEntrega   ],
                         [ Ins3.rows[0]['id'] , zFor+1  , aEntregas[ zFor2 ].Quantidade , aEntregas[ zFor2 ].DataDeEntrega.substring( 4 )+ aEntregas[ zFor2 ].DataDeEntrega.substring( 2 , 4 )+ aEntregas[ zFor2 ].DataDeEntrega.substring( 0 , 2 )  ],
)
                    } 
                   // Fim da gravação das entregas   .substring( 0 , umProduto_Str.length - 1 )
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

//============== Não utilizada ==============================================================================



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

//  const idcliente = parseInt(request.params.idcliente)    
    const id_cliente = request.params.id_cliente    

// const { id_cliente } = request.body

 //console.log('OK0000->'+id_cliente+'<---'  );

 //console.log('OK12223'  );

    let todosOsPedidos_Json    = ''
    let Get_ProdutoStr  = ''
    let Get_ProdutoJson = []
    
    try
   {

   // console.log('OK12ewe22'+id_cliente  );


       Get_Pedido = await pool.query("select id, pedido_phoenix , ProcessoCRM , IndicadorDeInscricaoEstadual , InscricaoEstadual , Cnpj,Nome,Fantasia,Endereco,Numero,Complemento,"+
                                      "Bairro,Cidade,Estado,Cep,DDD,Telefone,Atividade,Regiao,EmailComercial,EmailCobranca,EmailNFe,ContatoComercial,ContatoCobranca,TelComercial,TelCobranca,Emissao,Entrega,NaoFaturarAntes,"+
                                      "EntregaMaxima,PedidoDoCliente,Vendedor,AgenteDeVenda,AgenteDeVenda2,Instalador,AbatimentoNaComissao1,AbatimentoNaComissao2,Transportadora,"+
                                      "FretePorConta,OperadorLeasing,Distribuidora,UsoDaMercadoria,Ent_MesmoEndereco,Ent_Cnpj,Ent_Endereco,Ent_Numero,Ent_Complemento,Ent_Bairro,"+
                                      "Ent_Cidade,Ent_Estado,Ent_Cep,TipoDeTitulo,DataBasePed,CondicaoDePagamentoFat,TipoDeDistribuicaoFat,DistribuicaoFat,ObservacaoFat,ValorFinanciado,TipoDeFinanciamento,Observacao_Pedido,Observacao_Producao,"+
                                      "Observacao_Ambos,Observacao_Cliente,Finalizado from pedidos_cab Where id_cliente = $1 and Situacao_proc = '0' "+
//                                      "Observacao_Ambos,Observacao_Cliente from pedidos_cab Where  Situacao_proc = '0' "+
       " order by id " , [id_cliente] )


    
       const Get_PedidoStr  = JSON.stringify( Get_Pedido );
       //console.log('100-'+Get_ProdutoStr);

       // Processando um pedido
       const Get_PedidoJson = JSON.parse( Get_PedidoStr );
       for (let zFor = 0 ; zFor < Get_PedidoJson.rows.length ; zFor++ )
       {
        //console.log('111-'+Get_ProdutoStr);

        Get_Titulos = await pool.query("Select Sequencial,Valor,Vencimento,FormaDePagto from Pedidos_Titulos Where id = $1 and Tipo = 'P' order by Sequencial",[ Get_PedidoJson.rows[zFor].id ] )
        const Get_TitulosStr  = JSON.stringify( Get_Titulos );
        const Get_TitulosJson = JSON.parse( Get_TitulosStr );

        Get_Produto = await pool.query("Select ID_Prod,CodigoDoProduto,Descricao,Quantidade,QualEstoque,ValorUnitario,Instalacao,Opcionais,Frete from Pedidos_Produtos Where id = $1 order by ID_Prod",[ Get_PedidoJson.rows[zFor].id ] )
        Get_ProdutoStr  = JSON.stringify( Get_Produto );
        Get_ProdutoJson = JSON.parse( Get_ProdutoStr );
        //console.log('=============================================================0');
        //console.log(Get_ProdutoStr);
        //console.log(Get_ProdutoStr);
        //console.log('=============================================================1');

        //console.log(Get_PedidoJson.rows[0].id         );
        //console.log('=============================================================1.1/2');

        let jsonDosProdutos   = ''
        for (let zFor2 = 0 ; zFor2 < Get_ProdutoJson.rows.length ; zFor2++ )
        {

            const umProduto_Str = JSON.stringify( Get_ProdutoJson.rows[zFor2] );
            let umProduto_Sai = '';

            // Entregas
            Get_Entregas = await pool.query("Select quantidade,datadeentrega from Pedidos_Entregas Where id = $1 and id_prod = $2 order by datadeentrega ",[ Get_PedidoJson.rows[zFor].id , Get_ProdutoJson.rows[zFor2].id_prod ] )
            const Get_EntregasStr  = JSON.stringify( Get_Entregas );
            // console.log('1 -> '+Get_EntregasStr);
            const Get_EntregasJson = JSON.parse( Get_EntregasStr );
            // console.log('2 -> '+Get_EntregasJson);
            const entregas_Str = JSON.stringify( Get_EntregasJson.rows        );
            // console.log('3 -> '+entregas_Str);

                /*    
            if ( entregas_Str === '[a]' )
            {
                jsonDosProdutos  = jsonDosProdutos + umProduto_Str // .substring( 0 , umProduto_Str.length - 1 )  '}' )
            }
            else
            {
                if ( jsonDosProdutos === '' )
                {
                   jsonDosProdutos  = jsonDosProdutos + ( umProduto_Str.substring( 0 , umProduto_Str.length - 1 ) + ',"Entregas":'+entregas_Str + '}' )
                }
                else   
                {
//                 jsonDosProdutos  = jsonDosProdutos + ',' + ( umProduto_Str.substring( 0 , umProduto_Str.length - 1 ) + ',"Caracteristicas":'+entregas_Str + '} ] }' )
                   jsonDosProdutos  = jsonDosProdutos + ',' + ( umProduto_Str.substring( 0 , umProduto_Str.length - 1 ) + ',"Entregas":'+entregas_Str + '} ' )
                }
                */   


                if ( entregas_Str !== '[a]' )
                   {
                    umProduto_Sai = umProduto_Sai + umProduto_Str.substring( 0 , umProduto_Str.length - 1 ) + ',"Entregas":'+entregas_Str ; // + '}';
                   }



                   // }
            // Fim das entregas


            // Caracteristicas
            Get6 = await pool.query("Select codigo,valor,Cpl,Cpsl from Pedidos_Caracteristicas Where id = $1 and id_prod = $2 order by Cpl ",[ Get_PedidoJson.rows[zFor].id , Get_ProdutoJson.rows[zFor2].id_prod ] )
            const Get6Str  = JSON.stringify( Get6 );
            const Get6Json = JSON.parse( Get6Str );

            const caracteristicas_Str = JSON.stringify( Get6Json.rows        );
            const caracteristicas_Json = JSON.stringify( Get_ProdutoJson.rows[zFor2] );
            /*
            if ( caracteristicas_Str === '[a]' )
            {
                jsonDosProdutos  = jsonDosProdutos + caracteristicas_Json // .substring( 0 , caracteristicas_Json.length - 1 )  '}' )
            }
            else
            {
                if ( jsonDosProdutos === '' )
                {
                   jsonDosProdutos  = jsonDosProdutos + ( caracteristicas_Json.substring( 0 , caracteristicas_Json.length - 1 ) + ',"Caracteristicas":'+caracteristicas_Str + '}' )
                }
                else   
                {
//                 jsonDosProdutos  = jsonDosProdutos + ',' + ( caracteristicas_Json.substring( 0 , caracteristicas_Json.length - 1 ) + ',"Caracteristicas":'+caracteristicas_Str + '} ] }' )
                   jsonDosProdutos  = jsonDosProdutos + ',' + ( caracteristicas_Json.substring( 0 , caracteristicas_Json.length - 1 ) + ',"Caracteristicas":'+caracteristicas_Str + '} ' )
                }
            }
            */
            if ( caracteristicas_Str !== '[a]' )
            {
                if ( umProduto_Sai === '' )
                {    
                    umProduto_Sai = umProduto_Str.substring( 0 , umProduto_Str.length - 1 ) + ',"Caracteristicas":'+caracteristicas_Str ; // + '}';
                }
                else
                {
                    umProduto_Sai = umProduto_Sai + ',"Caracteristicas":'+caracteristicas_Str + '}';
                }  //( umProduto_Str.substring( 0 , umProduto_Str.length - 1 ) + 
            }           
            
        //console.log(Get_ProdutoStr);

            // Fim das caracteristica

                // Fechando o produto
                umProduto_Sai = umProduto_Sai +  '}';

            if ( jsonDosProdutos === '' )
             {
                jsonDosProdutos  = jsonDosProdutos + umProduto_Sai.substring( 0 , umProduto_Sai.length - 1 ) ;
             }
             else   
             {
                jsonDosProdutos  = jsonDosProdutos + ','+ umProduto_Sai.substring( 0 , umProduto_Sai.length - 1 ) ;
             }


        }

           const jsonDoPedido = JSON.stringify( Get_PedidoJson.rows[zFor] )
           const jsonDosTitulos = JSON.stringify( Get_TitulosJson.rows )
    //     const jsonDosProdutos = JSON.stringify( Get_ProdutoJson.rows )
 
          if ( todosOsPedidos_Json === '' )
          {
              todosOsPedidos_Json  = todosOsPedidos_Json + ( jsonDoPedido.substring( 0 , jsonDoPedido.length - 1 ) + ',"Titulos":'+jsonDosTitulos+ ',"produto":['+jsonDosProdutos+']}' );
          }
          else
          {
              todosOsPedidos_Json  = todosOsPedidos_Json + '' + ( jsonDoPedido.substring( 0 , jsonDoPedido.length - 1 ) + ',"Titulos":'+jsonDosTitulos+ ',"produto":['+jsonDosProdutos+']}' );
          } // Não tem virgula separando os pedidos porque são Json separados.
    
       }
 

   }     
   catch(error) {
                  return response.status(401).json({status: 'error',message: 'Erro ao recuperar os Pedidos: ' +error });
                }     
              response.status(200).send( todosOsPedidos_Json )
}
module.exports.getPedidos_Phoenix = getPedidos_Phoenix;



//============================================================================================

const getPedidos_Produtos = async (request, response) => 
{
    let todosOsPedidos_Json = ''

    try
   {

       Get_Pedido = await pool.query("select id, seq , codigo , quantidade , valorunitario , instalacao , opcionais , frete , proposta from pedidos_produtos "+
       " order by id ")
      todosOsPedidos_Json   = JSON.stringify( Get_Pedido );

   }     
   catch(error) {
                  return response.status(401).json({status: 'error',message: 'Erro ao recuperar os Pedidos: ' +error });
                }     
              response.status(200).send( todosOsPedidos_Json )
}
module.exports.getPedidos_Produtos = getPedidos_Produtos;

//============================================================================================



const updatePedido_Phoenix = (request, response) => {
    
    const id_cliente = parseInt( request.params.id_cliente )    
    const id         = parseInt( request.params.id         )    
    const st         = parseInt( request.params.st         )    
    const np         = parseInt( request.params.np         )   // numero do pedido no Phoenix

    pool.query(
        'update Pedidos_cab set Situacao_Proc = $1, pedido_phoenix = $2 where id_cliente = $4 and id = $3',
        [ st , np , id, id_cliente ],
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


const getPedidoPorID = (request, response) => {

    const pID = parseInt(request.params.pID)    

    pool.query(
        'select pedido_phoenix from Pedidos_cab where ID = $1 ',
        [pID],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Pedido não encontrado : ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}
module.exports.getPedidoPorID = getPedidoPorID;



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
