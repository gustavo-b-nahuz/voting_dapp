// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Turing is ERC20 {
    address public owner;
    address public professor = 0x502542668aF09fa7aea52174b9965A7799343Df7;
    bool public votingEnabled = true;

    mapping(string => address) public codinomeToAddress;
    mapping(address => string) public addressToCodinome;
    mapping(address => mapping(string => bool)) public hasVoted;

    modifier onlyOwnerOrProfessor() {
        require(
            msg.sender == owner || msg.sender == professor,
            "Not authorized"
        );
        _;
    }

    modifier votingIsActive() {
        require(votingEnabled, "Voting is not active");
        _;
    }

    modifier isAuthorized(string memory codinome) {
        require(
            codinomeToAddress[codinome] != address(0),
            "Unauthorized codinome"
        );
        _;
    }

    modifier notSelfVote(string memory codinome) {
        require(
            codinomeToAddress[codinome] != msg.sender,
            "Cannot vote for yourself"
        );
        _;
    }

    modifier onlyCodinome() {
        require(
            bytes(addressToCodinome[msg.sender]).length > 0,
            "Only codinomes can vote"
        );
        _;
    }

    constructor() ERC20("Turing", "TUR") {
        owner = msg.sender;
        _setupCodinomes();
    }

    function _setupCodinomes() private {
        codinomeToAddress["nome1"] = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        codinomeToAddress["nome2"] = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
        codinomeToAddress["nome3"] = 0x90F79bf6EB2c4f870365E785982E1f101E93b906;
        codinomeToAddress["nome4"] = 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65;
        codinomeToAddress["nome5"] = 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc;
        codinomeToAddress["nome6"] = 0x976EA74026E726554dB657fA54763abd0C3a0aa9;
        codinomeToAddress["nome7"] = 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955;
        codinomeToAddress["nome8"] = 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f;
        codinomeToAddress["nome9"] = 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720;
        codinomeToAddress[
            "nome10"
        ] = 0xBcd4042DE499D14e55001CcbB24a551F3b954096;
        codinomeToAddress[
            "nome11"
        ] = 0x71bE63f3384f5fb98995898A86B02Fb2426c5788;
        codinomeToAddress[
            "nome12"
        ] = 0xFABB0ac9d68B0B445fB7357272Ff202C5651694a;
        codinomeToAddress[
            "nome13"
        ] = 0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec;
        codinomeToAddress[
            "nome14"
        ] = 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097;
        codinomeToAddress[
            "nome15"
        ] = 0xcd3B766CCDd6AE721141F452C550Ca635964ce71;
        codinomeToAddress[
            "nome16"
        ] = 0x2546BcD3c84621e976D8185a91A922aE77ECEc30;
        codinomeToAddress[
            "nome17"
        ] = 0xbDA5747bFD65F08deb54cb465eB87D40e51B197E;
        codinomeToAddress[
            "nome18"
        ] = 0xdD2FD4581271e230360230F9337D5c0430Bf44C0;
        codinomeToAddress[
            "nome19"
        ] = 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199;

        addressToCodinome[0x70997970C51812dc3A010C7d01b50e0d17dc79C8] = "nome1";
        addressToCodinome[0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC] = "nome2";
        addressToCodinome[0x90F79bf6EB2c4f870365E785982E1f101E93b906] = "nome3";
        addressToCodinome[0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65] = "nome4";
        addressToCodinome[0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc] = "nome5";
        addressToCodinome[0x976EA74026E726554dB657fA54763abd0C3a0aa9] = "nome6";
        addressToCodinome[0x14dC79964da2C08b23698B3D3cc7Ca32193d9955] = "nome7";
        addressToCodinome[0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f] = "nome8";
        addressToCodinome[0xa0Ee7A142d267C1f36714E4a8F75612F20a79720] = "nome9";
        addressToCodinome[
            0xBcd4042DE499D14e55001CcbB24a551F3b954096
        ] = "nome10";
        addressToCodinome[
            0x71bE63f3384f5fb98995898A86B02Fb2426c5788
        ] = "nome11";
        addressToCodinome[
            0xFABB0ac9d68B0B445fB7357272Ff202C5651694a
        ] = "nome12";
        addressToCodinome[
            0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec
        ] = "nome13";
        addressToCodinome[
            0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097
        ] = "nome14";
        addressToCodinome[
            0xcd3B766CCDd6AE721141F452C550Ca635964ce71
        ] = "nome15";
        addressToCodinome[
            0x2546BcD3c84621e976D8185a91A922aE77ECEc30
        ] = "nome16";
        addressToCodinome[
            0xbDA5747bFD65F08deb54cb465eB87D40e51B197E
        ] = "nome17";
        addressToCodinome[
            0xdD2FD4581271e230360230F9337D5c0430Bf44C0
        ] = "nome18";
        addressToCodinome[
            0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
        ] = "nome19";
    }

    function issueToken(
        string memory codinome,
        uint256 amount
    ) external onlyOwnerOrProfessor isAuthorized(codinome) {
        address recipient = codinomeToAddress[codinome];
        _mint(recipient, amount);
    }

    function vote(
        string memory codinome,
        uint256 amount
    )
        external
        votingIsActive
        isAuthorized(codinome)
        notSelfVote(codinome)
        onlyCodinome
    {
        require(amount <= 2 * 10 ** 18, "Cannot vote with more than 2 TUR");
        require(
            !hasVoted[msg.sender][codinome],
            "You can only vote once for this codinome"
        );

        address recipient = codinomeToAddress[codinome];

        _mint(recipient, amount);

        _mint(msg.sender, 0.2 * 10 ** 18);

        hasVoted[msg.sender][codinome] = true;
    }

    function votingOn() external onlyOwnerOrProfessor {
        votingEnabled = true;
    }

    function votingOff() external onlyOwnerOrProfessor {
        votingEnabled = false;
    }
}
