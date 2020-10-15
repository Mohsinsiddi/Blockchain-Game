const { assert } = require('chai')
const MemoryToken = artifacts.require('./MemoryToken.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Memory Token', (accounts) => {
  let token
    before(async()=>{
      token = await MemoryToken.deployed()
    })
    describe('Deployment',async ()=>{
      it('Deploys Sucessfully',async ()=>{
          const address = token.address;
          assert.notEqual(address,0x0)
          assert.notEqual(address,'')
          assert.notEqual(address,null)
          assert.notEqual(address,undefined)
      })
      it('has name',async()=>{
        const name=await token.name()
        assert.equal(name,'Memory Token')
      })
      it('has a Symbol',async()=>{
        const symbol = await token.symbol()
        assert.equal(symbol,'MEMORY')
      })
    })
    
    describe('Token Distribution',async()=>{
      let result
      it('Mint Tokens',async()=>{
        //mint tokens
       await token.mint(accounts[0],'MohsinSiddi')
        //make sure total supply incremented
        result=await token.totalSupply();
        assert.equal(result.toString(),'1','Total Supply is correct')
        //balance of user increases
        result=await token.balanceOf(accounts[0])
        assert.equal(result.toString(),'1','Balance also increases and correct')
        //identify owner of token
        result = await token.ownerOf('1')
        assert.equal(result.toString(),accounts[0].toString(),'Owner is identified and correct')

        result = await token.tokenOfOwnerByIndex(accounts[0],0)
        //fetching all tokens and matching it
        let balance = await token.balanceOf(accounts[0])
        let tokenIds = []
        for(let i=0;i<balance;i++){
          let id = await token.tokenOfOwnerByIndex(accounts[0],i)
          tokenIds.push(id.toString())
        }
        let expected = ['1']
        assert.equal(tokenIds.toString(),expected.toString(),'Token Ids are correct')
         //Token URI 
        let tokenURI = await token.tokenURI('1')
        assert.equal(tokenURI,'MohsinSiddi')
      })
    })
})
