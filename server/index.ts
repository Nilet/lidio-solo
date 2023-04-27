import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path'
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(fileUpload());
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions))
app.use(express.json());

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
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
