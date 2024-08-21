# Set the correct pkg TARGET for each binary we build
# when building for linux-amd64, set the pkg target to node18-linuxstatic-x64
dist/linux-amd64/wallet-utils: TARGET := node16-linuxstatic-x64
# output binary file ^      ^ variable ^ pkg target
dist/darwin-amd64/wallet-utils: TARGET := node16-macos-x64
dist/windows-amd64/wallet-utils.exe: TARGET := node16-win-x64

# Wildcard rule to build any of binary outputs
# "To build any bin file, ensure node_modules are up to date..."
dist/%: node_modules
	yarn run pkg . --target ${TARGET} --output $@
	tar -cpzf "$(shell pwd)/$(shell echo $@ | sed 's/\/wallet-utils/_wallet-utils/' | sed 's/.exe//').tar.gz" -C "$(shell echo $@ | sed 's/\/wallet-utils//' | sed 's/.exe//')" .
	rm -rf "$(shell echo $@ | sed 's/\/wallet-utils//' | sed 's/.exe//')"

exe: dist/linux-amd64/wallet-utils
exe: dist/darwin-amd64/wallet-utils
exe: dist/windows-amd64/wallet-utils.exe

.PHONY: exe
