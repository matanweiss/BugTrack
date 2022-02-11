import express from 'express';
import { Project, Item } from '../models/schema.js'

const router = express.Router();

router.get('/get-item/:list/:item', async (req, res) => {
    const project = await Project.findOne({ 'lists._id': req.params.list });
    const list = project.lists.id(req.params.list);
    const item = list.items.id(req.params.item);
    res.send(item);
});

router.post('/create-item/:list', async (req, res) => {
    let newItem = new Item({
        title: req.body.title, bug: false, done: false
    });
    try {

        const project = await Project.findOne({ 'lists._id': req.params.list });
        const list = project.lists.id(req.params.list);
        list.items.push(newItem);
        const result = await project.save();
        res.send(result);
    }
    catch (err) {
        res.status(500).send('error creating item:' + err.message);
    }
});

router.post('/edit-item/:list/:item', async (req, res) => {
    try {

        const project = await Project.findOne({ 'lists._id': req.params.list });
        const item = project.lists.id(req.params.list).items.id(req.params.item);
        item.title = req.body.title;
        item.bug = req.body.bug;
        item.done = req.body.done;
        item.description = req.body.description;
        const result = await project.save();
        res.send(result);
    }
    catch (err) {
        res.status(500).send('error editing item:' + err.message);
    }
});

router.delete('/delete-item/:list/:item', async (req, res) => {
    try {

        const project = await Project.findOne({ 'lists._id': req.params.list });
        const list = project.lists.id(req.params.list);
        list.items.id(req.params.item).remove();
        const result = await project.save();
        res.send(result);
    }
    catch (err) {
        res.status(500).send('error removing item:' + err.message);
    }
});

export const itemRoutes = router;
