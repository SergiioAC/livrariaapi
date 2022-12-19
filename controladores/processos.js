const { pool } = require("../config");
const { request, response } = require("express");
// const webhooks = require('node-webhooks');


//============================================================================================

const getProcessos = (request, response) => {
    pool.query("select id, Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto , criacao , id_origem , mensagem from Processos  order by id", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os Processos: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

/*
const getProcessos = (request, response) => {
    pool.query("SELECT * FROM processos", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os Processos 99 882ZZZZZ: ' + error});
        }
        response.status(200).json(results.rows)
    })
}
*/

module.exports.getProcessos = getProcessos;

//============================================================================================

const getProcessos_Phoenix = async (request, response) => 
{
   try
   {
       Get3 = await pool.query("select id, Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto  , criacao , id_origem , mensagem from Processos Where Situacao = '0' "+
       " and Exists( Select * from processos_produtos where processos_produtos.id=processos.id ) order by id limit 10")
//     console.log(typeof(Get3))
     const Get3Str  = JSON.stringify( Get3 );
//     console.log('Oi1')
//     console.log(Get3.rows)
//     console.log('Oi2')
       const Get3Json = JSON.parse( Get3Str );
//       console.log(typeof(Get3Json));   
//       console.log('Oi3');
//       console.log(Get3Json.rows.length);
//       console.log('Oi4');
//       console.log('Oi7');
//       console.log('Oi10');
//       console.log('Oi11');
//       console.log(Get3Json.rows.length+1);
//       console.log(Get3Json.rows.length+2);
//       console.log(Get3Json.rows.length+3);
       for (let zFor = 0 ; zFor < Get3Json.rows.length ; zFor++ )
       {
//        console.log(Get3Json.rows.length+zFor);
//        console.log(Get3Json.rows[zFor].id)
        Get4 = await pool.query("Select seq,codigo, quantidade, valorunitario, instalacao , opcionais , frete  from Processos_Produtos Where id = $1 order by Seq",[ Get3Json.rows[zFor].id ] )
        const Get4Str  = JSON.stringify( Get4 );
        const Get4Json = JSON.parse( Get4Str );
//        console.log(Get4Json.rows.length);
//        console.log('Oi17');
        //for (let zFor2= 0 ; zFor2< Get4Json.rows.length  ; zFor2++ )
        //{
        //    console.log(Get4Json.rows[zFor2].seq+' '+Get4Json.rows[zFor2].codigo+' '+Get4Json.rows[zFor2].quantidade+' '+Get4Json.rows[zFor2].valorunitario)
        //} 
//        console.log('Oi18');
//        console.log( JSON.stringify( Get3Json.rows[zFor] ) );
//        console.log('Oi19');
//        console.log( JSON.stringify( Get3Json.rows ) );
//        console.log('Oi20');
        const aNovo1 = JSON.stringify( Get3Json.rows[zFor] )
        const aNovo2 = JSON.stringify( Get4Json.rows )
//        console.log( aNovo1.length );
 
        const aNovo  = aNovo1.substring( 1 , aNovo1.length - 1 ) + ',"produto":'+aNovo2+'}'

//      console.log( aNovo );
//      console.log('Oi21');

       }
//       console.log('*** Final ***');
  

   }     
   catch(error) {
                  return response.status(401).json({status: 'error',message: 'Erro ao recuperar os Processos: '});
                }     
   response.status(200).json(Get3.rows)
}

/*17/12/22
const getProcessos_Phoenix = (request, response) => {
    pool.query("select id, Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto  , criacao , id_origem , mensagem from Processos Where Situacao = '0' order by id"
    ,
     (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os xProcessos: ' + error});
        }
        response.status(200).json(results.rows)
    })
}
*/
/*
const getProcessos = (request, response) => {
    pool.query("SELECT * FROM processos", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os Processos 99 882ZZZZZ: ' + error});
        }
        response.status(200).json(results.rows)
    })
}
*/
module.exports.getProcessos_Phoenix = getProcessos_Phoenix;


//============================================================================================


const addProcesso = async (request, response) => 
{
   const Ins3 = []
   try
   {
       const { id_original , Situacao , Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto  , criacao , id_origem , mensagem , Produtos } = request.body
       let Ins3 = await pool.query
           (
              'insert into Processos( id_original , situacao , id_entrada , Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto  , criacao , id_origem , mensagem ) '+
              'values ( $1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 , $14 , $15 , $16 , $17 , $18 ) RETURNING id '
              ,
              [ id_original , Situacao , 0 , Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto , criacao , id_origem , mensagem ]
           )
//,
//        (error,res) => {
//                         if (error)
//                                    {
//                                      return response.status(401).json(  { status: 'error',message: 'Erro 1 ao inserir o Processo: ' + error } );
//                                    }
//                                    console.log( 'oi 1')
//                                    console.log( typeof(Ins3))
                                    
//                                }
//        )

//        console.log( 'oi 2')n
//        console.log( typeof(Ins3))
     //   console.log( Ins3.rows[0]['id'] )
//     let Ins32 = Ins3

   
        if (Ins3.rows[0] ) 
           { 
            // Inicio dos produtos
              const jsProdutos = JSON.stringify( Produtos );
              const aProdutos = JSON.parse( jsProdutos );

              for (let zFor = 0 ; zFor < aProdutos.length ; zFor++ )
              {
                  const Prods = pool.query
                  (
                   'insert into Processos_produtos ( Id,Seq,Codigo,Quantidade,ValorUnitario,Instalacao,Opcionais,Frete ) values ( $1, $2, $3 , $4 , $5 , $6 , $7 , $8 ) ',
                    [ Ins3.rows[0]['id'] , zFor+1 ,aProdutos[ zFor ].Codigo,aProdutos[ zFor ].Quantidade,aProdutos[ zFor ].ValorUnitario,aProdutos[ zFor ].Instalacao,aProdutos[ zFor ].Opcionais,aProdutos[ zFor ].Frete ],
                  )
              }
 
                  // Fim dos produtos
           }
           
   } 
   catch(error)
                 {
                    if (error)
                    { return response.status(400).send( error  ) } else { return response.status(200).Send( Ins3.rows[0]['id'] ) }
                 }
                 response.status(201).json({ status: 'sucesso na criação do lead', message: 'Processo criado 2.'})
}        
    

//const registerHooks = () => {
//    return new webhooks({
//        db: {
//            'callback_hook': ['http://191.227.209.249:3002/webhook-client']
//        }
//    });
//}

module.exports.addProcesso = addProcesso;


//============================================================================================

const addProcesso_WebHooks = (request, response) => {
    const { Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, Segmento, Produto , ip_address , date_submitted , time_submitted } = request.body

    pool.query(
        'insert into Processos ( Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto ,id_entrada , ip , ???? )'+
         'values ($1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 , $14 , $15 , $16)',
        [Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, Segmento, Produto,0 , ip_address , date_submitted , time_submitted ],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir o Processo: ' + error });
            }
            /// ini
         //21/09/22   const hooks = registerHooks();
         //   hooks.trigger('callback_hook', { msg: "new processo created", id , Nome , Email , Cpf_Cnpj  });
         //21/09/22   hooks.trigger('callback_hook', { msg: "new processo created", data: 'Teste'  });
            /// fim
            response.status(201).json({ status: 'sucesso na criação do lead', message: 'Processo criado 1.' })
        }        
    )
}
//const registerHooks = () => {
//    return new webhooks({
//        db: {
//            'callback_hook': ['http://191.227.209.249:3002/webhook-client']
//        }
//    });
//}

