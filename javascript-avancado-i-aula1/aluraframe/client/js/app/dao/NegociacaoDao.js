class NegociacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let request = this
                ._connection
                .transaction([this._store],"readwrite")
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = (e) => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');
            };                
        });
    }

    listaTodos(){
        return new Promise((resolve, reject) => {
            
           let cursos = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

            cursos.onsuccess = e => {

                let atual = e.target.result;

                if(atual){
                    let dado = atual.value;

                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                    atual.continue();
                }else{
                    resolve(negociacoes);
                }
            };

            cursos.onerror = e => {

                console.log(e.target.error.name);
                reject('Não foi possível listas as negociacoes');
            };
        
        });
    }

    apagaTodos(){

        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => {
                resolve('Negociações removidas com sucesso');
            };    

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível remover as negociações');
            }
        });

    }
}