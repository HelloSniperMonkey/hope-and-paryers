# Ethereum Todo List React

A decentralized todo list application built with React and Ethereum smart contracts. This project demonstrates the integration of blockchain technology with a modern web frontend, allowing users to create, manage, and store their todos on the Ethereum blockchain.

## 🚀 Features

- Connect to MetaMask wallet
- Create and manage todos on the blockchain
- Mark todos as completed
- Persistent storage on Ethereum network
- Real-time updates using Web3
- Responsive React UI

## 🛠 Tech Stack

- React.js
- Ethereum
- Web3.js
- Solidity
- Truffle
- MetaMask

## 📋 Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14.0.0 or later)
- npm 
- MetaMask browser extension
- Ganache (for local blockchain development)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/HelloSniperMonkey/eth-todo-list-react.git
cd eth-todo-list-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the local blockchain with Ganache

4. Deploy the smart contracts:
```bash
truffle migrate --reset
```

5. Start the development server:
```bash
npm start
```

## 🔄 Smart Contract Deployment

The smart contracts are located in the `contracts` directory. To deploy them:

1. Make sure Ganache is running
2. Configure `truffle-config.js` with your network settings
3. compile the truffle contract with `truffle complie`
4. Run migrations:
```bash
truffle migrate --reset
```

## 🎮 Usage

1. Connect MetaMask to your local network (Ganache)
2. Import account by copying the private key from the first ganache address
3. for the first time metamask will prompt you if you want to connect metamask to the site
4. Create a new todo by entering text and clicking "Add Todo"
5. Mark todos as complete by clicking the checkbox
6. All transactions are stored on the blockchain

## 📁 Project Structure

```
eth-todo-list-react/
├── contracts/            # Smart contracts
├── migrations/           # Truffle migrations
├── public/              # Public assets
├── src/                 # React source files
│   ├── TodoList.js      # TodoList component
│   ├── TodoList.css      # TodoList style
│   ├── config.js        # config file
│   ├── App.css          # Main App style
│   └── App.js          # Main App component
├── test/                # Test files
└── truffle-config.js    # Truffle configuration
```


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

[HelloSniperMonkey](https://github.com/HelloSniperMonkey)
Maintained by [Soumyajyoti Mohanta](soumyajyotimohanta@gmail.com) 

## 🙏 Acknowledgments

- OpenZeppelin for smart contract libraries
- Truffle Suite for development tools
- React community for frontend resources
- this app has been created after reffering at dapp university youtube channel 
