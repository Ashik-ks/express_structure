const users = require('../db/model/users')
const {error_function , success_function} = require('../utils/response-handler')

exports.createUser =  async function (req, res)  {

    try {
        let body = req.body;
    console.log("body : ", body);

    // let name = body.name;
    // console.log("name : ", name)

    let new_user = await users.create(body);

    if (new_user) {

        let response = success_function({
            statuscode : 200,
            message : "user created successfully"
        })
        res.status(response.statuscode).send(response);
        return;
    }
    else {

        let response = error_function ({
            statuscode : 400,
            message : "user created failed"
        })
        res.status(response.statuscode).send(response);
        return;
    }
    } catch (error) {
        console.log("error : ", error);
        let response = error_function ({
            statuscode : 400,
            message : "user created failed"
        })
        res.status(response.statuscode).send(response);
        return;
    }
}

exports.getallUser = async function (req,res) {
    try  {
            let userData = await users.find();
            console.log("userData : ",userData);
        
            res.status(200).send(userData);
            return;
            
    } catch (error) {
        let response = error_function ({
            statuscode : 400,
            message : "user created failed"
        })
        res.status(response.statuscode).send(response);
        return;
    }
}

exports.getsingleUser = async function (req,res) {
    try {

        let id = req.params.id;
            console.log("id : ",id);
    
            let user_data = await users.findOne({ _id : id});
            console.log("user_data7 : ",user_data);

            let str_user_data = JSON.stringify(user_data);
            console.log("str_user_data : ",str_user_data);
    
            res.status(200).send(str_user_data);
            return;
        } catch (error) {
            let response = error_function ({
                statuscode : 400,
                message : "user created failed"
            })
            res.status(response.statuscode).send(response);
            return;
        }
}

exports.updateUser = async function (req,res) {
    try {
        let body = req.body;
                   console.log("body : ",body);
                    
                   let updated_datas = {
                    name : body.name,
                    image : body.image,
                    price : body.price,
                    category : body.category,
                    use : body.use,
                    description : body.description,
                }

                    let id = req.params.id;
                    console.log("id : ",id,typeof(id));

                    // let _id = new ObjectId(id);
                    // console.log("_id" ,_id,typeof(_id))
                    
                    let editdata = await users.updateOne({_id : id},{$set : updated_datas});
                    console.log("editdata",editdata);

                    res.status(200).send(editdata);
    }  catch (error) {
        console.log("error : ",error)
    }
       
}
exports.deleteUser = async function (req,res) {
    try {
        let id =req.params.id;
                    console.log("id : ",id,typeof(id));

                    // let _id = new ObjectId(id);
                    // console.log("_id" ,_id,typeof(_id))
                    
                    let editdata = await users.deleteOne({_id : id});
                    console.log("editdata",editdata);

                    res.status(200).send(editdata);
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send(error.message ? error.message : "Something went wrong");
        return;
    }
}