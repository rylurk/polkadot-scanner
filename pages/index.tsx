import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import BlockForm from '../components/BlockForm';
import ScanResults from '../components/ScanResults';
import { getLastBlockNumber } from '../utils/PolkadotScanner';

export default function HomePage() {
  const defaultEndpoint = 'wss://rpc.polkadot.io';
  const lastBlock = useQuery(['getLastBlockNumber', defaultEndpoint], () => getLastBlockNumber(defaultEndpoint));
  const [queryParams, setQueryParams] = useState({ startBlock: 0, endBlock: 0, endpoint: '' });

  if (lastBlock.isLoading) {
    return (
      <div className="flex justify-center">
        <div className="ease-linear border-t-blue-400 animate-spin rounded-full border-gray-200 h-20 w-20 mt-20 border-8 border-t-8" />
      </div>
    );
  }

  const createTable = (startBlock: number, endBlock: number, endpoint: string) => {
    setQueryParams({ startBlock, endBlock, endpoint });
  };

  return (
    <div>
      {queryParams.startBlock !== 0 ? (
        <ScanResults
          startBlock={queryParams.startBlock}
          endBlock={queryParams.endBlock}
          endpoint={queryParams.endpoint}
        />
      ) : (
        <BlockForm
          startBlock={Number(lastBlock.data) - 1}
          endBlock={Number(lastBlock.data)}
          endpoint={defaultEndpoint}
          createTable={createTable}
        />
      )}
    </div>
  );
}
