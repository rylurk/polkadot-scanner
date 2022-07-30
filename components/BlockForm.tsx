import { createTable } from '@tanstack/react-table';
import { useState } from 'react';
import useNumberInput from './useNumberInput';
import useStringInput from './useStringInput';

type Props = {
  startBlock: number;
  endBlock: number;
  endpoint: string;
  createTable: (startBlock: number, endBlock: number, endpoint: string) => void;
};

export default function BlockForm(props: Props) {
  const [startBlock, startBlockInput] = useNumberInput(props.startBlock, 'startBlock');
  const [endBlock, endBlockInput] = useNumberInput(props.endBlock, 'endBlock');
  const [endpoint, endpointInput] = useStringInput(props.endpoint, 'endpoint');
  const [showFormInvalid, setShowFormInvalid] = useState(false);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (startBlock !== 0 && endBlock !== 0 && endpoint.trim() !== '') {
      props.createTable(startBlock, endBlock, endpoint);
    } else {
      setShowFormInvalid(true);
    }
  };

  const startBlockContainer = (
    <div>
      <label className="mb-2 block text-slate-600" htmlFor="source">
        Start block *
      </label>
      {startBlockInput}
    </div>
  );

  const endBlockContainer = (
    <div>
      <label className="mb-2 block text-slate-600" htmlFor="source">
        End block *
      </label>
      {endBlockInput}
    </div>
  );

  const endpointContainer = (
    <div>
      <label className="mb-2 block text-slate-600" htmlFor="source">
        Endpoint *
      </label>
      {endpointInput}
    </div>
  );

  const submitButton = (
    <div className="flex justify-center">
      <button
        className="border-transparent rounded border-solid border-2 transition-colors duration-500 ease-in-out font-medium text-sm uppercase tracking-widest bg-blue-400 text-white hover:bg-blue-500 py-2 px-5 mt-4 w-full"
        type="submit"
      >
        Scan
      </button>
    </div>
  );

  const formInvalidMessage = <div className="mt-6">Please fill out all fields marked with an asterisk (*)</div>;

  return (
    <div className="flex justify-center mt-12">
      <form onSubmit={submitHandler}>
        <div className="flex flex-col w-72">
          {startBlockContainer}
          {endBlockContainer}
          {endpointContainer}
          {submitButton}
          {showFormInvalid && formInvalidMessage}
        </div>
      </form>
    </div>
  );
}
