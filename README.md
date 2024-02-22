# multisig-js

This is an example program that shows how to spend money from a bitcoin multisig address 2 of 3.   It uses [bitcoinjs-lib.](https://github.com/bitcoinjs/bitcoinjs-lib)

<img width="1018" alt="Screenshot 2024-02-22 at 22 46 39" src="https://github.com/javiervargas/multisig-js/assets/7927115/b01d9558-49a3-4158-b41c-cae8ee6f531b">

# Installation

```
npm install bitcoinjs-lib

```

# Run

Add 3 extended public keys and generate address like [2MtyQM6F4hd1ALPb36nbjmtWaLHYkHB9Mi3](https://mempool.space/testnet/address/2MyRUizdoLyNKBtc7hCh9rHv5wG1zZrt2wu). Later send some [coins.](https://mempool.space/testnet/tx/b76e4cfe5253568dcf68470598b5e270f3e4827119350a0858e0370e4b255238)

```
node multisigCheck.js 
[
  'tpubDC2QJtarETt4NkxuTuGc6mvtBKgpnwJwPt8paKvQZKWiUESbHyMzgZyLfjzdnENJWNidnqcCmXhKUfShJ7xz1tgLP7jZpkoXpr7SGaTcEt3',
  'tpubDDBcw3L7nQqECE9rqVNNG7uEGttoJqZWYKufwzeUFF4qiYkdsCjMh4apuVrMXLU4FPRduJY7CsByRVoNtFeG32ozWuPNB2mgGrvbhb8WLwT',
  'tpubDCX6KddsMhFLwWyEvvwSAAYH4KpQnZ8kXw9UweqDbQacVcWzXhEvB7XwdSoUpRWiVMGciGaQoMk3qn61e2eCDzmHqCzVkJX9ezv4Vc5BYqD'
]
Xpub conversion:  xpub6BemnemAXBvc6xn41iHWtrbWrCbAoYosrFYXDmsGDQkpiwmtDkWuY8JWRhurFjR4iUBjBG6LERsGnUx5uG7k8TE3KWzG9E9JEtX2WYFUyex
Xpub conversion:  xpub6CozQoWS58smvRy1PJPH4CZrwmo9KT4SzhKNbSbKuLJwyG5vnytGYcuzfTmZzqWpTUtjHj2EfmMvjKJmVPo29bMhTJe4VW7SguLBwaeL1e4
Xpub conversion:  xpub6C9ToPpBeRHtfinPUjxLxFCujCikoAdgzJZBb6n5FVpikKrHTUPq2fs7PQihHvZUhSji6h4YGFv19bbQFAnxLZJzmcFC4mrv53KejYHogui
P2MS script: 522103ec21e586979d7ea14c3ecfd89f2ca5aedd4c99c8a8acff32e4d85e15742c541421023bc7de57c273c53d29962d8f0c47bf88993b784ba2dd327f949c3ffbae192d0c21022b1c11055d800633f9a68b36771501ecf581c29a19bc009bd6948c298150fdd053ae
Public keys: [
  <Buffer 03 ec 21 e5 86 97 9d 7e a1 4c 3e cf d8 9f 2c a5 ae dd 4c 99 c8 a8 ac ff 32 e4 d8 5e 15 74 2c 54 14>,
  <Buffer 02 3b c7 de 57 c2 73 c5 3d 29 96 2d 8f 0c 47 bf 88 99 3b 78 4b a2 dd 32 7f 94 9c 3f fb ae 19 2d 0c>,
  <Buffer 02 2b 1c 11 05 5d 80 06 33 f9 a6 8b 36 77 15 01 ec f5 81 c2 9a 19 bc 00 9b d6 94 8c 29 81 50 fd d0>
]
P2MS script: 522103ec21e586979d7ea14c3ecfd89f2ca5aedd4c99c8a8acff32e4d85e15742c541421023bc7de57c273c53d29962d8f0c47bf88993b784ba2dd327f949c3ffbae192d0c21022b1c11055d800633f9a68b36771501ecf581c29a19bc009bd6948c298150fdd053ae
Address: 2MtyQM6F4hd1ALPb36nbjmtWaLHYkHB9Mi3
```

# Spending

To spend it is necessary to provide some information, it is required to provide two keys and redeemScript and other information.

<img width="1219" alt="Screenshot 2024-02-22 at 22 00 39" src="https://github.com/javiervargas/multisig-js/assets/7927115/fa122123-4cf6-4e56-8dde-3a1823a3883a">

```
node multisig.js
=>: [
  {
    txid: 'a7caf82bc502d33bbcd256e60b450e9f9a61faf9b9858315e5c8eda9b4ff0452',
    vout: 0,
    scriptPubKey: 'a91443c137341779e1ce6a296974e14a1cc74949355987',
    amount: 87943
  }
]
{
  hash: 'b76e4cfe5253568dcf68470598b5e270f3e4827119350a0858e0370e4b255238',
  index: 0,
  nonWitnessUtxo: <Buffer 02 00 00 00 00 01 01 6a 6a 82 59 5d 1a 28 b4 57 95 7f c4 3a a0 46 f6 4c 59 95 24 ed 41 73 26 61 5a 69 9a 02 c3 fc ce 00 00 00 00 00 fd ff ff ff 02 d7 ... 174 more bytes>,
  redeemScript: <Buffer 52 21 02 39 c5 0f b6 e1 f9 ce 31 af 82 29 21 bf d6 43 17 d3 c7 47 27 fc 38 83 03 46 c3 af d8 63 21 a7 df 21 02 91 9b fe 39 80 d0 1a 05 45 97 31 a1 7c ... 55 more bytes>
}
Psbt {
  data: Psbt {
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    globalMap: { unsignedTx: PsbtTransaction {} }
  }
}
Raw Hex 02000000013852254b0e37e058080a35197182e4f370e2b598054768cf8d565352fe4c6eb700000000fdfd000047304402202c39e76a18ab0c7b7ecc2bb0830172ddcd266b1a341404a1242672bb00533c8502201311feab57e542c812b0a75de950fae83f360a78f5d6efeeedef3d086795e73a01483045022100b51aa91ea98b025d11360620e5278e33eb50dafd1a1a0db8e3d21cea3353a17f02205cba812db433daf9ea3e55f5891dce0f10d637f732cd83978ecf650578b19acb014c6952210239c50fb6e1f9ce31af822921bfd64317d3c74727fc38830346c3afd86321a7df2102919bfe3980d01a05459731a17c8c8c3f844c58b53f0a33ad20d6d81b6ab418492102baf8deb4762cd03296cbc958edaa708d33fa50054241b62d49806e5ee8ff50ec53aeffffffff011027000000000000160014875ed717106056cc868f50cf0b22dc1c2e093f2800000000
```

Send this Raw Hex transaction  [Tx](https://mempool.space/testnet/tx/c91ba4f08f2b4654d1e20878e80b6d0d87d81bb58ad27c62b74f8e2afae4b2da) using public API's or bitcoin-cli.

```
bitcoin-cli -testnet sendrawtransaction 02000000013852254b0e37e058080a35197182e4f370e2b598054768cf8d565352fe4c6eb700000000fdfd000047304402202c39e76a18ab0c7b7ecc2bb0830172ddcd266b1a341404a1242672bb00533c8502201311feab57e542c812b0a75de950fae83f360a78f5d6efeeedef3d086795e73a01483045022100b51aa91ea98b025d11360620e5278e33eb50dafd1a1a0db8e3d21cea3353a17f02205cba812db433daf9ea3e55f5891dce0f10d637f732cd83978ecf650578b19acb014c6952210239c50fb6e1f9ce31af822921bfd64317d3c74727fc38830346c3afd86321a7df2102919bfe3980d01a05459731a17c8c8c3f844c58b53f0a33ad20d6d81b6ab418492102baf8deb4762cd03296cbc958edaa708d33fa50054241b62d49806e5ee8ff50ec53aeffffffff011027000000000000160014875ed717106056cc868f50cf0b22dc1c2e093f2800000000
error code: -27
error message:
Transaction already in block chain
```
# Additional information.

A multi-signature [transaction](https://sntgvrg.medium.com/como-crear-una-direcci%C3%B3n-multifirma-de-bitcoin-ae66d1cb53fa) is a type of transaction that sends funds to a multi-sig address requiring the signatures of certain people in the total group in order to spend the funds. Multiple signatures are typically described as “m of n.” This means that the transaction is locked with a group of “n” keys, and that only “m” of them are sufficient and necessary to unlock the transaction.


