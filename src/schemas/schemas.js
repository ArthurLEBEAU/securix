const PostSchema = {
    "info": {
        table: "posts",
        timeStamp: true
    },
    "attributes": [
        {
            name: 'id',
            type: "bigint",
            num: 20,
            isIncrement: true,
            isPrimary: true,
            isNull: false,
            default: '',
            unique: true
        }, {
            name:'title',
            type: "varchar",
            num: 255,
            isIncrement: false,
            isPrimary: false,
            isNull: false,
            default: '',
            unique: true
        },{
            name: "description",
            type: "longtext",
            num: null,
            isIncrement: false,
            isPrimary: false,
            isNull: true,
            default: 'ma description',
            unique: false
        }
    ]
}

const CayegorieSchema = {
    "info": {
        table: "categories",
        timeStamp: true
    },
    "attributes": [
        {
            name: 'id',
            type: "bigint",
            num: 20,
            isIncrement: true,
            isPrimary: true,
            isNull: false,
            default: '',
            unique: true
        }, {
            name:'title',
            type: "varchar",
            num: 255,
            isIncrement: false,
            isPrimary: false,
            isNull: false,
            default: '',
            unique: true
        }
    ]
}


const schemas = [PostSchema, CayegorieSchema]
export default schemas;