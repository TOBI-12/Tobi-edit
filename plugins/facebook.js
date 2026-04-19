let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) {
    return conn.reply(m.chat,
`🫠 Usa:
${usedPrefix + command} <link de Facebook>`, m)
  }

  if (!/facebook\.com|fb\.watch/i.test(text)) {
    return conn.reply(m.chat, '❌ Link inválido de Facebook', m)
  }

  await m.react('⏱️')

  let video = null
  let thumb = null

  try {
  
    let res = await fetch(`https://api.agatz.xyz/api/facebook?url=${encodeURIComponent(text)}`)
    let json = await res.json()

    video = json.data?.hd || json.data?.sd
    thumb = json.data?.thumbnail

  } catch {}

  if (!video) {
    try {

      let res = await fetch(`https://api.dorratz.com/fbvideo?url=${encodeURIComponent(text)}`)
      let json = await res.json()

      let vid = json.find(v => v.url && v.url.startsWith('http'))
      if (vid) video = vid.url

    } catch {}
  }

  if (!video) {
    await m.react('❌')
    return conn.reply(m.chat, '❌ No se pudo obtener el video', m)
  }

  try {
    // preview opcional
    if (thumb) {
      await conn.sendFile(m.chat, thumb, 'thumb.jpg', '📥 Descargando...', m)
    }

    // enviar directo
    await conn.sendFile(m.chat, video, 'fb.mp4', 'Disfruta tu video 😼 By Tobi', m)

    await m.react('✅')

  } catch (e) {
    console.log(e)
    await m.react('❌')
    conn.reply(m.chat, '❌ Error al enviar el video (puede ser muy pesado)', m)
  }
}

handler.command = /^(fb|facebook|fbdl)$/i
handler.limit = true

export default handler
