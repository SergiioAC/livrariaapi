const { pool } = require("../config");
const { request, response } = require("express");
// const webhooks = require('node-webhooks');


//============================================================================================

const getProcessos = (request, response) => {
    pool.query("select id, Nome, Email, Cpf_Cnpj, Telefone, Cep, Cidade, Uf, id_Segmento, id_Produto from Processos  order by id", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os -Processos: ' + error});
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
    pool.query("select id, Nome, Email, Cpf_Cnpj, Telefone, Cep, Cidade, Uf, id_Segmento, id_Produto from Processos Where Situacao = '0' order by id", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os -Processos: ' + error});
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
    const { Nome , Email , Cpf_Cnpj } = request.body

    pool.query(
        'insert into Processos ( Nome, Email, Cpf_Cnpj, Telefone, Cep, Cidade, Uf, id_Segmento, id_Produto ,id_entrada ) values ($1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 )',
        [Nome, Email, Cpf_Cnpj, Telefone, Cep, Cidade, Uf, id_Segmento, id_Produto,0],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir o Processo: ' + error });
            }
            /// ini
            const hooks = registerHooks();
         //   hooks.trigger('callback_hook', { msg: "new processo created", id , Nome , Email , Cpf_Cnpj  });
            hooks.trigger('callback_hook', { msg: "new processo created", data: 'Teste'  });
            /// fim
            response.status(201).json({ status: 'success', message: 'Processo criado 1.' })
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

const updateProcesso_Phoenix = (request, response) => {
    const { id } = request.body

    pool.query(
        'update Processos set Situacao = $1  where id = $2',
        [ 0 , id],
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
    const { id, Nome, Email, Cpf_Cnpj, Telefone, Cep, Cidade, Uf, id_Segmento, id_Produto } = request.body

    pool.query(
        'update Processos set nome = $1, email = $2, Cpf_Cnpj = $3, Telefone  = $4, Cep  = $5, Cidade  = $6, Uf  = $7, id_Segmento = $8,id_Produto = $9  where id = $10',
        [Nome, Email, Cpf_Cnpj, Telefone, Cep, Cidade, Uf, id_Segmento, id_Produto, id],
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
