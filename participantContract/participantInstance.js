import web3 from './web3';

const abi = [
  {
    constant: true,
    inputs: [],
    name: 'returnContents',
    outputs: [
      {
        name: 'inputName',
        type: 'string'
      },
      {
        name: 'description',
        type: 'string'
      },
      {
        name: 'videoID',
        type: 'string'
      },
      {
        name: 'decidedShare',
        type: 'uint256'
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'resultAverageShare',
        type: 'uint256'
      },
      {
        name: 'inputName',
        type: 'string'
      },
      {
        name: 'description',
        type: 'string'
      }
    ],
    name: "averageShareCalculation",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
        {
            name: "owner",
            type: "address"
        },
        {
            name: "videoID",
            type: "uint256"
        },
        {
            name: "decidedShare",
            type: "uint256"
        },
        {
            name: "inputName",
            type: "string"
        },
        {
            name: "description",
            type: "string"
        },
        {
            name: "resultAverageShare",
            type: "uint256"
        }
    ],
    name: "finalAverageAgreement",
    type: "event"
  },
  {
    inputs: [
      {
        name: 'creator',
        type: 'address'
      },
      {
        name: 'uploadVideoID',
        type: 'string'
      },
      {
        name: 'uploadDecidedShare',
        type: 'uint256'
      },
      {
        name: 'Fee',
        type: 'uint8'
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  }
]; // THE ABI
// Here is just only abi because we haven't created auction yet.
export default address => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};
