// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract AgentFactory is Ownable {
    /// -----------------------------------------------------------------------
    /// Errors (cheaper than revert strings)
    /// -----------------------------------------------------------------------
    error InvalidTemplateAddress();

    /// -----------------------------------------------------------------------
    /// Storage
    /// -----------------------------------------------------------------------
    address public agentTemplate;
    uint256 public agentCounter;

    struct AgentInfo {
        address agentAddress;
        address templateAddress;
        string cid;
    }

    mapping(address => AgentInfo[]) private _agentsByCreator;

    /// -----------------------------------------------------------------------
    /// Events
    /// -----------------------------------------------------------------------
    event AgentCreated(
        address indexed creator,
        address indexed agentAddress,
        address indexed templateAddress,
        string cid
    );

    /// -----------------------------------------------------------------------
    /// Constructor
    /// -----------------------------------------------------------------------
    constructor(address _agentTemplate) {
        if (_agentTemplate == address(0)) revert InvalidTemplateAddress();
        agentTemplate = _agentTemplate;
    }

    /// -----------------------------------------------------------------------
    /// Admin
    /// -----------------------------------------------------------------------
    function setAgentTemplate(address _agentTemplate) external onlyOwner {
        if (_agentTemplate == address(0)) revert InvalidTemplateAddress();
        agentTemplate = _agentTemplate;
    }

    /// -----------------------------------------------------------------------
    /// Agent Creation
    /// -----------------------------------------------------------------------
    function createAgent(string calldata cid) external returns (address agent) {
        agent = Clones.clone(agentTemplate);

        _agentsByCreator[msg.sender].push(
            AgentInfo({
                agentAddress: agent,
                templateAddress: agentTemplate,
                cid: cid
            })
        );

        unchecked {
            agentCounter++;
        }

        emit AgentCreated(msg.sender, agent, agentTemplate, cid);
    }

    /// -----------------------------------------------------------------------
    /// Views
    /// -----------------------------------------------------------------------
    function getAgentsByCreator(address creator)
        external
        view
        returns (AgentInfo[] memory)
    {
        return _agentsByCreator[creator];
    }
}
