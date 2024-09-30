import openai

# Coloque sua chave de API aqui
api_key = "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"
openai.api_key = api_key


# Definir estado emocional do usuário
def analisar_emocao(mensagem):
    if "bravo" in mensagem or "irritado" in mensagem:
        return "Você está bravo e eu também estou frustrado, mas estou aqui para ajudar."
    elif "feliz" in mensagem or "alegre" in mensagem:
        return "Que bom que você está feliz! Eu também estou muito empolgado para ajudar."
    else:
        return "Estou aqui para te ajudar, seja qual for o seu humor!"


# Lista de mensagens para manter a conversa
mensagens = [
    {"role": "system",
     "content": "Você é Friendly, um amigo virtual projetado para ajudar o usuário com diversas tarefas. Você adapta seu comportamento e tom emocional de acordo com o estado emocional do usuário. Se o usuário estiver bravo, você também expressa frustração de maneira empática. Se o usuário estiver feliz, você deve demonstrar entusiasmo. Você sempre oferece apoio prático e emocional."}
]

# Loop de conversa contínua
while True:
    user_input = input("Você: ")

    # Condição de saída da conversa
    if user_input.lower() in ["sair", "exit"]:
        print("Friendly: Foi um prazer ajudar! Até logo!")
        break

    # Analisar o estado emocional do usuário
    resposta_emocional = analisar_emocao(user_input)

    # Adicionar a entrada do usuário à conversa
    mensagens.append({"role": "user", "content": user_input})

    # Enviar a requisição para o modelo GPT-3.5
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=mensagens
        )

        # Pegar a resposta do Friendly
        resposta_friendly = response['choices'][0]['message']['content']
        print(f"Friendly: {resposta_friendly}")

        # Incluir a resposta emocional baseada no estado do usuário
        print(f"Friendly (emocional): {resposta_emocional}")

        # Adicionar a resposta do Friendly à conversa para manter o contexto
        mensagens.append({"role": "assistant", "content": resposta_friendly})

    except openai.error.RateLimitError:
        print("Atingiu o limite de requisições. Aguardando antes de tentar novamente.")
