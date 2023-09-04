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

    <div className='gpt-wrapper'>



      <div className='gpt-answer-wrapper'>
          <textarea
            className='gpt-answer-wrapper-txt-area'
            value={resultValue}
            onChange={() => {}}
            placeholder="GPT: Olá!"
          ></textarea>
      </div>
      

      <div className='gpt-question-wrapper'>
          <textarea
            className='gpt-question-wrapper-txt-area'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Pergunte algo..."
          />
      </div>


      <button className='questionButton-gpt' onClick={SendQuestion}>Enviar Pergunta</button>


    </div>
  );


};


export default Gpt;
