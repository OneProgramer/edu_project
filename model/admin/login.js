const mongoose = require('mongoose');
const DB_URL = "mongodb+srv://edu-project:edu-project@cluster0.ywh1iey.mongodb.net/?retryWrites=true&w=majority";

const adminSchema = mongoose.Schema({
    email:String,
    password:String
});

const Admin = mongoose.model('admin',adminSchema);

exports.login = (email,password)=>{
    return new Promise(async(resolve,reject)=>{
       await mongoose.connect(DB_URL).then(()=>{
           return Admin.findOne({email:email}).then((admin)=>{
            if(admin && admin.password == password)
            {
                mongoose.disconnect();
                resolve('done')
            }else{
                mongoose.disconnect();
                resolve('email or password is wrong.')
            }
           }).catch(()=>{
                mongoose.disconnect();
                resolve(false);
           })
        })
    })
}

// exports.sign = ()=>{
//     return new Promise((resolve,reject)=>{
//         mongoose.connect(DB_URL).then(()=>{
//             let admin = new Admin({
//                 email:'admin@gmail.com',
//                 password:'0123456789'
//             })

//           return admin.save();
//         }).then(()=>{
//             mongoose.disconnect();
//             resolve('done');
//         }).catch(()=>{
//             mongoose.disconnect();
//             resolve(false);
//         })
//     })
// }