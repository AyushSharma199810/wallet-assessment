# Eth Wallet Utilities

Generate a new bip39 mnemonic and wallet, or display data for a given Mnemonic and HD Wallet path index

## Install Dependencies

```bash
nvm use
yarn install
```

## Quick build for linux

```bash
yarn run build
```

will compile a Linux binary and output to `dist/wallet-utils`

## Compile Distributions

Can be compiled for Linux, Windows and OSX using the `make` target:

```bash
make exe
```

This will generate `.tar.gz` archives containing the executable for each target OS.

## Run

Either via Node JS for development and debugging:

```bash
node index.js -h
```

Or via compiled binary after running `yarn run build`:

```bash
./dist/wallet-utils -h
```

```bash
Generate a new bip39 mnemonic and wallet, or get details for an existing mnemonic

Usage:
------

  ./wallet-utils [opts]
  
Options:
--------

  -h, --help             : display this help message
  -s NUM, --strength NUM : mnemonic strength. Default 128 (12 words). 256 = 24 words.
  -g, --get              : get private key and wallet details for specified mnemonic and HD wallet path.
                           This will prompt for the mnemonic, and the array index of the desired HD wallet path

Examples:
---------

  Generate a 12 word mnemonic wallet:
    ./wallet-utils
  
  Generate a 24 word mnemonic wallet:
    ./wallet-utils -s 256
    ./wallet-utils --strength 256
  
  Get wallet details for given mnemonic at index 1:
    ./wallet-utils -g
    ./wallet-utils --get
      Mnemonic      : ***************
      HD Wallet Idx : 1
```
