class View{

    constructor(elemento){

        this._elemento = elemento;
    }

    template(){

        throw new ('O método view precisa ser implementado!');
    }

    update(model){

        this._elemento.innerHTML = this.template(model);
    }
}