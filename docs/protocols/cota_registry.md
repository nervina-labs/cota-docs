---
title: Global Registry Overview
label: cotaregistry
sidebar_position: 1
---

The primary purpose of the CoTA global registry is to make every address mapping only one CoTA cell to avoid the double-claim problem. 

The kernel data encoded in the global registry cell is an SMT root for registered addresses, and every address can register once and only once. We also introduce an auto-incremental ID (CoTA Cell ID, aka. CCID) to identify the recorded cells.

To keep the update to the registry cell decentralized enough, its lock script must open to everyone. So we set its lockscript `always_success`. Also, you can never create a CoTA cell without registering it to the global registry.

```yaml
# global_cota_registry_cell data structure
data:
    version: byte
    registry_smt_root: bytes32
	account_num: uint64
type:
    code_hash: registry_type
    args: type_id
lock:
    <always_success>
```

![CoTA registry](../images/cota_registry.svg)