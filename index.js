import { ethers } from 'ethers';

const INFURA_ID='';
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`);

const account1 = ''; // sender
const account2 = ''; // recipient

const privateKey1 = ''; // sender private key
const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {
    // show account1 balance before transaction
    await provider.getBalance(account1).then(balance => {
        console.log('Account 1 balance before transaction:', ethers.formatEther(balance));
    });
    // show account2 balance before transaction
    await provider.getBalance(account2).then(balance => {
        console.log('Account 2 balance before transaction:', ethers.formatEther(balance));
    });
    
    // send ether
    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.parseEther('0.02')
    });

    // wait transaction to be mined
    await tx.wait();
    console.log(tx);
    
    // show account1 balance after transaction
    await provider.getBalance(account1).then(balance => {
        console.log('Account 1 balance after transaction:', ethers.formatEther(balance));
    });
    // show account2 balance after transaction
    await provider.getBalance(account2).then(balance => {
        console.log('Account 2 balance after transaction:', ethers.formatEther(balance));
    });
}

main();