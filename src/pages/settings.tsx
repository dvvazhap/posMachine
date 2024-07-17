import { Box, Button, OutlinedInput, TextField, InputAdornment, IconButton, InputLabel, FormControl } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import React, { useEffect, useState, useContext } from "react";
import { styled } from '@mui/material/styles';

import { Context } from "../context/contextProvider";
import { config } from "../config";
import InfoIcon from "@mui/icons-material/InfoRounded";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    maxWidth: 100
  },
}));

export function SettingsComponent() {
  // @ts-ignore
  const { appInitialized, tableDataAdded, jsonConfig, setJsonConfig, setAppInitialized } = useContext(Context);

  const [restName, setRestName] = React.useState(jsonConfig.restName || config.defaultRestName);
  const [restNameError, setRestNameError] = React.useState(false);
  const [restNameHelperText, setRestNameHelperText] = React.useState("");

  const [not, setNot] = React.useState(jsonConfig.not || config.defaultNot);
  const [NotError, setNotError] = React.useState(false);
  const [NotHelperText, setNotHelperText] = React.useState("");

  const [disableSubmit, setDisableSubmit] = useState(true);

  function handleRestNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRestName(event.target.value);
    if (event.target.value.trim() !== '') {
      setRestNameError(false);
      setRestNameHelperText("");
    } else {
      setRestNameError(true);
      setRestNameHelperText("Enter a valid name. This will come in the bill");
    }
  }

  function handleNotChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNot(event.target.value);
    if (
      /^\d+$/.test(event.target.value) &&
      event.target.value.trim() !== '' &&
      parseInt(event.target.value) >= 1 &&
      parseInt(event.target.value) <= config.maxTableNumber
    ) {
      setNotError(false);
      setNotHelperText("");
    } else {
      setNotError(true);
      setNotHelperText("Number between 1 and " + config.maxTableNumber);
    }
  }

  useEffect(() => {
    if (!NotError) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [NotError]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submittubg form");
    // @ts-ignore
    let res = electron.initializeApp({ not: not, restName: restName }).then((resp: any) => {
      console.log("res from initializeApp:", JSON.parse(resp));
      setJsonConfig({ not: not, restName: restName });
      setAppInitialized(true);
    });

  }


  return <>
    <Box
      component="form" onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, mt: 3 },
      }}
      noValidate
      autoComplete="off"
    >
      <div>

        <TextField
          fullWidth
          id="restaurant-name"
          label="Name"
          sx={{ width: '50ch' }}
          value={restName}
          helperText={restNameHelperText}
          onChange={handleRestNameChange}
          error={restNameError}
        />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            required
            id="number-of-tables"
            label='Number of Tables'
            value={not}
            helperText={NotHelperText}
            onChange={handleNotChange}
            error={NotError}
          />
          <BootstrapTooltip title="Buy software to increase more tables" placement="left">
            <IconButton>
              <InfoIcon fontSize="small" />
            </IconButton>
          </BootstrapTooltip>
        </div>

      </div>



      <Button variant="contained" disabled={disableSubmit} color="primary" type="submit">
        Submit
      </Button>
    </Box>
  </>
} 