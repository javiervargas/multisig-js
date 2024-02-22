import * as bitcoin from 'bitcoinjs-lib';
import { networks, payments, Psbt } from 'bitcoinjs-lib';
import axios from 'axios';

async function spend() {

    const walletA = {
        "address": "tb1qppxqep8cq3fegy32jamzawfpq043vmpx5wnygn",
        "privateKey": "cUodCQzrUWe3jUtSB4WHvv6z4NokfGz2zn5SRS4p48gc7vqoY3BT",
        "publicKey": "0239c50fb6e1f9ce31af822921bfd64317d3c74727fc38830346c3afd86321a7df"
    }

    const walletB = {
        "address": "tb1qnguzmvcu6chc5uwjm0h89sntcg4x9g94pequr7",
        "publicKey": "02919bfe3980d01a05459731a17c8c8c3f844c58b53f0a33ad20d6d81b6ab41849",
        "privateKey": "cMhxbwZyjWUcfA2f6gCfD6zDL4H1n5m5LGJeQmsqor2LoU8QH3sS"
    }

    const txb = new Psbt({ network: networks.testnet })
    const hash = 'b76e4cfe5253568dcf68470598b5e270f3e4827119350a0858e0370e4b255238';
    const rawTx = '020000000001016a6a82595d1a28b457957fc43aa046f64c599524ed417326615a699a02c3fcce0000000000fdffffff02d71b01000000000017a91443c137341779e1ce6a296974e14a1cc74949355987fe86c95a0000000017a914db78c180095cae526e354c8be09e2c85f90792968702473044022068d24cd2fc04efbbf970c987f5916043c85e9d6a5ba08900b606d507a5f98bd5022075c62e78da3490df4abe65130a9b15fee49ca713f15c18264722a1d2a0f12fcc012103e98e7bf334e5909bc5b5c7ec7e3149e1e0f5e5389e5951c7d298224f1439be697b552700'
    const index = 0;

    const nonWitnessUtxo = Buffer.from(rawTx, 'hex');
    const redeemScriptHex = '52210239c50fb6e1f9ce31af822921bfd64317d3c74727fc38830346c3afd86321a7df2102919bfe3980d01a05459731a17c8c8c3f844c58b53f0a33ad20d6d81b6ab418492102baf8deb4762cd03296cbc958edaa708d33fa50054241b62d49806e5ee8ff50ec53ae';
    const redeemScript = Buffer.from(redeemScriptHex, 'hex');
    const p2sh = createPayment('p2sh-p2ms(2 of 2)', eccArray, networks.testnet)
    const inputData = await getInputData(p2sh.payment, 'p2sh-p2wpkh')
    const inputData1 = {
                    hash,
                    index,
                    nonWitnessUtxo,
                    redeemScript, 
                  };

    console.log(inputData1);

    const psbt = new bitcoin.Psbt({ network: networks.testnet })
      .addInput(inputData1)
      .addOutput({
        address: 'tb1qsa0dw9csvptvep502r8skgkurshqj0eggfnvlv',
        value: 1e4,
      })
      .signInput(0, p2sh.keys[0])
      .signInput(0, p2sh.keys[1]);
    console.log(psbt);


    try {
        psbt.finalizeAllInputs();
        const rawHex = psbt.extractTransaction().toHex();
        console.log("Raw Hex" ,  rawHex);

    } catch (error) {
        console.error(error);
    }
}

function createPayment (_type, myKeys, network) {
  network = network || regtest
  const splitType = _type.split('-').reverse()
  const isMultisig = splitType[0].slice(0, 4) === 'p2ms'
  const keys = myKeys || []
  let m
  if (isMultisig) {
    const match = splitType[0].match(/^p2ms\((\d+) of (\d+)\)$/)
    m = parseInt(match[1])
    let n = parseInt(match[2])
    if (keys.length > 0 && keys.length !== n) {
      throw new Error('Need n keys for multisig')
    }
    // eslint-disable-next-line no-unmodified-loop-condition
    while (!myKeys && n > 1) {
      keys.push(bitcoin.ECPair.makeRandom({ network }))
      n--
    }
  }
  if (!myKeys) keys.push(bitcoin.ECPair.makeRandom({ network }))
  let payment
  splitType.forEach(type => {
    if (type.slice(0, 4) === 'p2ms') {
      payment = bitcoin.payments.p2ms({
        m,
        pubkeys: keys.map(key => key.publicKey).sort(),
        network
      })
    } else if (['p2sh', 'p2wsh'].indexOf(type) > -1) {
      payment = bitcoin.payments[type]({
        redeem: payment,
        network
      })
    } else {
      payment = bitcoin.payments[type]({
        pubkey: keys[0].publicKey,
        network
      })
    }
  })
  return {
    payment,
    keys
  }
}


async function getInputData (payment, redeemType) {
  const amount = 1000
  const hash = 'b76e4cfe5253568dcf68470598b5e270f3e4827119350a0858e0370e4b255238'
  const index = 0
  const script = Buffer.from(
    'a91443c137341779e1ce6a296974e14a1cc74949355987', 'hex'
  )
  const witnessUtxo = {
    script: script,
    value: amount }
  const mixin = { witnessUtxo }
  const mixin2 = {}
  switch (redeemType) {
    case 'p2sh':
      mixin2.redeemScript = payment.redeem.output;
      break;
    case 'p2sh-p2wsh':
      mixin2.witnessScript = payment.redeem.redeem.output
      mixin2.redeemScript = payment.redeem.output
      break
  }
  return {
    hash: hash,
    index: index,
    ...mixin,
    ...mixin2
  }
}


spend();
