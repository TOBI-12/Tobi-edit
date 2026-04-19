let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) {
    return conn.reply(m.chat,
`❌ Usa:
${usedPrefix + command} <link de TikTok>`, m)
  }

  if (!/tiktok\.com|vt\.tiktok|vm\.tiktok/i.test(text)) {
    return conn.reply(m.chat, '❌ Link inválido de TikTok', m)
  }

  await m.react('⏱️')

  let video = null

  
  try {
    let res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(text)}`)
    let json = await res.json()

    video = json.data?.play
  } catch {}


  if (!video) {
    try {
      let res = await fetch(`https://api.dorratz.com/tiktok?url=${encodeURIComponent(text)}`)
      let json = await res.json()

      video = json?.video?.no_watermark
    } catch {}
  }

  if (!video) {
    try {
      let res = await fetch(`https://api.agatz.xyz/api/tiktok?url=${encodeURIComponent(text)}`)
      let json = await res.json()

      video = json.data?.play
    } catch {}
  }

  if (!video) {
    await m.react('❌')
    return conn.reply(m.chat, '❌ No se pudo obtener el video (intenta otro link)', m)
  }

  try {
    await conn.sendFile(m.chat, video, 'tiktok.mp4', '😼 disfruta tu video', m)
    await m.react('🦆')
  } catch (e) {
    console.log(e)
    await m.react('❌')
    conn.reply(m.chat, '❌ Error al enviar el video (puede ser pesado)', m)
  }
}

handler.command = /^(tiktok|tt|ttdl)$/i
handler.limit = true

export default handler
