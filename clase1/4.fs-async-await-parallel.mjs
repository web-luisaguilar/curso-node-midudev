import { readFile } from 'node:fs/promises'

//lee los archivos por aparte en 2 procesos distintos y una vez que los dos archivos han sido leidos regresa el input
Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8'),
])
  .then(([text, secondText]) => {
    console.log('primer texto:', text)
    console.log('segundo teto:', secondText)
  })
  .catch((err) => {
    console.log('Error al leer los archivos')
    console.log(err)
  })
