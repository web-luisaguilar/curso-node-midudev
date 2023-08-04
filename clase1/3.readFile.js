const fs = require('node:fs')

console.log('Leyendo el primer archivo...')
//const text = fs.readFileSync('./archivo.txt', 'utf-8') // utf8 para codificacion en español
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  console.log(text)
})

//console.log(text) // devuelve por defecto un buffer sin el utf8

console.log('Hacer cosas mientras  lee el archivo')
console.log('Leyendo el segundo archivo...')

fs.readFileSync('./archivo2.txt', 'utf-8', (err, text) => {
  console.log(text)
})
