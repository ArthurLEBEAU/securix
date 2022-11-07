
export default class CreateCategorieValidator{
    constructor(item){
        this.item = item
        this.schema = {
            title: {
                type: 'string',
                required: true
            }
            // user: {
            //     type: 'string',
            //     optinal: true
            // }
        }
    }

    validate(){
        let res = {}
        let error = {}

        for (const key in this.schema) {
            if (Object.hasOwnProperty.call(this.item, key)) {
                res[key] = this.item[key]
            }else{
                if(!this.schema[key]?.optional || this.schema[key]?.optional == false) error[key] = `la proprieté ${key} est obligatoire`
            }
        }
        return Object.keys(error).length > 0 ? {error, oldVal: this.item} : res;
    }



}