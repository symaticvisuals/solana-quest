const {
	Connection,
	PublicKey,
	clusterApiUrl,
	Keypair,
	LAMPORTS_PER_SOL,
	Transaction,
	Account,
} = require("@solana/web3.js");

//keypair allow use to create new wallet
const newPair = new Keypair();

//crypto wallet has two components public key and secret key
//public key is to uniquely identify the wallet
//secret key is to allow the wallet to sign transactions

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

const getWalletBalance = async () => {
	try {
		//Creates a connection object that’ll be used to get the balance.
		//Devnet is the replica of the Solana’s mainnet, and serves as a playground for anyone who wants to try out the features of Solana. clusterApiUrl provides us the URL for devnet that we’ll be passing to create our connection object so that we get details of devnet.
		const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
		const myWallet = await Keypair.fromSecretKey(secretKey);
		const walletBalance = await connection.getBalance(
			new PublicKey(myWallet.publicKey)
		);
		console.log(`=> For wallet address ${publicKey}`);
		console.log(
			`   Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`
		);
	} catch (err) {
		console.log(err);
	}
};
const airDropSol = async () => {
	try {
		const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
		const walletKeyPair = await Keypair.fromSecretKey(secretKey);
		console.log(`-- Airdropping 2 SOL --`);
		const fromAirDropSignature = await connection.requestAirdrop(
			new PublicKey(walletKeyPair.publicKey),
			2 * LAMPORTS_PER_SOL
		);
		await connection.confirmTransaction(fromAirDropSignature);
	} catch (err) {
		console.log(err);
	}
};
const driverFunction = async () => {
	await getWalletBalance();
	await airDropSol();
	await getWalletBalance();
};
driverFunction();
