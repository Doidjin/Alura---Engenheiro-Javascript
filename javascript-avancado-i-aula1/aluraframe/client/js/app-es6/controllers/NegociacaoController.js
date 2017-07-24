import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';
import {Negociacao} from '../models/Negociacao';

class NegociacaoController{

    constructor(){
        //Mantendo a associacao com o document para o $
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        this._service = new NegociacaoService();

        this._init();
    }

    _init() {

      this._service
          .lista()
          .then(negociacoes =>
              negociacoes.forEach(negociacao =>
                  this._listaNegociacoes.adiciona(negociacao)))
          .catch(erro => this._mensagem.texto = erro);

          setInterval(() => {
              this.importaNegociacoes();
          }, 3000);
}

    adiciona(event){
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes() {

        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'
            }))
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga(){

        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
                console.log('As negociações foram apagadas com sucesso')
            })
            .catch(erro => this._mensagem.erro = erro);
    }

    _criaNegociacao(){
        
        return new NegociacaoService(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));

    }

    //Somente NegociacaoController pode chama-lo
    _limpaFormulario(){

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}

let negociacaoController = new NegociacaoController();

function currentInstance(){
    return negociacaoController;
}