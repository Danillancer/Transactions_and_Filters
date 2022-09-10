import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import mock from "../mock.json";
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { FilterButton } from "../components/FilterButton";

export default function BasicTable() {
  const [incomeFilter, setIncomeFilter] = useState(false);
  const [expenditureFilter, setExpenditureFilter] = useState(false);
  const [lastMonthFilter, setLastMonthFilter] = useState(false);
  const [moreOneThousandFilter, setMoreOneThousandFilter] = useState(false);
  const date = new Date().getMonth() + 1;

  const data = mock
    .filter((el) => (incomeFilter ? el.type === "доход" : el))
    .filter((el) => (expenditureFilter ? el.type === "расход" : el))
    .filter((el) => (moreOneThousandFilter ? el.value > 1000 : el))
    .filter((el) =>
      lastMonthFilter ? +el.date.split(" ")[0].split(".")[1] === date : el
    );

  return (
    <>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
