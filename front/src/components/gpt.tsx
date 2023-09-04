import React, { useState } from 'react';



const Gpt: React.FC = () => {

    
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');


  const OPENAI_API_KEY = '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';


  const SendQuestion = () => {


    const sQuestion = inputValue;

    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        prompt: sQuestion,
        max_tokens: 100, // tamanho da resposta
        temperature: 0.5, // criatividade na resposta
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (resultValue) {
          setResultValue(resultValue + '\n');
        }

        if (json.error?.message) {
          setResultValue(`Error: ${json.error.message}`);
        } else if (json.choices?.[0].text) {
          const text = json.choices[0].text || 'Sem resposta';
          setResultValue('Chat GPT: ' + text);
        }

        // Restante do seu código
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        setInputValue('');
        // Restante do seu código
      });

    if (resultValue) {
      setResultValue(resultValue + '\n\n\n');
    }

    setResultValue(`Eu: ${sQuestion}`);
    setInputValue('Carregando...');

  };





  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Pergunte algo"
      />
      <textarea
        value={resultValue}
        onChange={() => {}}
        placeholder="Resposta da IA"
      ></textarea>
      <button onClick={SendQuestion}>Enviar Pergunta</button>
    </div>
  );

  
};


export default Gpt;
