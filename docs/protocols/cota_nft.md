---
title: CoTA NFT Protocol Extension
label: cotanft
sidebar_position: 2
---

There are four predefined `smt_type` enum for NFT operations. 

| type name | 1st byte | 2nd byte | description |
|--|--|--|--|
| cota-NFT-define | 0x81 (NFT) | 0x00 | NFT issuance definition |
| cota-NFT-hold | 0x81 (NFT) | 0x01 | current hold NFT |
| cota-NFT-withdrawal | 0x81 (NFT) | 0x02 | NFT withdrawal record |
| cota-NFT-claim | 0x81 (NFT) | 0x03 | NFT claim record |

Here are the detailed k-v definitions.

```yaml
# cota-NFT-define data structure
key:
	smt_type:  uint16         # type bytes for cota-NFT-define big endian
    token_id:   Byte[20]       # hash(inputs[0].out_point + first_output_index)[0..20]
	reserved:  Byte[10]    
value:
	total:     uint32         # 0 for unlimited
	issued:    uint32
    configure: Byte[1]
    reserved:  Byte[23]

# cota-NFT-hold data structure
key:
	smt_type:  uint16         # type byte for cota-NFT-hold
    token_id:   Byte[20]
	index_id:  uint32
    reserved:  Byte[6]      
value:
    configure: Byte[1]
	state:     Byte[1]
	characteristic: Byte[20]  # user-defined data
    reserved:  Byte[10]

# cota-NFT-withdraw data structure
key:  
	smt_type:  uint16         # type byte for cota-NFT-withdraw
    token_id:   Byte[20]
	index_id:  uint32
	reserved:  Byte[6]
value:
blake2b_hash of {
    configure: Byte[1]
    state:     Byte[1]
    characteristic: Byte[20]      # user-defined data
    to_lock:   lock_script
    out_point: OutPoint[12..36]   # Outpoint of previous input cell with SMT
}

# cota-NFT-claim data structure
key: 
blake2b_hash of {
    smt_type:  uint16             # type byte for cota-NFT-claim
	token_id:   Byte[20]
	index_id:  uint32    
	out_point: OutPoint[12..36]   # Outpoint field recorded in the proof
|
value:
	0x00...00 for nonclaimed
	0xFF...FF for claimed
```

