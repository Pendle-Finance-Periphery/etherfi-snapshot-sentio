import { EthChainId } from '@sentio/sdk/eth'



export const MISC_CONSTS = {
    ONE_E18: BigInt("1000000000000000000"),
    ONE_DAY_IN_MINUTE: 60 * 24,
    ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
    MULTICALL_BATCH: 250,
}

export const CONFIG = {
    BLOCKCHAIN: EthChainId.ETHEREUM,
    SNAPSHOT_FREQUENCY: 24 * 60, // 1 day in minute
}

export const PENDLE_POOL_ADDRESSES = {
    SY: "0xac0047886a985071476a1186be89222659970d65",
    YT: "0xfb35fd0095dd1096b1ca49ad44d8c5812a201677",
    LP: "0xf32e58f92e60f4b0a37a69b95d642a471365eae8",
    START_BLOCK: 18969500,
    TREASURY: "0x8270400d528c34e1596ef367eedec99080a1b592",
    PENPIE_RECEIPT_TOKEN: "0x2da4401616dc5668100decfaf579229233b4ec1c",
    EQB_STAKING: "0x17ea39035ad2cb5d8e2e005349ff23bb52d1c8b7",
    STAKEDAO_RECEIPT_TOKEN: "0xc6bb9d3d4c980b53c31f6ffb998bea7e74029954",
    MULTICALL: "0xca11bde05977b3631167028862be2a173976ca11",
    LIQUID_LOCKERS: [
        {
            // penpie
            address: "0x6e799758cee75dae3d84e09d40dc416ecf713652",
            receiptToken: "0x2da4401616dc5668100decfaf579229233b4ec1c",
        },
        {
            // equilibira
            address: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3",
            receiptToken: "0x17ea39035ad2cb5d8e2e005349ff23bb52d1c8b7",
        },
        {
            // stakedao
            address: "0xd8fa8dc5adec503acc5e026a98f32ca5c1fa289a",
            receiptToken: "0xc6bb9d3d4c980b53c31f6ffb998bea7e74029954",
        },
    ]
}