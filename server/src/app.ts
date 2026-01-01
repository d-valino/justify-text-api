import express from "express"
// import { justify } from './modules/justify.js'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/justify', express.text({ type: 'text/plain' }), (req, res) => {
  const input: string = req.body;

  // const output = justify(input);

  res.set('Content-Type', 'text/plain');
  res.send('output');
})

export default app
