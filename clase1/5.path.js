const path = require('node:path')

//`./content/subfolder/test.txt` //esto esta mal por el sistema operativo

// -> unix /
// -> windows \

//console.log(path.sep) //imprimer la barra de separacion para los path

////* unir rutas con path.join

//const filePath = path.join('content', 'subfolder', 'test.txt')

//console.log(filePath)

////* Obtener el nombre del archivo junto a su extencion
//const base = path.basename('/tmp/luis-secret/password.txt')
//console.log(base)

////* Obtener el nombre del archivo sin la extencion
//const filename = path.basename('/tmp/luis-secret/password.txt', '.txt')

//console.log(filename)

//* Obtener solo la extencion de un archivo

const extencion = path.extname('image.jpg')
console.log(extencion)
