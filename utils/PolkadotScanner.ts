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

interface EventData {
  eventId: string;
  extrinsicId: number;
  method: string;
  section: string;
  accountId?: string;
  amount?: number;
}

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
        eventId: key,
        extrinsicId: value.phase.value,
        method: value.event.method,
        section: value.event.section,
      };
      if (value.event.data.who) {
        currentEvent.accountId = value.event.data.who;
        currentEvent.amount = value.event.data.amount / 10000000000;
      }
      parsedEvents.push(currentEvent);
    }
  }
  return parsedEvents;
}
