import { useState } from 'react';
import InputContainer from './InputContainer';
import useNumberInput from '../Hooks/useNumberInput';
import useStringInput from '../Hooks/useStringInput';
import FormInvalidMessages from './FormInvalidMessages';
import SubmitButton from './SubmitButton';

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
  const [formInvalidMsg, setformInvalidMsg] = useState(['']);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const formInvalidations = [];

    if (startBlock <= 0) {
      formInvalidations.push('Please enter a value for start block (no negatives).');
    }
    if (endBlock <= 0) {
      formInvalidations.push('Please enter a value for end block (no negatives).');
    }
    if (endBlock > props.endBlock || startBlock > props.endBlock) {
      formInvalidations.push('Block numbers cannot be greater than the latest available.');
    }
    if (startBlock > endBlock) {
      formInvalidations.push('Start block must be less than end block.');
    }
    if (endpoint.trim() === '') {
      formInvalidations.push('Please enter an endpoint.');
    }

    if (formInvalidations.length === 0) {
      props.createTable(startBlock, endBlock, endpoint);
    } else {
      setformInvalidMsg(formInvalidations);
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <form onSubmit={submitHandler}>
        <div className="flex flex-col w-72">
          <InputContainer label="Start block" input={startBlockInput} />
          <InputContainer label="End block" input={endBlockInput} />
          <InputContainer label="Endpoint" input={endpointInput} />
          <SubmitButton />
          <FormInvalidMessages messages={formInvalidMsg} />
        </div>
      </form>
    </div>
  );
}
