import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { enviarEmail } from './controllers/contact';

dotenv.config();

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }, // Ordena por data de criação decrescente
    });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar mensagens.' });
  }
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });
    // await enviarEmail(name, email, message);
    console.log(name, email, message)

    res.send({ message: 'Mensagem enviada com sucesso!' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Houve um erro ao enviar a mensagem. Tente novamente.' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🚀`);
});
