import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'productosdb'
});

// GET /productos
app.get('/productos', (req: Request, res: Response) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST /productos
app.post('/productos', (req: Request, res: Response) => {
  const { nombre, descripcion, estado, categoria, precio, foto } = req.body;
  db.query(
    'INSERT INTO productos (nombre, descripcion, estado, categoria, precio, foto) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, descripcion, estado, categoria, precio, foto],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: (result as any).insertId, ...req.body });
    }
  );
});

// DELETE /productos/:id
app.delete('/productos/:id', (req: Request, res: Response) => {
  db.query('DELETE FROM productos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).send();
  });
});

app.listen(3000, '0.0.0.0', () => console.log('API corriendo en http://0.0.0.0:3000'));