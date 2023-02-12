const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const DB_URL = "mongodb+srv://edu-project:edu-project@cluster0.ywh1iey.mongodb.net/?retryWrites=true&w=majority";
const signModel = require('./sign');
const bcrypt = require('bcrypt');

exports.login = (phone,password)=>{
    return new Promise(async(resolve,reject)=>{
        await mongoose.connect(DB_URL).then(()=>{
            return signModel.User.findOne({phone:phone}).then((user)=>{
                if(user)
                {
                    if(bcrypt.compareSync(password,user.password))
                    {
                        mongoose.disconnect();
                        resolve(user);
                    }else{
                        mongoose.disconnect();
                        resolve('phone or password is wrong.');
                    }
                }else{
                    mongoose.disconnect();
                    resolve('phone or password is wrong.');
                }
            }).catch((err)=>{
                mongoose.disconnect();
                reject(err);
            })
        })
    })
}