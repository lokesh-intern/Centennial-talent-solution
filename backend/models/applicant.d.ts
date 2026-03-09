import { Schema } from "mongoose";
declare const Applicant: import("mongoose").Model<{
    name: string;
    email: string;
    phone: string;
    address: string;
    resume: any;
    password: string;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    phone: string;
    address: string;
    resume: any;
    password: string;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    phone: string;
    address: string;
    resume: any;
    password: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    email: string;
    phone: string;
    address: string;
    resume: any;
    password: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    phone: string;
    address: string;
    resume: any;
    password: string;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    phone: string;
    address: string;
    resume: any;
    password: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: import("mongoose").SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: import("mongoose").SchemaDefinitionProperty<any, any, import("mongoose").Document<unknown, {}, {
        name: string;
        email: string;
        phone: string;
        address: string;
        resume: any;
        password: string;
    }, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<{
        name: string;
        email: string;
        phone: string;
        address: string;
        resume: any;
        password: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    name: string;
    email: string;
    phone: string;
    address: string;
    resume: any;
    password: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    email: string;
    phone: string;
    address: string;
    resume: any;
    password: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export default Applicant;
//# sourceMappingURL=applicant.d.ts.map