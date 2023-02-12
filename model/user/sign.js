const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const DB_URL = "mongodb+srv://edu-project:edu-project@cluster0.ywh1iey.mongodb.net/?retryWrites=true&w=majority";
const bcrypt = require('bcrypt');
const saltRounds = 10;




let userSchema = mongoose.Schema({
    first_name : String,
    last_name  : String,
    email : String,
    password: String,
    phone:String,
    finished_exam : [{name:String,degree:Number}]
});

let User = mongoose.model('user',userSchema);
exports.User = mongoose.model('user',userSchema);
exports.SignUp = (first_name,last_name,email,password,phone)=>{
    return new Promise(async(resolve,reject)=>{
      await  mongoose.connect(DB_URL).then(()=>{
            return User.findOne({phone:phone}).then((user)=>{
                if(user)
                {
                    mongoose.disconnect();
                    resolve('phone number is already exist.');
                }else{
                    const hash = bcrypt.hashSync(password,saltRounds);
                    let user = new User({
                        first_name:first_name,
                        last_name:last_name,
                        email:email,
                        password:hash,
                        phone:phone
                    });

                    return user.save();
                }
            }).then(()=>{
                mongoose.disconnect();
                resolve('account created'); 
            }).catch((err)=>{
                mongoose.disconnect();
                reject(err);
            })
        })
    })
}


exports.edit = (_id,email,password,phone)=>{
    return new Promise(async(resolve,reject)=>{
      await  mongoose.connect(DB_URL).then(()=>{
             const hash = bcrypt.hashSync(password,saltRounds);
            return User.findOneAndUpdate({_id:_id},{$set:{email:email,password:hash,phone:phone}})
        }).then(()=>{
            mongoose.disconnect()
            resolve('done')
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err)
        })
    })
}