const express = require('express');
const router = express.Router();
const quizModel = require('../../model/quiz/quiz');
const auth = require('../auth');


router.post('/add', auth, async (req, res) => {

    if (req.body.name && req.body.mcq && req.body.date) {
        await quizModel.addQuiz(req.body.name, req.body.mcq, req.body.date).then((value) => {
            res.json({ value: value });
        }).catch(() => {
            res.json({ value: false });
        })
    } else {
        res.json({ value: "lack data" });
    }
})


router.post('/get', auth, async (req, res) => {
    let finished_exam = req.body.finished_exam;
    if (finished_exam) {
        await quizModel.getQuiz().then((value) => {
            // add user`s finished exam 
            let finished = [];
            for (let i = 0; i < finished_exam.length; i++) {
                finished.push(finished_exam[i].name);
            }
            let exam = [];
            for (let i = 0; i < value.length; i++) {
                let date = new Date(`${value[i].start}`)
                date.setMinutes(date.getMinutes() + value[i].duration);
                // dont show quiz if already finished or time out 
                if (finished.includes(value[i].name) || (new Date() - date > 0) || (new Date() < value[i].start)) {
                    continue;
                } else {
                    exam.push({ name: value[i].name, mcq: value[i].mcq, date: value[i].date });
                }
            }
            res.json({ value: exam })
        }).catch(() => {
            res.json({ value: false });
        })
    } else {
        res.json({ value: "lack data" });
    }
})


router.post('/save', auth, (req, res) => {
    let _id = req.body._id;
    let name = req.body.name;
    let degree = req.body.degree;

    if (_id && name && degree) {
        quizModel.saveQuiz(_id, name, degree).then((value) => {
            res.json({ value: value });
        })
    }
    else {
        res.json({ value: 'lack data' });
    }
})

module.exports = router;