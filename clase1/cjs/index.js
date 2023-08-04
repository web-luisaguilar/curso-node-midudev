'use strict'

//CommonJS require module
const sum = require('./sum')
//console.log(window) // no hay window en node

//console.log(globalThis) //variable global en toda la aplicacion
//en navegador apunta a *window* y en node apunta *global*

console.log(sum(1, 2))
