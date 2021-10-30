import { FormControl, NativeSelect } from '@mui/material';
import { ChangeEventHandler, FC } from 'react';

interface MuiNativeSelectProps {
  value: any;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  name?: string;
  options:
    | Array<{ value: string | number; label: string }>
    | Array<string | number>;
}

const MuiNativeSelect: FC<MuiNativeSelectProps> = ({
  value,
  onChange,
  name,
  options = [],
}) => {
  const handleChange =
    onChange ||
    function (e) {
      console.log(e.target.value);
    };
  return (
    <FormControl sx={{ minWidth: 100 }}>
      <NativeSelect
        value={value}
        onChange={handleChange}
        name={name}
        sx={{ m: '.5rem' }}
      >
        {options.map((option) => {
          if (option && typeof option === 'object') {
            return (
              <option value={option.value} key={`option-${option.value}`}>
                {option.label || option.value}
              </option>
            );
          } else {
            return (
              <option value={option} key={`option-${option}`}>
                {option}
              </option>
            );
          }
        })}
      </NativeSelect>
    </FormControl>
  );
};

export default MuiNativeSelect;
