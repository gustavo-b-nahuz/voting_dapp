import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import TuringArtifact from "./artifacts/contracts/Turing.sol/Turing.json";

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [codinomes, setCodinomes] = useState([]);
    const [selectedCodinome, setSelectedCodinome] = useState("");
    const [amount, setAmount] = useState("");
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        async function connectMetaMask() {
            if (typeof window.ethereum === "undefined") {
                alert(
                    "MetaMask não encontrado. Por favor, instale-o para continuar."
                );
                return;
            }

            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                const metaMaskProvider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const metaMaskSigner = metaMaskProvider.getSigner();

                const turingContract = new ethers.Contract(
                    tokenAddress,
                    TuringArtifact.abi,
                    metaMaskSigner
                );

                setProvider(metaMaskProvider);
                setSigner(metaMaskSigner);
                setContract(turingContract);

                console.log("Conectado à MetaMask com a conta:", accounts[0]);

                const codinomeList = [
                    "nome1",
                    "nome2",
                    "nome3",
                    "nome4",
                    "nome5",
                    "nome6",
                    "nome7",
                    "nome8",
                    "nome9",
                    "nome10",
                    "nome11",
                    "nome12",
                    "nome13",
                    "nome14",
                    "nome15",
                    "nome16",
                    "nome17",
                    "nome18",
                    "nome19",
                ];
                setCodinomes(codinomeList);
            } catch (error) {
                console.error("Erro ao conectar com o MetaMask:", error);
                alert(
                    "Erro ao conectar ao MetaMask. Veja o console para mais detalhes."
                );
            }
        }

        connectMetaMask();
    }, []);

    // Função para validar se o codinome está na lista
    function isValidCodinome(codinome) {
        return codinomes.includes(codinome);
    }

    async function handleIssueToken() {
        if (!selectedCodinome || !amount) {
            return alert("Selecione um codinome e insira um valor.");
        }

        if (!isValidCodinome(selectedCodinome)) {
            return alert("Codinome inválido. Escolha um codinome da lista.");
        }

        try {
            const saTurings = ethers.utils.parseUnits(amount, 18);
            await contract.issueToken(selectedCodinome, saTurings);
            alert(`Tokens emitidos para ${selectedCodinome}!`);
        } catch (error) {
            if (error.data) {
                alert(error.data.message);
            }

            console.error("Erro ao emitir tokens:", error);
        }
    }

    async function handleVote() {
        if (!selectedCodinome || !amount) {
            return alert("Selecione um codinome e insira um valor.");
        }

        if (!isValidCodinome(selectedCodinome)) {
            return alert("Codinome inválido. Escolha um codinome da lista.");
        }

        try {
            const saTurings = ethers.utils.parseUnits(amount, 18);
            await contract.vote(selectedCodinome, saTurings);
            alert(`Voto registrado para ${selectedCodinome}!`);
        } catch (error) {
            console.error("Erro ao votar:", error);
            if (error.data) {
                alert(error.data.message);
            }
        }
    }

    async function toggleVoting(state) {
        try {
            if (state === "on") {
                await contract.votingOn();
                alert("Votação ativada!");
            } else {
                await contract.votingOff();
                alert("Votação desativada!");
            }
        } catch (error) {
            if (error.data) {
                alert(error.data.message);
            }

            console.error("Erro ao ativar/desativar:", error);
        }
    }

    async function loadRanking() {
        const balances = [];
        for (const codinome of codinomes) {
            const address = await contract.codinomeToAddress(codinome);
            const balance = await contract.balanceOf(address);
            balances.push({
                codinome,
                balance: ethers.utils.formatUnits(balance, 18),
            });
        }
        balances.sort((a, b) => b.balance - a.balance);
        setRanking(balances);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h2>Turing Token Manager</h2>

                <div>
                    <h3>Emitir Tokens</h3>
                    <input
                        type="text"
                        placeholder="Digite o codinome"
                        onChange={(e) => setSelectedCodinome(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Digite a quantidade de Turings"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button onClick={handleIssueToken}>Emitir Token</button>
                </div>

                <div>
                    <h3>Votar</h3>
                    <input
                        type="text"
                        placeholder="Digite o codinome"
                        onChange={(e) => setSelectedCodinome(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Digite a quantidade de Turings"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button onClick={handleVote}>Votar</button>
                </div>

                <div>
                    <h3>Controle de Votação</h3>
                    <button onClick={() => toggleVoting("on")}>
                        Ativar Votação
                    </button>
                    <button onClick={() => toggleVoting("off")}>
                        Desativar Votação
                    </button>
                </div>

                <div>
                    <h3>Ranking</h3>
                    <button onClick={loadRanking}>Carregar Ranking</button>
                    <ul>
                        {ranking.map(({ codinome, balance }) => (
                            <li key={codinome}>
                                {codinome}: {balance} TUR
                            </li>
                        ))}
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default App;
