const db = require('../data/dbConfig');
const {add, find} = require('./usersModel')
const UsersModel = require('./usersModel')
// // test('run the tests', () => {
//     expect(true).toBeTruthy();
//   });
  
  describe('users model', ()=> {
    describe('insert()', ()=> {
    beforeEach(async ()=> {
        await db('users').truncate()
    })
    it('should insert 2 items', async ()=>{
        await UsersModel.add({user: 'Mimi' });
        await UsersModel.add({user:'Alex' });

        const User = await db('users');
        expect(User).toHaveLength(2)

    })
})
})