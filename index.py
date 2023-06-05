import os
import openai
openai.api_key = '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'
openai.proxy = 'http://127.0.0.1:7890'
completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "user", "content": "Hello!"}
  ]
)

print(completion.choices[0].message)