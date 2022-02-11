import express from 'express';
import { Project } from '../models/schema.js';
import { verify } from './authRoutes.js';

const router = express.Router();

router.post('/get-projects', async (req, res) => {
    const token = req.body.user;
    const decodedToken = await verify(token);
    if (decodedToken.needAuth) res.status(401).send(decodedToken);
    else {
        const result = await Project.find({ user: decodedToken.id }, { title: 1 });
        res.send([result, decodedToken.id])
    }
});

router.post('/create-project', (req, res) => {
    const project = new Project({
        title: req.body.title,
        lists: [],
        user: req.body.user
    });
    project.save()
        .then(result => res.send(result))
        .catch(err => res.status(500).send('error creating project:' + err.message));
});

router.delete('/delete-project/:project', (req, res) => {
    Project.findByIdAndRemove(req.params.project)
        .then(result => res.send(result))
        .catch(err => res.status(500).send('error removing project:' + err.message))
});

export const projectRoutes = router;