//const { promisify } = require('node:util') // conviete en promesas un metodo nativo que no lo es [!] no recomendable

//const readFilePromise = promisify(fs.readFile)

const fs = require('node:fs/promises') //convierte rapido el fs en
promesas

console.log('Leyendo el primer archivo...')

fs.readFile('./archivo.txt', 'utf-8').then((text) => {
  console.log('primer texto:', text)
})

console.log('- Haciendo cosas mientras lee el archivo -')

console.log('Leyendo el segundo archivo...')

fs.readFile('./archivo2.txt', 'utf-8').then((text) => {
  console.log('segundo texto:', text)
})
