# Solana Wallet Project

Bu proje, Solana blockchain üzerinde basit cüzdan işlemleri gerçekleştirmek için bir Node.js uygulamasıdır. Kullanıcılar yeni cüzdan oluşturabilir, SOL airdrop alabilir, bakiye kontrolü yapabilir ve SOL transfer işlemleri gerçekleştirebilir.

## Özellikler

- **Yeni Cüzdan Oluşturma:** Yeni bir Solana cüzdanı oluşturabilir ve bu cüzdanın bilgilerini yerel bir dosyada saklayabilirsiniz.
- **Airdrop Alma:** Belirtilen cüzdana belirli bir miktar SOL airdrop alabilirsiniz.
- **Bakiye Kontrolü:** Belirtilen cüzdanın bakiyesini kontrol edebilirsiniz.
- **Transfer İşlemi:** Belirli bir miktarda SOL'u bir cüzdandan diğerine transfer edebilirsiniz.

## Kurulum

Projeyi yerel olarak çalıştırmak için aşağıdaki adımları izleyin:

1. Bu depoyu klonlayın:

    ```
    git clone https://github.com/AUlasEren/solana-wallet-project.git
    ```

2. Bağımlılıkları kurun:

    ```
    cd solana-wallet-project
    npm install
    ```

## Kullanım

Projeyi aşağıdaki komutlarla kullanabilirsiniz:

- **Yeni Cüzdan Oluşturma:**

    ```
    node index.js new [CÜZDAN_AD]
    ```

- **Airdrop Alma (Varsayılan olarak 1 SOL):**

    ```
    node index.js airdrop
    ```

    Belirli bir miktar airdrop almak için:

    ```
    node index.js airdrop [CÜZDAN_AD] [AIRDROP_MIKTARI]
    ```

- **Bakiye Kontrolü:**

    ```
    node index.js balance [CÜZDAN_AD]
    ```

- **Transfer İşlemi (receiverPublicKey ve miktarı belirtin):**

    ```
    node index.js transfer <alıcı_public_key> <miktar>
    ```
- **Kayıtlı cüzdanları listelemek için:**
    ```
    node index.js lists

     ```
