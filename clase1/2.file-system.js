//Sistema de archivos con File system

const fs = require('node:fs') //a partir de Node 16 se recomienda poner node: antes del modulo

const stats = fs.statSync('./archivo.txt')
console.log(stats)
console.log(
  stats.isFile(), //si es un fichero
  stats.isDirectory(), //si es un directorio
  stats.isSymbolicLink(), //si es un enlace simbolico
  stats.size //tamaño en bytes
)
