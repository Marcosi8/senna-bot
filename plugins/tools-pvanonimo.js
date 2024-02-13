let handler = async (m) => {
    let txt = args.join(" ");
    if (!txt) return reply(`Exemplo: ${prefix + command} +55 00.../Oi amor, sdds`);
    let txt1 = txt.split("/")[0].replace(/\D/g,'');
    let txt2 = txt.split("/")[1];
    if (!txt1) return reply('Cadê o número da pessoa?');
    if (!txt2) return reply('Cadê a mensagem do correio??');
    let [result] = await this.onWhatsApp(txt1); // Supondo que this.onWhatsApp seja o método para encontrar informações do número no seu bot.
    if (!result) return reply(`Número inválido`);
    let bla = `
┞┧Msg: ${txt2}`;
    await this.sendMessage(result.jid, { text: bla }); // Supondo que this.sendMessage seja o método para enviar mensagens no seu bot.
    reply(`Mensagem enviada com sucesso para wa.me/${result.jid.split("@")[0]}`);
};

handler.help = ['pvcorreio'];
handler.tags = ['tools', 'prime'];
handler.command = /^pvcorreio|mail$/i;

export default handler;