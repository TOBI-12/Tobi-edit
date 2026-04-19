
import fs from 'fs';
import path from 'path';

const menuImagePath = path.join(process.cwd(), 'src', 'completado.jpg');

let Handler = async (m, { conn, isAdmin }) => {
  const botNumber = conn.user?.jid || '';


  const senderIsBot = m.sender === botNumber;
  const senderIsAdmin = !!isAdmin;

  if (!senderIsBot && !senderIsAdmin) {
    return m.reply('🫢 Solo los administradores del grupo o el número vinculado al bot pueden cambiar la imagen del menú 🦆.');
  }

  if (!m.quoted || !/image/.test(m.quoted.mtype)) {
    return m.reply('🦊 Responde a una imagen con el comando *.newmeimg* para actualizar la imagen del menú.');
  }

  let media;
  try {

    if (typeof m.quoted.download === 'function') {
      media = await m.quoted.download();
    } else {
    
      media = await conn.downloadMediaMessage(m.quoted);
    }
  } catch (e) {
    return m.reply('❌ Error al descargar la imagen. Intenta de nuevo.');
  }

  try {
    fs.writeFileSync(menuImagePath, media);
    return m.reply('✅ Imagen del menú actualizada correctamente.');
  } catch (err) {
    return m.reply('❌ No se pudo guardar la imagen en el servidor. Revisa permisos y ruta.');
  }
};

Handler.command = ['newmeimg'];
export default Handler;
