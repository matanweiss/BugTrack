import express from 'express';
import { Project, List } from '../models/schema.js'

const router = express.Router();

router.get('/get-lists/:project', (req, res) => {
    Project.findById(req.params.project)
        .then(result => res.send(result))
        .catch(err => res.status(500).send('error reading lists:' + err.message));
});

router.delete('/delete-list/:list', async (req, res) => {
    try {
        const project = await Project.findOne({ 'lists._id': req.params.list });
        project.lists.id(req.params.list).remove();
        const result = await project.save();
        res.send(result);
    }
    catch (err) {
        res.status(500).send('error removing list:' + err.message);
    }
});

router.post('/create-list/:project', async (req, res) => {
    try {
        const project = await Project.findById(req.params.project);
        project.lists.push(new List({
            title: req.body.title,
            items: []
        }));
        const result = project.save();
        res.send(result);
    }
    catch (err) {
        res.status(500).send('error creating list:' + err.message);
    }
});

export const listRoutes = router;
