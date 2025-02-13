import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import TuringArtifact from "./artifacts/contracts/Turing.sol/Turing.json";

const tokenAddress = "0x4238787a8737d77808783d1b316b71fd71573969"; // Atualize com o endereço do contrato implantado

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
                // Solicitar ao usuário para conectar sua conta MetaMask
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                // Criar o provider e signer a partir do MetaMask
                const metaMaskProvider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const metaMaskSigner = metaMaskProvider.getSigner();

                // Criar instância do contrato
                const turingContract = new ethers.Contract(
                    tokenAddress,
                    TuringArtifact.abi,
                    metaMaskSigner
                );

                setProvider(metaMaskProvider);
                setSigner(metaMaskSigner);
                setContract(turingContract);

                // Exibir a conta conectada no console
                console.log("Conectado à MetaMask com a conta:", accounts[0]);

                // Definir os codinomes manualmente
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

    async function handleIssueToken() {
        if (!selectedCodinome || !amount)
            return alert("Selecione um codinome e insira um valor.");

        const saTurings = ethers.utils.parseUnits(amount, 18);
        await contract.issueToken(selectedCodinome, saTurings);
        alert(`Tokens emitidos para ${selectedCodinome}!`);
    }

    async function handleVote() {
        if (!selectedCodinome || !amount)
            return alert("Selecione um codinome e insira um valor.");

        const saTurings = ethers.utils.parseUnits(amount, 18);
        await contract.vote(selectedCodinome, saTurings);
        alert(`Voto registrado para ${selectedCodinome}!`);
    }

    async function toggleVoting(state) {
        if (state === "on") {
            await contract.votingOn();
            alert("Votação ativada!");
        } else {
            await contract.votingOff();
            alert("Votação desativada!");
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
        balances.sort((a, b) => b.balance - a.balance); // Ordenar por saldo (decrescente)
        setRanking(balances);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h2>Turing Token Manager</h2>

                <div>
                    <h3>Emitir Tokens</h3>
                    <select
                        onChange={(e) => setSelectedCodinome(e.target.value)}
                    >
                        <option value="">Selecione um Codinome</option>
                        {codinomes.map((codinome) => (
                            <option key={codinome} value={codinome}>
                                {codinome}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Digite a quantidade de Turings"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button onClick={handleIssueToken}>Emitir Token</button>
                </div>

                <div>
                    <h3>Votar</h3>
                    <select
                        onChange={(e) => setSelectedCodinome(e.target.value)}
                    >
                        <option value="">Selecione um Codinome</option>
                        {codinomes.map((codinome) => (
                            <option key={codinome} value={codinome}>
                                {codinome}
                            </option>
                        ))}
                    </select>
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
