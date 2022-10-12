---
title: CKB Transaction Metadata Standard
label: ctmeta
sidebar_position: 5
---

# CKB Transaction Metadata Standard

## 需求描述

为交易本身附带额外的 metadata（简称 CTMeta），用以在减少 ckb 状态占用的前提下，增加元信息描述。典型的应用场景包括：转账附言、代币静态信息描述、NFT 静态信息描述等

## 标准规范

在交易的 group_witnesses[0].output_type 作为 CTMeta 的容器

- **如何确保这些数据不会被传播节点、矿工篡改？（witness 不是共识性数据，是否被包含在签名中，取决于 lock 的设计）**

内容如下

```json
{
	"id": "CTMeta",              // 用来识别消息格式与内容
    "ver": "1.0",
	"metadata":                  // 具体的 metadata 内容
	[
		{
			"target": "output#0",    // 用来描述本数据是针对哪个utxo的，可选标签 input, output, omni
			"type": "nft-renderer",  // 用来描述用途，由应用自定义
            "data": {
                    <payload_data>         // 对应的详细信息，参考 "NFT Metadata Standard"
                }
            },
		{
			"target": "output#0",
			"type": "postscript",
			"data": "I love you."
		},
		...
	]
}

```
| type | description | outpoint (UTXO) | standard followed |
|--|--|--|--|
|cota.nft.define | CoTA NFT description | NFT Create | [CoTA NFT Metadata Schema](./CTMeta-schemas/nft-schema) |
|cota.ft.define | CoTA FT description | FT create | [CoTA Fungible Token Metadata Schema](./CTMeta-schemas/ft-schema) |
|nft-distribution | 针对不同的 NFT 个体进行不同的设定 | 创建 mNFT Cell / 批量创建 cNFT 分发 | 待定 |
| postscript | 通用转账附言，可以是 CKB、sudt、NFT	收款方 UTXO | UTF-8 编码字符串 |
| sudt-info | sudt 的扩展信息 | 发行方 mint sudt cell | 待定 |
| issuer | issuer static information, 发行人个人信息 | | 
| cota | cota 协议的 NFT class metadata 描述 | |
