import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useQueryParam,
  NumberParam,
  StringParam,
  BooleanParam,
  withDefault,
  ArrayParam,
  useQueryParams
} from "use-query-params";
import mock from "../mock.json";
import { ButtonGroup, FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useState } from "react";
import { FilterButton } from "../components/FilterButton";
import { useEffect } from "react";

export default function SimpleTable() {
const [currencyArray,setCurrencyArray]= useState('')
useEffect(() => {
  fetch('https://api.exchangerate.host/latest?base=RUB').then(res=>res.json()).then(res=>setCurrencyArray(res.rates))
}, [])
  const [incomeFilter, setIncomeFilter] = useQueryParam(
    "incomeFilter",
    withDefault(BooleanParam, false)
  );
  const [expenditureFilter, setExpenditureFilter] = useQueryParam(
    "expenditureFilter",
    withDefault(BooleanParam, false)
  );
  const [lastMonthFilter, setLastMonthFilter] = useQueryParam(
    "lastMonthFilter",
    withDefault(BooleanParam, false)
  );
  const [moreOneThousandFilter, setMoreOneThousandFilter] = useQueryParam(
    "moreOneThousandFilter",
    withDefault(BooleanParam, false)
  );
  const [currency, setСurrency] = useQueryParam(
    "currency",
    withDefault(StringParam, 'RUB')
  );
  const date = new Date().getMonth() + 1;
  const data = mock
    .filter((el) => (incomeFilter ? el.type === "доход" : el))
    .filter((el) => (expenditureFilter ? el.type === "расход" : el))
    .filter((el) => (moreOneThousandFilter ? el.value > 1000 : el))
    .filter((el) =>
      lastMonthFilter ? +el.date.split(" ")[0].split(".")[1] === date : el
    );
  const [conversionRate, setConversionRate]=useState(1)
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
      },
    },
  };

    const handleChange = (event) => {
      setСurrency(
        event.target.value
      )
    };
    useEffect(() => {
      fetch(`https://api.exchangerate.host/convert?from=RUB&to=${currency}`).then(res=>res.json()).then(res=>setConversionRate(res.result))
    }, [currency])
    
  return (
    <>
    <div>
     <Select
          value={currency}
          size="small"
          autoWidth
          sx={{ m: 1, maxHeight:'150px'}}
          onChange={handleChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
        >
          {Object.keys(currencyArray).map((name) => (
            <MenuItem
          
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        
        </Select>
        </div>
       
      <ButtonGroup variant="text" aria-label="text button group">
        <FilterButton
          name={"доход"}
          filter={incomeFilter}
          setFilterData={setIncomeFilter}
          disableFilter={[setExpenditureFilter]}
        />
        <FilterButton
          name={"расход"}
          filter={expenditureFilter}
          setFilterData={setExpenditureFilter}
          disableFilter={[setIncomeFilter]}
        />
        <FilterButton
          name={"за последний месяц"}
          filter={lastMonthFilter}
          setFilterData={setLastMonthFilter}
        />
        <FilterButton
          name={"более 1000 руб."}
          filter={moreOneThousandFilter}
          setFilterData={setMoreOneThousandFilter}
        />
      </ButtonGroup>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{conversionRate? Math.round(row.value*conversionRate):row.value}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
