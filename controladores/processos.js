const { pool } = require("../config");
const { request, response } = require("express");
// const webhooks = require('node-webhooks');


//============================================================================================

const getProcessos = (request, response) => {
    pool.query("select id, Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto , criacao , id_origem from Processos  order by id", (error, results) => {
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

const getProcessos_Phoenix = (request, response) => {
    pool.query("select id, Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto  , criacao , id_origem from Processos Where Situacao = '0' order by id", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os xProcessos: ' + error});
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
module.exports.getProcessos_Phoenix = getProcessos_Phoenix;


//============================================================================================


const addProcesso = (request, response) => {
    const { Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto  , criacao , id_origem } = request.body

    pool.query(
        'insert into Processos ( Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto  , criacao , id_origem ,id_entrada )'+
         'values ($1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 , $13 , $14 , $15)',
        [Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto , criacao , id_origem , 0 ],
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
  //  const { id } = request.body
    
    const id = parseInt(request.params.id)    

    pool.query(
        'update Processos set Situacao = $1  where id = $2',
        [ '1' , id],
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
    const { id, Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto  , criacao , id_origem } = request.body
    

    pool.query(
        'update Processos set nome = $1, email = $2, Cpf_Cnpj = $3, ddi = $4 , ddd = $5 , Telefone  = $6, Cep  = $7, Cidade  = $8, Uf  = $9, assunto = $10 ,id_Segmento = $11,id_Produto = $12 , criacao = $13 , id_origem = $14 where id = $15',
        [Nome, Email, Cpf_Cnpj, ddi , ddd , Telefone, Cep, Cidade, Uf, assunto, id_Segmento, id_Produto,  criacao , id_origem , id],
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
