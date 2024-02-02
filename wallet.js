const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');


// Cüzdan Oluşturma
async function createWallet() {
    const newPair = solanaWeb3.Keypair.generate();
    const wallet = {
        publicKey: newPair.publicKey.toString(),
        secretKey: Array.from(newPair.secretKey),
        balance: 0  // Başlangıç bakiyesi
    };
    fs.writeFileSync('wallet.json', JSON.stringify(wallet, null, 2));
    return wallet;
}

// Airdrop İşlemi
async function airdrop(connection, publicKey, amount) {
    try {
        const airdropSignature = await connection.requestAirdrop(
            new solanaWeb3.PublicKey(publicKey),
            amount * solanaWeb3.LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(airdropSignature);
    } catch (error) {
        console.error('Airdrop işleminde hata oluştu:', error);
        throw error;  // Hata bilgisini üst seviyeye aktar
    }
}

// Bakiye Kontrolü
async function checkBalance(connection, publicKey) {
    const balance = await connection.getBalance(new solanaWeb3.PublicKey(publicKey));
    return balance / solanaWeb3.LAMPORTS_PER_SOL; // SOL cinsinden dönüş yapar
}

// Transfer İşlemi
async function transfer(connection, senderKeypair, receiverPublicKey, amount) {
    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey: new solanaWeb3.PublicKey(receiverPublicKey),
            lamports: amount * solanaWeb3.LAMPORTS_PER_SOL // Lamports'a çevir
        })
    );
    const signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [senderKeypair]
    );
    return signature;
}

module.exports = { createWallet, airdrop, checkBalance, transfer };
