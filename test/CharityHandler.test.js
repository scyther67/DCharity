const { assert } = require('chai')

const CharityHandler = artifacts.require('CharityHandler')
const Charity = artifacts.require('Charity')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Charity+ Charity Handler', (/*accounts*/[accountHandlerDeployer, accountCharityOwner, accountDonationNeedy, accountDonator, accountDonator2]) => {
    let ch, c, fnCallCharity
    before(async () => {
        ch = await CharityHandler.new({from:accountHandlerDeployer})
        c = await Charity.new('World Health Organization', accountCharityOwner,{ from:accountCharityOwner })
    })
    describe('CharityHandler Deployed', async () => {
        it('Returns charity handler name', async () => {
            const chname = await ch.name()
            assert.equal(chname, 'Charity Handler')
        })
        it('createCharity called with name and owner', async () => {
            const _createCharity = await ch.createCharity('UNESCO', { from: accountCharityOwner })
            const _allCharities = await ch.getAllCharityAddress()
            fnCallCharity = await Charity.at(_allCharities[0])
            let _cname = await fnCallCharity.name()
            let _charityOwner = await fnCallCharity.charityOwner()
            assert.equal(_cname, 'UNESCO')
            assert.equal(_charityOwner, accountCharityOwner)
            describe('Other Charity functions', async () => {
                it('Donation Requests empty on init', async () => {
                    let _donationRequests = await c.getAllDonationRequests()
                    assert.equal(_donationRequests[0].length,0)
                    assert.equal(_donationRequests[1].length,0)
                    assert.equal(_donationRequests[2].length,0)
                })
                it('createDonation', async () => {
                    await c.createDonationRequest(web3.utils.toHex('For poor kids in Indiatfffffffff'),
                                                    web3.utils.toWei('1', 'ether'),
                                                    accountDonationNeedy,
                                                    { from: accountCharityOwner })
                    let _donationRequests = await c.getAllDonationRequests()
                    assert.equal(web3.utils.toUtf8(_donationRequests[0][0]) , 'For poor kids in Indiatfffffffff')
                    assert.equal(_donationRequests[1][0].toString(), web3.utils.toWei('1', 'ether'))
                    assert.equal(_donationRequests[2][0].toString(), web3.utils.toWei('1', 'ether'))
                    assert.equal(_donationRequests[3][0], accountDonationNeedy)
                    let _getDonationRequestLength = await c.getDonationRequestLength()
                    assert.equal(_getDonationRequestLength,1)
                })
                it('donateToRequest', async () => {
                    let _donationAmount = await c.donationAmount(accountDonator)
                    _donationAmount = web3.utils.fromWei(_donationAmount)
                    assert.equal(_donationAmount,0)
                    await c.donateToRequest(0, { from: accountDonator, value: web3.utils.toWei('0.5', 'ether') })
                    _donationAmount = await c.donationAmount(accountDonator)
                    _donationAmount = web3.utils.fromWei(_donationAmount)
                    assert.equal(_donationAmount, 0.5)
                    let _getSingleDonationRequest = await c.getSingleDonationRequest(0)
                    assert.equal(web3.utils.toUtf8(_getSingleDonationRequest[0]) , 'For poor kids in Indiatfffffffff')
                    assert.equal(_getSingleDonationRequest[1].toString(), web3.utils.toWei('1', 'ether'))
                    assert.equal(_getSingleDonationRequest[2].toString(), web3.utils.toWei('0.5', 'ether'))
                    assert.equal(_getSingleDonationRequest[3], accountDonationNeedy)
                })
                it('donateToRequest with last call', async () => {
                    let _getCompletedDonationRequestLength = await c.getCompletedDonationRequestLength()
                    assert.equal(_getCompletedDonationRequestLength, 0)
                    await c.donateToRequest(0, { from: accountDonator2, value: web3.utils.toWei('0.5', 'ether') })
                    let _getDonationRequestLength = await c.getDonationRequestLength()
                    assert.equal(_getDonationRequestLength, 0)
                })
                it('push to completed struct successful', async () => {
                    let _getCompletedDonationRequestLength = await c.getCompletedDonationRequestLength()
                    assert.equal(_getCompletedDonationRequestLength, 1)
                    let _getAllCompletedDonationRequests = await c.getAllCompletedDonationRequests()
                    assert.equal(web3.utils.toUtf8(_getAllCompletedDonationRequests[0][0]) , 'For poor kids in Indiatfffffffff')
                    assert.equal(_getAllCompletedDonationRequests[1][0].toString(), web3.utils.toWei('1', 'ether'))
                    assert.equal(_getAllCompletedDonationRequests[2][0].toString(), web3.utils.toWei('0', 'ether'))
                    assert.equal(_getAllCompletedDonationRequests[3][0], accountDonationNeedy)
                })
            })
        })
    })
})