export default class Validator {
    constructor() {}
    validate(schema, item) {
        let res = {}
        let error = {}

        for (const key in schema) {
            if (Object.hasOwnProperty.call(item, key)) {
                if ((!schema[key].optional || schema[key].optional == false || schema[key].required) && (item[key] == '' | null | undefined)) {
                    error[key] = `la proprieté ${key} est obligatoire`
                } else {
                    res[key] = item[key]
                }
            } else {
                if ((!schema[key].optional || schema[key].optional == false || schema[key].required)) error[key] = `la proprieté ${key} est obligatoire`
            }
        }
        return Object.keys(error).length > 0 ? { error, oldVal: item } : res;
    }
}