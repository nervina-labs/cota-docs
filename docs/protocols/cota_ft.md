---
title: CoTA Fungible Token Protocol Extension (WIP)
label: cotaft
sidebar_position: 3
---

There are four predefined `smt_type` enum for fungible token operations. 

| type name | 1st byte | 2nd byte | description |
|--|--|--|--|
| cota-FT-define | 0x82 (FT) | 0x00 | FT issuance definition |
| cota-FT-hold | 0x82 (FT) | 0x01 | current hold FT |
| cota-FT-withdrawal | 0x82 (FT) | 0x02 | FT withdrawal record |
| cota-FT-claim | 0x82 (FT) | 0x03 | FT claim record |

Here are the detailed k-v definitions.

```yaml
# cota-FT-define data structure
key:	    
	smt_type:  uint16       # type byte for cota-FT-define
    token_id:  Byte[20]     # same rules as the cota-nft 
    reserved:  Byte[10] 
value:
blake2b_hash of {
	total:     uint128      # 0 for infinity
	issued:    uint128
    decimal:   uint8
}

# cota-FT-hold data structure
key:
	smt_type:  uint16       # type byte for cota-FT-hold
    token_id:  Byte[20]    
	reserved:  Byte[10] 
value:
	amount:   uint128
	reserved: Byte[16]
```

CoTA fungible token standard uses the input's outpoint as the unique withdrawal identifier.

```yaml
# cota-FT-withdraw data structure
key:
	smt_type:  uint16             # type byte for cota-FT-withdraw
    token_id:  Byte[20]
    reserved:  Byte[10] 
value:
blake2b_hash of {
    amount:    uint128
    to_lock:   lock_script
    out_point: OutPoint[12..36]   # outpoint of previous input cell with SMT
}

# cota-FT-claim data structure
key: 
blake2b_hash of {
    smt_type:  uint16             # type byte for cota-FT-claim
    token_id:  Byte[20]
    out_point: OutPoint[12..36]   # copy from the withdrawal record
}
value:
    0x00...00 for nonclaimed
    0xFF...FF for claimed
```

Where `token_id` (also written as `cota_id` in the early designs) is an UUID for all fungible and non-fungible tokens. Its value is set according to the token definition transaction data. 

```
token_id = hash(tx.inputs[0].out_point | tx.outputs.get_first(cota_type).index)[0..20]
```