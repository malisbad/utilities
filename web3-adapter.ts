enum Chain {
    ETH,
}

type EthBlock = {
    number: number;
    hash: string;
    parentHash: string;
    baseFeePerGas: number;
    nonce: string;
    sha3Uncles: string;
    logsBloom: string;
    transactionsRoot: string;
    stateRoot: string;
    miner: string;
    difficulty: string;
    totalDifficulty: string;
    size: number;
    extraData: string;
    gasLimit: number;
    gasUsed: number;
    timestamp: number;
    transactions?: string[];
    uncles: string[]
};

const isMinedUncleBlock = (chain: Chain, blockHeight: number, blockhash?: string, coinbaseAddr?: string): boolean => {
    const block: EthBlock = web3.eth.getBlock(blockHeight);
    if (!block) throw new Error(`${chain} at block height ${blockHeight} does not exist`);
    if (blockhash && block.hash === blockhash) return false; // if the block at this height and the block hash match, not an uncle
    if (coinbaseAddr && block.miner === coinbaseAddr) return false;
    if (block.uncles.length > 0) return true;
    throw new Error(`${chain} at block height ${blockHeight} with hash ${blockhash} does not exist`);
};
