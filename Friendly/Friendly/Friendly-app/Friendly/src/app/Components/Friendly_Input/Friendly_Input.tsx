import { useRef, useState } from 'react'; 
import './Friendly_Input.css';
import { BiSolidSend } from "react-icons/bi";

// Definir o tipo Message
type Message = {
  role: 'system' | 'user' | 'assistant';  // Define os papéis possíveis
  content: string;  // O conteúdo da mensagem
};

type Emotion = 'Alegre' | 'Triste' | 'Neutro' | 'Irritado' | 'Confuso'; // Adicione mais emoções conforme necessário

const emotionMapping: Record<Emotion, number> = {
  Alegre: 10,
  Confuso: 20,
  Triste: 30,
  Irritado: 40,
  Neutro: 0,
};

const Friendly_Input = ({ onChange }: { onChange: (newEmotion: number) => void }) => {
  const [response, setResponse] = useState('');  // Resposta da AI
  const [messageHistory, setMessageHistory] = useState<Message[]>([]); // Tipar o histórico de mensagens
  const spanRef = useRef<HTMLSpanElement>(null);
  const maxLength = 500;
  const [emocao, setEmocao] = useState<number>(0); // Altera para number

  const handleContentChange = (event: React.FormEvent<HTMLSpanElement>) => {
    let newContent = event.currentTarget.textContent || "";
    if (newContent.length > maxLength) {
      newContent = newContent.slice(0, maxLength);
    }
    if (spanRef.current) {
      spanRef.current.textContent = newContent;
    }
  };

  const handleSend = async () => {
    const userMessage = spanRef.current?.textContent || '';
    if (!userMessage) return;

    console.log("Enviando mensagem:", userMessage);

    // Faz a requisição para a API de emoções
    const emotionResponse = await fetch('/api/emocao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mensagem: userMessage }), // Envia a mensagem para detectar a emoção
    });

    const emotionData = await emotionResponse.json();
    
    // Atualiza o estado da emoção usando o mapeamento
    const newEmotion = emotionMapping[emotionData.emocao as Emotion]; // Garante que o valor é do tipo Emotion
    setEmocao(newEmotion); // Agora é do tipo number
    onChange(newEmotion); // Passa a nova emoção para o componente pai

    // Faz a requisição para o back-end enviando a mensagem do usuário e o histórico de mensagens
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userMessage, messageHistory, emotion: emotionData }), // Envia mensagem, histórico e emoção
    });

    const data = await response.json();
    const botMessage = data.message;

    // Atualiza o histórico de mensagens com a nova interação
    setMessageHistory([
      ...messageHistory, 
      { role: 'user', content: userMessage },
      { role: 'assistant', content: botMessage }
    ]);

    setResponse(botMessage);  // Atualiza a resposta da AI
    if (spanRef.current) {
      spanRef.current.textContent = ''; // Limpa o input
    }
  };

  return (
    <div id='Friendly_Input'>
      <label htmlFor="span_textarea">
        <span 
          id='span_textarea' 
          role="textbox" 
          contentEditable 
          ref={spanRef} 
          aria-label="Digite sua pergunta aqui"
          onInput={handleContentChange}
        ></span>
        <button type="button" id='enviar_diagnostico' aria-label="Enviar pergunta" onClick={handleSend}>
          <BiSolidSend size={20} style={{ transform: 'rotate(-45deg)' }} aria-hidden="true" />
        </button>
      </label>
      <p>A AI do Friendly pode apresentar informações imprecisas. Por isso, cheque as respostas.</p>
      {response && <p>Resposta: {response}</p>} {/* Mostra a resposta do bot */}
      {/* {emocao && <p>Emoção reconhecida: {emocao}</p>}  */}{/* Mostra a emoção detectada */}
    </div>
  );
}

export default Friendly_Input;
