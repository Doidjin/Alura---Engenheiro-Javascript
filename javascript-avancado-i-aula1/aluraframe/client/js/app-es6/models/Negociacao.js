export class Negociacao{

    constructor(data, quantidade, valor){
        //_ -> Propriedades só podem ser acessadas pelos métodos da classe
        //Aviso para o programador não alterar e nem acessar esses caras _
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;

        //Congelando o objeto para nao poder alteralo
        Object.freeze(this);
    }
    //Métodos acessores
    get volume(){
        return this._quantidade * this._valor;
    }

    //Métodos acessadores
    get data(){
        return new Date(this._data.getTime());
    }
    //Métodos acessadores
    get quantidade(){
        return this._quantidade;
    }
    //Métodos acessadores
    get valor(){
        return this._valor;
    }
}