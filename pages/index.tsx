import { ApiPromise, WsProvider } from '@polkadot/api';

export default function HomePage() {
  const createInstance = async () => {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });

    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();

    // Log the information
    console.log(`Last block #${lastHeader.number} has hash ${lastHeader.hash}`);

    // Block #11350896 has hash 0x1fe9614875eeecf1ddd8c1bf6c5385b734ada7ea4c7dbabc01e0e368625b08d5

    const blockHash = await api.rpc.chain.getBlockHash(11350896);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    console.log(signedBlock.block.header.hash.toHex());

    // no blockHash is specified, so we retrieve the latest
    const apiAt = await api.at(signedBlock.block.header.hash);
    const allRecords = await apiAt.query.system.events();

    // map between the extrinsics and events
    signedBlock.block.extrinsics.forEach(({ method: { method, section } }, index) => {
      // filter the specific events based on the phase and then the index of our extrinsic in the block
      const events = allRecords
        .filter(({ phase }) => phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index))
        .map(({ event }) => `${event.section}.${event.method}`);

      console.log(`${section}.${method}:: ${events.join(', ') || 'no events'}`);
    });
  };

  createInstance();

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
