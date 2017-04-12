class ListaNegociacoes{

    constructor(armadilha){
        this._negociacoes = [];

    }

    adiciona(negociacao){

        this._negociacoes = [].concat(this._negociacoes, negociacao);
        //this._negociacoes.push(negociacao);

    }

    //Blindando a propriedade - ninguem pode altera-la
    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = [];

    }
}