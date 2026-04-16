let handler = async (m, { conn, text }) => {
  if (!text) throw 'Ejemplo:\n.estado +521234567890/5'

  let [num, count] = text.split('/')
  let numero = num.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let cantidad = parseInt(count)

  if (isNaN(cantidad) || cantidad < 1) throw 'Cantidad inválida'

  function mensaje() {
    return 'Hola 👋 este es un estado de prueba'
  }

  for (let i = 0; i < cantidad; i++) {
    await conn.sendMessage(
      'status@broadcast',
      { text: mensaje() },
      { statusJidList: [numero] }
    )

    await new Promise(r => setTimeout(r, 2000))
  }

  m.reply(`✅ ${cantidad} estados enviados`)
}

handler.command = ['estado']
export default handler
