const fs = require('fs');
const { createWallet, airdrop, checkBalance, transfer } = require('./wallet');
const solanaWeb3 = require('@solana/web3.js');

const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

async function main() {
    const args = process.argv.slice(2);  // Komut satırı argümanlarını al
    switch (args[0]) {
        case 'new':
            const wallet = await createWallet();
            console.log('Yeni cüzdan oluşturuldu:', wallet);
            break;
            case 'airdrop':
                try {
                    const airdropAmount = args[1] ? parseFloat(args[1]) : 1;
                    const walletData = JSON.parse(fs.readFileSync('wallet.json'));
                    await airdrop(connection, walletData.publicKey, airdropAmount);
                    console.log(`${airdropAmount} SOL airdrop yapıldı.`);
                    // Airdrop sonrası bakiyeyi güncelle
                    const newBalance = await checkBalance(connection, walletData.publicKey);
                    walletData.balance = newBalance;
                    fs.writeFileSync('wallet.json', JSON.stringify(walletData, null, 2));
                } catch (error) {
                    console.error('Airdrop işleminde hata oluştu:', error);
                }
                break;
        case 'balance':
            const walletDataForBalance = JSON.parse(fs.readFileSync('wallet.json'));
            const balance = await checkBalance(connection, walletDataForBalance.publicKey);
            console.log('Cüzdan bakiyesi:', balance, 'SOL');
            break;
        case 'transfer':
            const receiverPublicKey = args[1];
            const transferAmount = parseFloat(args[2]);
            const senderWalletData = JSON.parse(fs.readFileSync('wallet.json'));
            const senderKeypair = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(senderWalletData.secretKey));
            const signature = await transfer(connection, senderKeypair, receiverPublicKey, transferAmount);
            console.log('Transfer işlemi tamamlandı. İşlem imzası:', signature);
            break;
        default:
            console.log('Geçersiz komut.');
    }
}

main();

