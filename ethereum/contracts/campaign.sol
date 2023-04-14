pragma solidity ^0.4.17;


contract CampaignFactory {
    address[] public deployedCampaigns; 
    function createCampaign(uint minimum){
        address newone = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newone);
    }
    function getDeployedCampaigns () public view returns (address[]) {
        return deployedCampaigns;
    }

}



contract Campaign {

struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
    uint approvalCount;
    mapping(address => bool)  approvals;
}

Request[] public requests;

   address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;


    function Campaign (uint minimum, address creator) public  {
        minimumContribution = minimum;
        manager = creator;
    }
    function contribute() public payable {
        require(msg.value>minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(    string description,
    uint value,
    address recipient
) restricted public {
    Request memory naya =  Request({description:description, value:value, recipient:recipient, complete : false, approvalCount : 0});
    requests.push(naya);
        }

    modifier restricted() {
        require(msg.sender==manager);
    _;
    }

    function approveRequest (uint index) public {
        require(approvers[msg.sender]);
        require (!requests[index].approvals[msg.sender] );
        requests[index].approvalCount++;
        requests[index].approvals[msg.sender] = true;
    }
    function finalizeRequest(uint index) restricted public {
        Request storage curReq = requests[index];
        require(!curReq.complete);
        require(curReq.approvalCount > (approversCount/2));
        

        curReq.recipient.transfer(curReq.value);
        curReq.complete = true;

    }

}
