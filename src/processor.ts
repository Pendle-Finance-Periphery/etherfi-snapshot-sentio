import { ERC20Processor } from '@sentio/sdk/eth/builtin'
import { PENDLE_POOL_ADDRESSES, CONFIG, MISC_CONSTS } from './consts.js'
import { handleSYTransfer, takeSYSnapshot } from './handlers/SY.js'
import { PendleYieldTokenProcessor } from './types/eth/pendleyieldtoken.js'
import { handleYTTransfer, takeYTSnapshot } from './handlers/YT.js'
import { PendleMarketProcessor, getPendleMarketContractOnContext } from './types/eth/pendlemarket.js'
import { addLpUsers, handleLPTransfer, takeLPSnapshot } from './handlers/LP.js'
import { EQBBaseRewardProcessor } from './types/eth/eqbbasereward.js'
import { GLOBAL_CONFIG } from "@sentio/runtime";
import { getSumShareMapping, getUnixTimestamp } from './helper.js'

GLOBAL_CONFIG.execution = {
  sequential: true,
};

ERC20Processor.bind({
  address: PENDLE_POOL_ADDRESSES.SY,
  startBlock: PENDLE_POOL_ADDRESSES.START_BLOCK,
  name: "Pendle Pool SY",
  network: CONFIG.BLOCKCHAIN
}).onEventTransfer(async (evt, ctx) => {
  await handleSYTransfer(evt, ctx);
})


PendleYieldTokenProcessor.bind({
  address: PENDLE_POOL_ADDRESSES.YT,
  startBlock: PENDLE_POOL_ADDRESSES.START_BLOCK,
  name: "Pendle Pool YT",
  network: CONFIG.BLOCKCHAIN

}).onEventTransfer(async (evt, ctx) => {
  await handleYTTransfer(evt, ctx);
})

PendleMarketProcessor.bind({
  address: PENDLE_POOL_ADDRESSES.LP,
  startBlock: PENDLE_POOL_ADDRESSES.START_BLOCK,
  name: "Pendle Pool LP",
  network: CONFIG.BLOCKCHAIN
}).onEventTransfer(async (evt, ctx) => {
  await handleLPTransfer(evt, ctx);
}).onTimeInterval(async (blk, ctx) => {
  const timestamp = getUnixTimestamp(ctx.timestamp);
  const userShares = getSumShareMapping(
    await takeSYSnapshot(ctx),
    await takeYTSnapshot(ctx),
    await takeLPSnapshot(ctx)
  );

  for (const user in userShares) {
    ctx.eventLogger.emit("UserDailyShare", {
      user,
      share: userShares[user],
      recordedAt: timestamp,
    })
  }
}, CONFIG.SNAPSHOT_FREQUENCY);

EQBBaseRewardProcessor.bind({
  address: PENDLE_POOL_ADDRESSES.EQB_STAKING,
  startBlock: PENDLE_POOL_ADDRESSES.START_BLOCK,
  name: "Equilibria Base Reward",
  network: CONFIG.BLOCKCHAIN
}).onEventStaked(async (evt, ctx) => {
  await addLpUsers(evt.args._user);
})

ERC20Processor.bind({
  address: PENDLE_POOL_ADDRESSES.PENPIE_RECEIPT_TOKEN,
  startBlock: PENDLE_POOL_ADDRESSES.START_BLOCK,
  name: "Penpie Receipt Token",
  network: CONFIG.BLOCKCHAIN
}).onEventTransfer(async (evt, ctx) => {
  await addLpUsers(evt.args.from);
  await addLpUsers(evt.args.to);
});


ERC20Processor.bind({
  address: PENDLE_POOL_ADDRESSES.STAKEDAO_RECEIPT_TOKEN,
  startBlock: PENDLE_POOL_ADDRESSES.START_BLOCK,
  name: "Stakedao Receipt Token",
  network: CONFIG.BLOCKCHAIN
}).onEventTransfer(async (evt, ctx) => {
  await addLpUsers(evt.args.from);
  await addLpUsers(evt.args.to);
});