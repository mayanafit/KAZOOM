const TemplateModel = require('../models/Template');

class TemplateController {
    static getAll (req, res) {
        TemplateModel.findAll()
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(error => {
            return res.status(500).json({ message: error })
        })
    };
    static addTemplate(req, res) {
        if (req.body.title === "" || !req.body.title) {
            return res.status(400).json({ "message": "Title must be filled!" })
        }
        else if (req.body.questions.length < 1) {
            return res.status(400).json({ "message": "Questions must be filled!" })
        } else if (req.body.username === "" || !req.body.username) {
            return res.status(400).json({ "message": "Id User must be filled!" })
        }
        const newTemplate = {
            title: req.body.title,
            questions: req.body.questions,
            username: req.body.username,
        }
        TemplateModel.create(newTemplate)
        .then(data => {
            return res.status(201).json(data.ops[0])
        })
        .catch(error => {
            return res.status(500).json({ message: error });
        })
    };
    static deleteTemplate(req, res) {
        const id = req.params.id
        TemplateModel.delete(id)
        .then(data => {
            return res.status(200).json({ "messages": "Successfully Deleted Template!" })
        })
        .catch(err => {
            return res.status(500).json({ message: err });
        })
    }
}

module.exports = TemplateController;