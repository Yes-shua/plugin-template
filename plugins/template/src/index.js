// Importa as funções necessárias das APIs do Vendetta
import { logger } from "@vendetta";
import { registerCommand } from "@vendetta/commands";
import { sendMessage } from "@vendetta/api/chat";

// Esta variável irá guardar a função para desregistrar o nosso comando.
// É uma boa prática para que, ao desativar o plugin, o comando seja removido.
let unregister;

export default {
    onLoad: () => {
        logger.log("Plugin JJS carregado!");

        // Registra o comando slash quando o plugin é carregado
        unregister = registerCommand({
            // O nome que você digita no Discord (sem a /)
            name: "jjs",
            // O nome de exibição do comando
            displayName: "jjs",
            // A descrição que aparece na lista de comandos
            description: "Envia 'UM !' e depois 'DOIS !' no chat.",
            // ID da aplicação, "-1" para comandos do cliente
            applicationId: "-1",
            // Tipo de comando (1 para CHAT/SLASH)
            inputType: 1,
            type: 1,
            // Opções do comando (nenhuma neste caso)
            options: [],

            // A função que será executada quando o comando for usado
            // Usamos 'async' porque enviar mensagens é uma operação que pode demorar
            execute: async (args, ctx) => {
                try {
                    // Envia a primeira mensagem no canal atual (ctx.channel.id)
                    await sendMessage(ctx.channel.id, {
                        content: "UM !",
                    });

                    // Envia a segunda mensagem logo em seguida
                    await sendMessage(ctx.channel.id, {
                        content: "DOIS !",
                    });
                } catch (err) {
                    // Caso ocorra um erro, ele será logado para depuração
                    logger.error("Falha ao enviar mensagens com o comando /jjs", err);
                    // Opcional: Enviar uma mensagem de erro visível apenas para o usuário
                    sendMessage(ctx.channel.id, {
                        content: "❌ Ocorreu um erro ao tentar executar o comando /jjs.",
                        flags: 64 // Mensagem efêmera (só você vê)
                    });
                }
            },
        });
    },

    onUnload: () => {
        logger.log("Plugin JJS descarregado!");
        // Desregistra o comando quando o plugin é desativado
        // A verificação 'unregister &&' garante que a função só será chamada se o comando foi registrado com sucesso
        unregister && unregister();
    },
                                }
