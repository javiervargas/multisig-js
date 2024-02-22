// multisig.js
const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);
const b58 = require('bs58check');

function anypubToXpub(xpub) {
  let data = b58.decode(xpub);
  data = data.slice(4);
  data = Buffer.concat([Buffer.from('0488b21e', 'hex'), data]);
  return b58.encode(data);
}

function getMultisigAddress(xpubs, m = 2, network = bitcoin.networks.testnet) {
  if (xpubs.length !== 3) {
    throw new Error('Public keys for 2-of-3 multisig.');
  }

  const publicKeys = xpubs.map((xpub) => {
    const xpubData = anypubToXpub(xpub);
    return bip32.fromBase58(xpubData).publicKey;
  });

  const p2ms = bitcoin.payments.p2ms({
    m: m,
    pubkeys: publicKeys,
    network: network,
  });
  const multisigScript = p2ms.output; 
  const multisigAddress = bitcoin.payments.p2sh({ redeem: { output: multisigScript }, network }).address;
  return multisigAddress;
}

function getMultisigAddressPub(network = bitcoin.networks.testnet) {
    const pubkeys = [
      '0239c50fb6e1f9ce31af822921bfd64317d3c74727fc38830346c3afd86321a7df',
      '02919bfe3980d01a05459731a17c8c8c3f844c58b53f0a33ad20d6d81b6ab41849',
      '02baf8deb4762cd03296cbc958edaa708d33fa50054241b62d49806e5ee8ff50ec',
    ].map(hex => Buffer.from(hex, 'hex'));
    const { address, redeem } = bitcoin.payments.p2sh({
	    redeem: bitcoin.payments.p2ms({ m: 2, pubkeys, network:  network }),
    });
	return {
    		address,
   		redeem,
        };
//	return address;
}

module.exports = {
  getMultisigAddress,
  getMultisigAddressPub,
};
