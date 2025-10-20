/*

Strams 

process.stdin.pipe(process.stdout)

-----------------------------------------------

import {Readable, Writable, Transform}

Readable → fluxo de leitura

Writable → fluxo de escrita

Transform → fluxo de transformação (leitura + escrita)


--------------------------------------------- 
 _write(chunk, ecoding, callback)

 chunk => ele lé o que está dentro do this.push()

 ecoding => lé como etá decodificado 

 callback => é uma função que a stram de escrita precisa chamar, quando ela terminou de fazer a função

 buffer => transciciona dados 

*/

import {Readable, Writable, Transform} from 'node:stream'

//Fluxo de Leitura
class OneToHundredStream extends Readable {

    index = 1
    
    _read(){
        const i = this.index++

        setTimeout(() => {
            if( i > 100){
            this.push(null)
        } else {
            const buf = Buffer.from(String(i))
            this.push(buf)
        }
    }, 1000)
        
    }
    
}

//Fluxo de Transformação
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
    }
}

//Fluxo de Escrita
class MultiplyByTenStream extends Writable {
    _write(chunk, ecoding, callback){
        //processando o dado do this.push()
        console.log(Number(chunk.toString()) * 10)
        //chamando a função
        callback()
    }
}

new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream())