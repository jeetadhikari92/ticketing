import express from 'express';

const app = express();

app.use(express.json())

app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi');
})

app.listen(3000, () => {
  console.log('Auth service running at 3000!!!')
})