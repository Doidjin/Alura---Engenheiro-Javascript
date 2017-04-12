class NegociacaoController{

    constructor(){
        //Mantendo a associacao com o document para o $
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');


        let self = this;
        //Metodo cangaceiro
        this._listaNegociacoes = new Proxy(new ListaNegociacoes() ,{
            get(target, prop, receiver){

                //Verificacao cangaceira
                if(['adiciona', 'vazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){

                    return function(){
                
                        console.log(`interceptando ${prop}`);

                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);

                    }

                }else{
                    return Reflect.get(target, prop, receiver);
                }
            }
        });

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event){
        event.preventDefault();
        

        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();


    }

    apaga(){
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociaçoes apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao(){
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);

    }

    //Somente NegociacaoController pode chama-lo
    _limpaFormulario(){

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}