import fs from 'fs'
import path from 'path'

const folder = './database/mensajes'

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder, { recursive: true })
}

export let guardarActivo = false

export function setGuardar(valor) {
  guardarActivo = valor
}

export function guardarMensaje(msg) {
  const id = Date.now() + '_' + Math.floor(Math.random() * 1000)
  const filePath = path.join(folder, `${id}.json`)
  fs.writeFileSync(filePath, JSON.stringify(msg, null, 2))
}

export function obtenerMensajes() {
  const files = fs.readdirSync(folder)
  return files.map(file => {
    const data = fs.readFileSync(path.join(folder, file))
    return JSON.parse(data)
  })
}

export function borrarMensajes() {
  const files = fs.readdirSync(folder)
  for (let file of files) {
    fs.unlinkSync(path.join(folder, file))
  }
}
