---
title: Quick Start
label: Quick Start
sidebar_position: 1
---

# Quick Start

You can use [cota-sdk](https://github.com/nervina-labs/cota-sdk-js) to register, define, mint, claim, withdraw and transfer and examples have been provided in SDK.

cota-sdk depends some services which include [ckb-node](https://docs.nervos.org/docs/basics/guides/testnet/), [ckb-indexer](https://github.com/nervosnetwork/ckb-indexer), [cota-aggregator](https://github.com/nervina-labs/cota-aggregator) and [cota-registry-aggregator](https://github.com/nervina-labs/cota-registry-aggregator).

The public services can be useful to test and debug as following: 

```
# Testnet
https://testnet.ckbapp.dev/rpc                --->  ckb testnet node rpc
https://testnet.ckbapp.dev/indexer            --->  ckb testnet indexer rpc
https://cota.nervina.dev/aggregator           --->  cota aggregator rpc
https://cota.nervina.dev/registry-aggregator  --->  cota registry aggregator rpc
```
## CoTA NFT Flow

```
                        Register CoTA cells firstly
1. Alice & Bob & Tom ----------------------------------> Alice CoTA cell & Bob CoTA cell & Tom CoTA cell


          Define CoTA NFT Collectoin                      Mint CoTA NFT A1 to Bob
2. Alice ---------------------------> NFT Collection A -----------------------------> Bob


                 Claim NFT A1 and then withdraw NFT A1 to Tom
       Action1 |----------------------------------------------> Tom
      | 
      |                    Transfer NFT A1 to Tom
3. Bob Action2 |------------------------------- --------------> Tom
      |
      |          Claim NFT A1 and then update A1 information
       Action3 |----------------------------------------------> Bob owns NFT A1 with new information


                    Claim NFT A1 and then withdraw NFT A1 to Bob
        Action1 |----------------------------------------------------> Bob
       |
4. Tom |         
       |                  Transfer NFT A1 to Bob
        Action2 |----------------------------------------------------> Bob

```

### Register to Create CoTA Cell

You know, everyone must register only one cota cell before starting cota-related operations. You can register cota cell with the **[registry example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/registry.ts)**. When the registry transaction is in the blockchain, your lock hash will be a leaf of the global registry SMT and you will have a cota cell with your own lock script that means just only you can spend the cota cell to complete minting or transferring operations.

```
ckb address <==> lock script ==> lock hash
```

The ckb address, lock script and lock hash all can be as account address for someone who owns the private key and using lock hash as leaf node of the global registry SMT is to reduce complexity.

### To be an Issuer

If you are an issuer who want to mint NFTs to others, you can create issuer information to the blockchain with the **[issuer example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/issuer.ts)**. You can type issuer information with [IssuerInfo](https://github.com/nervina-labs/cota-sdk-js/blob/develop/src/types/service.ts#L14) data type who defines the issuer detail fields. The issuer information will be saved into Witnesses of the ckb transaction in the blockchain to reduce capacity usage and can be read from the blockchain by anyone.

```TypeScript
interface IssuerInfo {
  name: string
  description?: string
  avatar?: string
}
```

### Define an NFT Collection

As an issuer, you can define an NFT collection with the **[define example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/define.ts)** and you can type the NFT collection information with [CotaInfo](https://github.com/nervina-labs/cota-sdk-js/blob/develop/src/types/service.ts#L20) data type who defines the collection detail fields. You will get the unique `cota_id` from the define transaction and all the NFTs of the collection will share the same collection information and the `cota_id`.

```TypeScript
interface CotaInfo {
  name: string
  image: string
  description?: string
  audio?: string
  video?: string
  model?: string
  characteristic?: [string, number][]
  properties?: string
}
```

### Mint NFTs

After defining an NFT collection, you can mint NFTs to others with the **[mint example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/mint.ts)**. All the minted NFTs will share the same collection information and `cota_id`, type are distinguished by different token indexes. And you can also set different values of NFT fields(state and characteristic) to implement different properties for every NFT.

### Claim NFTs

If you have NFTs minted by an issuer, you can claim NFTs with the **[claim example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/claim.ts)**. Claiming means adding the NFTs to your own SMT and you can update the NFTs information or withdraw to others after claiming.

### Update NFTs information

You can update the NFTs information(state and characteristic) with the **[update example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/update.ts)** after claiming.

### Claim and Update NFTs

You can claim NFTs and update the NFTs information(state and characteristic) in one operation with the **[claim-update example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/claim-update.ts)**.

### Withdraw NFTs

You can withdraw NFTs to others with the **[withdraw example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/withdraw.ts)**. Withdrawal means losing the ownership of the NFTs and the receiver can claim the NFTs at any time.

### Transfer NFTs

If you want to withdraw the NFTs to others before claiming, you can implement the operation with **[transfer example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/transfer.ts)**. The transfer melts the claim and withdrawal into one operation to make the transfer more simple.

### Transfer and Update NFTs

You can claim NFTs, update the NFTs information(state and characteristic) and withdraw the NFTs to others in one operation with the **[transfer-update example](https://github.com/nervina-labs/cota-sdk-js/blob/develop/example/transfer-update.ts)**.
