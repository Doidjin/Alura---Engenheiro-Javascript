import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService{

    constructor(){

        this._http = new HttpService();
    }

        obterNegociacoesDaSemana() {
            return new Promise((resolve, reject) => {

                this._http
                    .get('negociacoes/semana')
                    .then(negociacoes => {
                        resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    })
                    .catch(error => {
                        console.log(error);
                        reject('Não foi possível obter as negociações da semana');
                    });
            });
    }

    obterNegociacoesDaSemanaAnterior() {
            return new Promise((resolve, reject) => {
                this._http
                    .get('negociacoes/anterior')
                    .then(negociacoes => {
                        resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    })
                    .catch(error => {
                        console.log(error);
                        reject('Não foi possível obter as negociações da semana');
                    });
            });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível obter as negociações da semana');
                });
        });
    }

    cadastra(negociacao){
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação cadastrada com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação');
            });
    }

    lista(){
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações');
            });
    }

    apaga() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoController(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações')
            })
    }

    importa(listaAtual) {

       return this.obterNegociacoesDaSemana()
           .then(negociacoes =>
               negociacoes.filter(negociacao =>
                   !listaAtual.some(negociacaoExistente =>
                       JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
           )
           .catch(erro => {
               console.log(erro);
               throw new Error("Não foi possível importar as negociações");
           });
   }

} 