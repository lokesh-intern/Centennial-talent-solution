import {Schema,model} from "mongoose"

const ApplicantSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    resume:{
        type: Object,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Applicant = model('Applicant',ApplicantSchema);
export default Applicant;