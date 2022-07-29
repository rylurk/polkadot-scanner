import { ApiPromise, WsProvider } from '@polkadot/api';

export async function createInstance() {
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
}

export async function getLastBlockNumber() {
  const api = await createInstance();
  const lastHeader = await api.rpc.chain.getHeader();
  return lastHeader.number;
}

export type EventData = {
  blockNum: number;
  eventId: string;
  extrinsicId: string;
  method: string;
  section: string;
};

export async function getEventsByBlock(blockNum: number) {
  const api = await createInstance();
  const blockHash = await api.rpc.chain.getBlockHash(blockNum);
  const signedBlock = await api.rpc.chain.getBlock(blockHash);

  const apiAt = await api.at(signedBlock.block.header.hash);
  const allRecords = await apiAt.query.system.events();

  const parsedEvents = [];

  for (const [key, value] of Object.entries(allRecords)) {
    if (value.event) {
      const currentEvent: EventData = {
        blockNum: blockNum,
        eventId: `${blockNum}-${key}`,
        extrinsicId: `${blockNum}-${value.phase.value}`,
        method: value.event.method,
        section: value.event.section,
      };
      parsedEvents.push(currentEvent);
    }
  }
  return parsedEvents;
}
