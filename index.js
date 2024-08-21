const arg = require('arg');
const bip39 = require('bip39');
const { Wallet, ethers } = require('ethers');

const args = arg({
  '--help': Boolean,
  '--strength': Number,
  '--get': Boolean,
  '-h': '--help',
  '-s': '--strength',
  '-g': '--get',
});

// Replace with your Infura or Alchemy API key
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/2MVeLenI74AGVjYwSdtamjyj2CI');


// Function to generate 50 addresses
const generate = async (strength = 128, count = 50) => {
  const mnemonic = bip39.generateMnemonic(strength);
  const addresses = [];

  for (let i = 0; i < count; i++) {
    const wallet = await getWallet(mnemonic, i);
    addresses.push(wallet.address);
  }

  return {
    mnemonic,
    addresses,
  };
};

// Function to create a wallet from a mnemonic and index
const getWallet = async (mnemonic, hdIdx = 0) => {
  const path = `m/44'/60'/0'/0/${hdIdx}`;
  const wallet = Wallet.fromMnemonic(mnemonic, path);

  return {
    mnemonic,
    path,
    private_key: wallet.privateKey,
    public_key: wallet.publicKey,
    public_key_no_0x04_prefix: wallet.publicKey.replace('0x04', '0x'),
    address: wallet.address,
  };
};

const pollBlockForTransactions = async (addresses) => {
  console.log('Started tracking transactions...');

  provider.on('block', async (blockNumber) => {
      const block = await provider.getBlockWithTransactions(blockNumber);
      
      block.transactions.forEach(tx => {
          if (addresses.includes(tx.to) || addresses.includes(tx.from)) {
              console.log(`Transaction detected for tracked address:`);
              console.log(`From: ${tx.from} To: ${tx.to} Value: ${ethers.utils.formatEther(tx.value)} Hash: ${tx.hash}`);
          }
      });
  });
};




// Main function to generate addresses and start tracking
const run = async () => {
  if (args['--help']) {
    return help();
  }

  let strength = 128;
  if (args['--strength'] > 0) {
    strength = args['--strength'];
  }

  const result = await generate(strength);
  console.log(JSON.stringify(result, null, 2));

  return result.addresses;
};

// Run the script and start tracking transactions

run().then((addresses) => {
  if (addresses) {
      pollBlockForTransactions(addresses);
  }
}).catch(console.log);
