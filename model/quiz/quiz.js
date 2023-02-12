const mongoose = require('mongoose');
const DB_URL = "mongodb+srv://edu-project:edu-project@cluster0.ywh1iey.mongodb.net/?retryWrites=true&w=majority";
const signModel = require('../user/sign');
let quizSchema = mongoose.Schema({
    name:String,
    mcq:[],
    start:Date,
    duration:Date
});

let Quiz = mongoose.model('quiz',quizSchema);


exports.addQuiz = (name,mcq,start,duration)=>{
    return new Promise(async(resolve,reject)=>{
       await mongoose.connect(DB_URL).then(()=>{
            let quiz = new Quiz({
                name:name,
                mcq:mcq,
                start:start,
                duration,duration
            })

           return quiz.save();
        }).then(()=>{
            mongoose.disconnect();
            resolve('done');
        }).catch(()=>{
            mongoose.disconnect();
            resolve(false)
        })
    })
}

exports.getQuiz = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            Quiz.find().then((q)=>{
                if(q)
                {
                mongoose.disconnect();
                resolve(q);
                }
            }).then(()=>{
                mongoose.disconnect();
                resolve('there is no exam');
            }).catch(()=>{
                mongoose.disconnect();
                resolve(false)
            })
        })
    })
}

exports.saveQuiz = (_id,name,degree)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
         return  signModel.User.findByIdAndUpdate({_id:_id},{$push:{finished_exam:{name:name,degree:degree}}});
        }).then(()=>{
            mongoose.disconnect();
            resolve('done');
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}