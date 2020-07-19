const { assert } = require('chai')

const CharityHandler = artifacts.require('CharityHandler')
const Charity = artifacts.require('Charity')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Charity+ Charity Handler', (accounts) => {
    let ch, c, fnCallCharity
    before(async () => {
        ch = await CharityHandler.new()
        c = await Charity.new('World Health Organization', accounts[1],{from:accounts[1]})
    })
    describe('CharityHandler Deployed', async () => {
        it('Returns contract name', async () => {
            const chname = await ch.name()
            assert.equal(chname, 'Charity Handler')
        })
        it('createCharity called with name and owner', async () => {
            const _createCharity = await ch.createCharity('UNESCO', { from: accounts[2] })
            const _allCharities = await ch.getAllCharityAddress()
            fnCallCharity = await Charity.at(_allCharities[0])
            let b = await fnCallCharity.name()
            let c = await fnCallCharity.charityOwner()
            assert.equal(b, 'UNESCO')
            assert.equal(c, accounts[2])
            //FINAL
        })
    })
    describe('Charity Deployed', async() => {

    })
    // describe('createCharity called', async () => {
    //     it('Charity is created', async () => {
    //         const cname = await c.name()
    //         const _charityAddress = await c.charityAddress().call()
    //         assert.equal(cname, 'World Health Organization')
    //         assert.equal(_charityAddress,accounts[1])
    //     })
    // })
})

// contract('Charity', (accounts) => {
    
//     describe('Charity Deployed', async () => {
//         it('Contract name is stored', async () => {
//             let charity = await Charity.new("World Health Organization",account[1])
//             const _name = await charity.name()
//             const 
//             assert.equal(_name, 'World Health Organization')
//             assert.equal()
//         })
//         it('Creator address is stored', async () => {
            
//         })
//     })
// })