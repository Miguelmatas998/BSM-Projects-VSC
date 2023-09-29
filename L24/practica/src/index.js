(async (window) => {

    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed');
    } else {
        return;
    }

    if (window.ethereum.isMetaMask) {
        console.log('MetaMask is active');
    }

    /* window.ethereum.on('connect', () => {
        console.log('connect');
    });

    window.ethereum.on('disconnect', () => {
        console.log('disconnect');
    }); */

    // Listar accounts de un usuario
    const accounts = await window.ethereum.request({
        method: 'eth_accounts'
    });

    console.log('eth_accounts');
    console.log(accounts);

    // Detectar cambios en las accounts de un usuario
    window.ethereum.on('accountsChanged', (accounts) => {
        console.log('accountsChanged');
        console.log(accounts);
    });

    // Recuperar la red de un usuario
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    console.log('eth_chainId');
    console.log(chainId);

    // Detectar la red de un usuario
    window.ethereum.on('chainChanged', (chainId) => {
        console.log('chainChanged');
        console.log(chainId);
    });

    // Proponer cambio de red a Mainnet
    if (chainId != '0x1') {
        window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }]
        });
    }
})(window);