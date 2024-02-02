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
    node index.js new
    ```

- **Airdrop Alma (Varsayılan olarak 1 SOL):**

    ```
    node index.js airdrop
    ```

    Belirli bir miktar airdrop almak için:

    ```
    node index.js airdrop <miktar>
    ```

- **Bakiye Kontrolü:**

    ```
    node index.js balance
    ```

- **Transfer İşlemi (receiverPublicKey ve miktarı belirtin):**

    ```
    node index.js transfer <alıcı_public_key> <miktar>
    ```

## Katkıda Bulunma

Projeye katkıda bulunmak isterseniz, lütfen bir pull request açın veya sorunları bildirin.


