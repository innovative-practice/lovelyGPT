
// import { ChatCompletionRequestMessage, Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';
  const { Configuration, OpenAIApi } = require('openai')

  const model = 'gpt-3.5-turbo';

  function getOpenAI() {
    const configuration = new Configuration({
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);
    return openai;
  }

  export async function askChatGPT(requestMessage) {
    const completion = await getOpenAI().createChatCompletion(
      getCompletion(requestMessage),
      // {...getOptions()}
      {
        "headers": {
          'Content-Type': 'application/json',
          // 'User-Agent': 'LovelyGPT',
          'Authorization': 'Bearer ' + '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'
        },
        "proxy": {
          "host": '127.0.0.1',
          "port": 7890,
          "protocol": 'http'
        }
      }
    );
    return completion.data.choices[0].message.content;
  }

  function getCompletion(messages) {
    return {
      model: model,
      messages: messages,
      temperature: 0.5,
      max_tokens: 512,
      presence_penalty: 0.6,
      frequency_penalty: 0.5,
    }
  }

  const messages = [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "今天天气怎么样" },
  ]

// askChatGPT(messages).then((response) => {
//   console.log(response);
// }).catch(error => {
//   console.log(error);
// });