module.exports.addProcesso_WebHooks = addProcesso_WebHooks;

//============================================================================================

const updateProcesso_Phoenix = (request, response) => {
//    const { id } = request.body
//    const { st } = request.body
    
  const id = parseInt(request.params.id)    
  const st = parseInt(request.params.st)    

    pool.query(
        'update Processos set Situacao = $1  where id = $2',
        [ st , id],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o Processo: ' + error +'-->' + id });
            }
            response.status(201).json({ status: 'success', message: 'Processo atualizado.' })
        }        
    )
}


module.exports.updateProcesso_Phoenix = updateProcesso_Phoenix;

//============================================================================================

const updateProcesso = (request, response) => {
    const { id, Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto  , criacao , id_origem , mensagem } = request.body
    

    pool.query(
        'update Processos set nome = $1, email = $2, Cpf_Cnpj = $3, ddi = $4 , ddd = $5 , Telefone  = $6, Cep  = $7, Cidade  = $8, Uf  = $9, assunto = $10 ,id_Segmento = $11,id_Produto = $12 , criacao = $13 , id_origem = $14, mensagem = $15 where id = $16',
        [Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto,  criacao , id_origem , mensagem , id],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o Processo: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Processo atualizado.' })


        }        
    )
}

module.exports.updateProcesso = updateProcesso;

//============================================================================================

const deleteProcesso = (request, response) => {

    const id = parseInt(request.params.id)    

    pool.query(
        'delete from Processos where id = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível deletar o Processo: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Processo deletado.' })
        }        
    )
}

module.exports.deleteProcesso = deleteProcesso;

//============================================================================================

const getProcessoPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select l.codigo as codigo, l.nome as nome, l.autor as autor, to_char(l.data_lancamento, \'YYYY-MM-DD\') as data_lancamento, \
        l.editora as editora, e.nome as editora_nome \
        from Processos l \
        join editoras e on e.codigo = l.editora where l.codigo = $1 order by l.codigo ',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar o Processo: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getProcessoPorCodigo = getProcessoPorCodigo;
