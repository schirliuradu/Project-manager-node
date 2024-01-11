import dotenv from 'dotenv';
dotenv.config(); // setup env vars

import bodyParser from 'body-parser';
import projectRoutes from './http/routes/project-router';
import express, {Application} from 'express';

const app: Application = express();

app.use(bodyParser.json());
app.use("/api/projects", projectRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});