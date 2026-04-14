import { guardarActivo, setGuardar, obtenerMensajes, borrarMensajes } from '../lib/guardador.js'

let handler = async (m, { conn, text, command }) => {

  // 🔘 ENCENDER / APAGAR
  if (command === 'guardar') {
    if (!text) return m.reply('Usa:\n.guardar on\n.guardar off')

    if (text.toLowerCase() === 'on') {
      if (guardarActivo) return m.reply('⚠️ Ya está activado')

      setGuardar(true)
      m.reply('📦 Guardado ACTIVADO ✅')
    } else if (text.toLowerCase() === 'off') {
      if (!guardarActivo) return m.reply('⚠️ Ya está desactivado')

      setGuardar(false)
      m.reply('📦 Guardado DESACTIVADO ❌')
    } else {
      m.reply('❌ Opción inválida\nUsa:\n.guardar on\n.guardar off')
    }
  }

  // 🔁 REENVIAR
  if (command === 'reenviar') {
    let mensajes = obtenerMensajes()
    if (mensajes.length === 0) return m.reply('No hay mensajes guardados')

    for (let msg of mensajes) {
      await conn.copyNForward(m.chat, msg, true)
    }

    m.reply(`✅ Reenviados: ${mensajes.length}`)
  }

  // 📥 DESCARGAR (MISMO CHAT)
  if (command === 'descargar') {
    let mensajes = obtenerMensajes()
    if (mensajes.length === 0) return m.reply('No hay mensajes guardados')

    for (let msg of mensajes) {
      await conn.copyNForward(m.chat, msg, true)
    }

    m.reply(`📥 Descargados: ${mensajes.length}`)
  }

  // 🗑️ BORRAR
  if (command === 'borrar') {
    borrarMensajes()
    m.reply('🗑️ Todos los mensajes eliminados')
  }
}

handler.command = ['guardar', 'reenviar', 'descargar', 'borrar']

export default handler
