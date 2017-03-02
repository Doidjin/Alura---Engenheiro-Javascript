class DateHelper{

    constructor(){

        throw new Error('DateHelper não pode ser instanciada');

    }

    static textoParaData(texto){

        let a = (/\d{4}-\d{2}-\d{2}/.test(texto));

        if(!a) 
            throw new ('O formato da data deveria ser aaaa-mm-dd');

        return new Date(...texto.split('-').map(function(item, indice){
                                        if(indice == 1)
                                            return item - 1;
                                        return item; 
                                    }));
    }

    static dataParaTexto(data){


        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;

    }
}