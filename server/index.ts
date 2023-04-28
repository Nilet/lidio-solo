import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path'
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(fileUpload());
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  optionsSuccessStatus: 200,
};

app.use(express.static('./dist'));
app.use(cors(corsOptions))
app.use(express.json());
app.use((_, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});


app.post("/upload", (req, res ) => {
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }

        const uploadedFile = req.files.file;

        console.log(uploadedFile)
        res.send(`Filename is: ${JSON.stringify(uploadedFile)} `);
    }
);

app.get("/health-check", (_,res) => res.status(200).json({"asd" : "working as expected"}));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
