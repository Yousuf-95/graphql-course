const Dataloader = require('dataloader');
const users = require('../../models/user');

const batchUsers = async (ids) => {
    try {
        const promiseArray = [];
        for (let i = 0; i < ids.length; i++) {
            let user = await users.findOne({ "_id": ids[i] });
            promiseArray.push(user);
        }
        return promiseArray;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = new Dataloader(batchUsers);;