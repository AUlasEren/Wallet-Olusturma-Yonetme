const fs = require('fs');
const solanaWeb3 = require('@solana/web3.js');

class WalletManager {
    constructor() {
        this.connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
        this.wallets = this.loadWallets();
    }

    loadWallets() {
        try {
            const data = fs.readFileSync('wallets.json', 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('wallets.json dosyası okunurken bir hata oluştu:', error);
            return {};
        }
    }

    saveWallets() {
        try {
            fs.writeFileSync('wallets.json', JSON.stringify(this.wallets, null, 2));
        } catch (error) {
            console.error('wallets.json dosyası yazılırken bir hata oluştu:', error);
        }
    }

    createWallet(walletName) {
        if (this.wallets[walletName]) {
            console.error('Bu isimde bir cüzdan zaten var.');
            return;
        }

        const newPair = solanaWeb3.Keypair.generate();
        const wallet = {
            publicKey: newPair.publicKey.toString(),
            secretKey: Array.from(newPair.secretKey),
            balance: 0
        };

        this.wallets[walletName] = wallet;
        this.saveWallets();
        console.log(`${walletName} adlı yeni cüzdan oluşturuldu:`, wallet);
    }

    async airdrop(walletName, amount) {
        if (!this.wallets[walletName]) {
            console.error('Belirtilen cüzdan bulunamadı.');
            return;
        }

        try {
            const publicKey = this.wallets[walletName].publicKey;
            const airdropSignature = await this.connection.requestAirdrop(
                new solanaWeb3.PublicKey(publicKey),
                amount * solanaWeb3.LAMPORTS_PER_SOL
            );
            await this.connection.confirmTransaction(airdropSignature);
            console.log(`${amount} SOL airdrop ${walletName} adlı cüzdana yapıldı.`);
            
            // Airdrop sonrası bakiyeyi güncelle
            const newBalance = await this.checkBalance(walletName);
            this.wallets[walletName].balance = newBalance;
            this.saveWallets();
        } catch (error) {
            console.error('Airdrop işleminde hata oluştu:', error);
        }
    }

    async checkBalance(walletName) {
        if (!this.wallets[walletName]) {
            console.error('Belirtilen cüzdan bulunamadı.');
            return;
        }

        const publicKey = this.wallets[walletName].publicKey;
        const balance = await this.connection.getBalance(new solanaWeb3.PublicKey(publicKey));
        console.log(`${walletName} cüzdanın bakiyesi: ${balance / solanaWeb3.LAMPORTS_PER_SOL} SOL`);
        return balance / solanaWeb3.LAMPORTS_PER_SOL;
    }

    async transfer(senderWalletName, receiverPublicKey, amount) {
        if (!this.wallets[senderWalletName]) {
            console.error('Gönderici cüzdan bulunamadı.');
            return;
        }

        const senderWalletData = this.wallets[senderWalletName];
        const senderKeypair = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(senderWalletData.secretKey));
        try {
            const transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: senderKeypair.publicKey,
                    toPubkey: new solanaWeb3.PublicKey(receiverPublicKey),
                    lamports: amount * solanaWeb3.LAMPORTS_PER_SOL
                })
            );
            const signature = await solanaWeb3.sendAndConfirmTransaction(
                this.connection,
                transaction,
                [senderKeypair]
            );
            console.log('Transfer işlemi tamamlandı. İşlem imzası:', signature);
        } catch (error) {
            console.error('Transfer işleminde hata oluştu:', error);
        }
    }

    async getNetworkStats() {
        try {
            const blockHeight = await this.connection.getBlockHeight();
            const transactionCount = await this.connection.getTransactionCount();
            console.log('Ağ İstatistikleri:', {
                blockHeight,
                transactionCount
            });
        } catch (error) {
            console.error('Ağ istatistiklerini alırken bir hata oluştu:', error);
        }
    }

    listWallets() {
        console.log('Kayıtlı cüzdanlar:');
        Object.keys(this.wallets).forEach(walletName => {
            console.log(`- ${walletName}`);
        });
    }
}

module.exports = WalletManager;
