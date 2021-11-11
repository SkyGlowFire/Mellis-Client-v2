import { FC, ChangeEvent, FocusEvent, useState, useEffect } from 'react';
import Filter from '../Filter';
import { Slider, TextField, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useFilters } from '~/app/hooks';

const useStyles = makeStyles({
  root: {
    padding: '1.3rem',
  },
  inputs: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  input: {
    maxWidth: '45%',
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  slider: {
    '& .MuiSlider-thumb.Mui-active': {
      boxShadow: '0 0 0 8px rgba(33, 56, 117, .15)',
      '&.Mui-focusVisible': {
        boxShadow: 'none',
      },
    },
  },
});

const PriceFilter: FC = () => {
  const {
    filtersState: { minPrice, maxPrice, price },
    filtersSetters: { setPrice },
  } = useFilters();
  const classes = useStyles();
  const [minVal, setMinVal] = useState<string>(String(minPrice));
  const [maxVal, setMaxVal] = useState<string>(String(maxPrice));

  function handleSliderChange(values: number[] | number) {
    setPrice(values as [number, number]);
  }

  useEffect(() => {
    setMinVal(String(price[0]));
    setMaxVal(String(price[1]));
  }, [price, setMinVal, setMaxVal]);

  const handleMaxInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    let newVal = e.target.value === '' ? maxPrice : Number(e.target.value);
    if (Number.isNaN(newVal)) return;
    if (newVal > maxPrice) newVal = maxPrice;
    if (newVal < price[0]) newVal = price[0];
    setPrice((prev) => [prev[0], newVal]);
  };

  const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!Number.isNaN(Number(val))) setMaxVal(val);
  };

  const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!Number.isNaN(Number(val))) setMinVal(val);
  };

  const handleMinInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    let newVal = e.target.value === '' ? minPrice : Number(e.target.value);
    if (newVal < minPrice) newVal = minPrice;
    if (newVal > price[1]) newVal = price[1];
    setPrice((prev) => [newVal, prev[1]]);
  };

  return (
    <Filter
      name="price"
      showCloseBtn={price[0] !== minPrice || price[1] !== maxPrice}
    >
      <div className={classes.root}>
        <div className={classes.inputs}>
          <TextField
            className={classes.input}
            size="small"
            margin="dense"
            placeholder="Min"
            value={minVal}
            onChange={handleMinInputChange}
            onBlur={handleMinInputBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              style: { fontSize: 16, paddingLeft: 8 },
              inputProps: { min: minPrice },
            }}
          />
          <TextField
            className={classes.input}
            size="small"
            margin="dense"
            placeholder="Max"
            value={maxVal}
            onChange={handleMaxInputChange}
            onBlur={handleMaxInputBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              style: { fontSize: 16, paddingLeft: 8 },
              inputProps: { max: maxPrice },
            }}
          />
        </div>
        {minPrice !== maxPrice && (
          <Slider
            valueLabelDisplay="off"
            value={price}
            onChange={(_, val) => handleSliderChange(val)}
            aria-labelledby="range-slider"
            max={maxPrice}
            min={minPrice}
            size="small"
            className={classes.slider}
          />
        )}
      </div>
    </Filter>
  );
};

export default PriceFilter;
