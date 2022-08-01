import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import BlockForm from '../components/Form/BlockForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ScanResults from '../components/ScanResults';
import { getLastBlockNumber } from '../utils/PolkadotScanner';

export default function HomePage() {
  const defaultEndpoint = 'wss://rpc.polkadot.io';
  const lastBlock = useQuery(['getLastBlockNumber', defaultEndpoint], () => getLastBlockNumber(defaultEndpoint));
  const [queryParams, setQueryParams] = useState({ startBlock: 0, endBlock: 0, endpoint: '' });

  if (lastBlock.isLoading) {
    return <LoadingSpinner verticalOffset="mt-32" />;
  }

  const createTable = (startBlock: number, endBlock: number, endpoint: string) => {
    setQueryParams({ startBlock, endBlock, endpoint });
  };

  const resetQuery = () => {
    setQueryParams({ startBlock: 0, endBlock: 0, endpoint: '' });
  };

  return (
    <div>
      {queryParams.startBlock !== 0 ? (
        <ScanResults
          startBlock={queryParams.startBlock}
          endBlock={queryParams.endBlock}
          endpoint={queryParams.endpoint}
          reset={resetQuery}
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
