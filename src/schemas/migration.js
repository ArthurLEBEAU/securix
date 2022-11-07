import DBConnexion from '../db/dbCon.js';
import schemas from './schemas.js';

const textType = ['varchar', 'text', 'longtext']

const db = new DBConnexion();

/**
 *
 *
 * @param {*} attributes
 * @return {string} 
 */
function generateStatments(attributes){
    let statement = '';

    attributes.forEach((attribute) => {statement += (createStateMent(attribute)+ ', ')})

    return statement;
}

function getTimeStamp(){
    return `created_at timestamp NULL DEFAULT NULL, updated_at timestamp NULL DEFAULT NULL `
}

function createStateMent(attribute, updatePrimary = false){
    return `${attribute.name} ${attribute.type.toUpperCase()}${attribute.num !== null ? '('+attribute.num+')' : ''} ${updatePrimary ? 'UNSIGNED' : ''} ${textType.includes(attribute.type) ? 'COLLATE utf8mb4_unicode_ci': ''} ${attribute.unique && attribute.isPrimary == false ? 'UNIQUE' : ''} ${attribute.isNull == false ? "NOT NULL" :  'NULL'} ${attribute.isNull == true && attribute.default !== '' ? 'DEFAULT ' + "'"+ attribute.default +"'" || 'NULL' :  ''}`
}

await db.createConnection();
await db.getConnection();

schemas.forEach((value) => {
    const PostSchema = value;
    const query = ` CREATE TABLE ${PostSchema.info.table} (${generateStatments(PostSchema.attributes)} ${PostSchema.info.timeStamp == true ? getTimeStamp() : ''}) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci `;
    const idquery = `ALTER TABLE ${PostSchema.info.table} MODIFY ${createStateMent(PostSchema.attributes.find((value) => { return value.isPrimary == true}),true)} ${PostSchema.attributes.find((value) => { return value.isPrimary == true}).isIncrement ? 'PRIMARY KEY AUTO_INCREMENT' : ''}`
    
    db.connection.query(query).then((datas)=>{
        db.connection.query(idquery).then((data) => {
            console.log(data)
            db.removeConnection()
        }).catch((error) => {
            console.error(error)
        })
    }).catch((error) => {
        console.error(error)
    });
})
// console.log(idquery);