const fs = require('fs');
const solanaWeb3 = require('@solana/web3.js');
const WalletManager = require('./walletManager');

const wallets = JSON.parse(fs.readFileSync('wallets.json', 'utf8'));
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
const walletManager = new WalletManager(wallets, connection);

async function main() {
    const args = process.argv.slice(2);  // Komut satırı argümanlarını al
    switch (args[0]) {
        case 'new':
            const newWalletName = args[1]; // Kullanıcıdan cüzdan adını al
            if (!newWalletName) {
                console.log('Lütfen bir cüzdan adı belirtin.');
                break;
            }
            if (wallets[newWalletName]) {
                console.log('Bu isimde bir cüzdan zaten var.');
                break;
            }
            const newWallet = await walletManager.createWallet(newWalletName);
            console.log(`${newWalletName} adlı yeni cüzdan oluşturuldu:`, newWallet);
            break;
        case 'balance':
            // Balance kontrolü için cüzdan adı gerekli
            const balanceWalletName = args[1];
            if (!wallets[balanceWalletName]) {
                console.log('Belirtilen cüzdan bulunamadı.');
                break;
            }
            const balance = await walletManager.checkBalance(balanceWalletName);
            console.log('Cüzdan bakiyesi:', balance, 'SOL');
            break;
        case 'transfer':
            const transferWalletName = args[1];
            const receiverPublicKey = args[2];
            const transferAmount = parseFloat(args[3]);
            if (!wallets[transferWalletName]) {
                console.log('Belirtilen cüzdan bulunamadı.');
                break;
            }
            const signature = await walletManager.transfer(transferWalletName, receiverPublicKey, transferAmount);
            console.log('Transfer işlemi tamamlandı. İşlem imzası:', signature);
            break;
        case 'stats':
            try {
                const stats = await walletManager.getNetworkStats();
                console.log('Ağ İstatistikleri:', stats);
            } catch (error) {
                console.error('Ağ istatistiklerini alırken bir hata oluştu:', error);
            }
            break;
        case 'switch':
            const switchWalletName = args[1];
            if (wallets[switchWalletName]) {
                walletManager.switchWallet(switchWalletName);
                console.log(`Cüzdana geçiş yapıldı: ${switchWalletName}`);
                // Burada seçili cüzdanla işlemleri yapabilirsiniz.
            } else {
                console.log('Belirtilen cüzdan bulunamadı.');
            }
            break;
        case 'list':
            console.log('Kayıtlı cüzdanlar:', walletManager.listWallets());
            break;
        case 'airdrop':
            const airdropWalletName = args[1];
            const airdropAmount = args[2] ? parseFloat(args[2]) : 1;  // Eğer miktar belirtilmemişse varsayılan olarak 1 SOL
            if (!wallets[airdropWalletName]) {
                console.log('Belirtilen cüzdan bulunamadı.');
                break;
            }
            try {
                await walletManager.airdrop(airdropWalletName, airdropAmount);
                console.log(`${airdropAmount} SOL airdrop ${airdropWalletName} adlı cüzdana yapıldı.`);
            } catch (error) {
                console.error('Airdrop işleminde hata oluştu:', error);
            }
            break;
        default:
            console.log('Geçersiz komut.');
    }
}

main();
