import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(fileUpload());
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions))

app.post("/upload", (req, res ) => {
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }

        const uploadedFile = req.files.file;

        console.log(uploadedFile)
        res.send(`Filename is: ${uploadedFile} `);
    }
);

app.get("/health-check", (_,res) => res.status(200).send("Working as expected"));

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
