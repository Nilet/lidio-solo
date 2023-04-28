import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(fileUpload());

app.use(express.static(path.join(__dirname, '../dist')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());


app.post("/api/upload", (req, res ) => {
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }

        const uploadedFile = req.files.file;

        console.log(uploadedFile)
        res.send(`Filename is: ${JSON.stringify(uploadedFile)} `);
    }
);

app.get("/api/health-check", (_,res) => res.status(200).json({"asd" : "working as expected"}));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
