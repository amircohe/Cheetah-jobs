const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth')
    
    const sock = makeWASocket({ auth: state })
    
    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message) return

        const text = msg.message.conversation || ''
        const fromGroup = msg.key.remoteJid.endsWith('@g.us')

        if (fromGroup && msg.key.remoteJid === 'ID_של_הקבוצה_המקורית@g.us') {
            
            const groups = [
                'ID_קבוצה_1@g.us',
                'ID_קבוצה_2@g.us',
                'ID_קבוצה_3@g.us',
            ]

            for (const group of groups) {
                await sock.sendMessage(group, { text: text })
            }
        }
    })
}

startBot()
