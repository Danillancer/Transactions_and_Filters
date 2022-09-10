import { Button } from "@mui/material";

export const FilterButton =({name,filter,setFilterData,disableFilter})=> {
  return (
    <>
      <Button
        variant={filter ? "contained" : "outlined"}
        onClick={() => {
          setFilterData(!filter);
          disableFilter? disableFilter.map(el=> el(false)) : <></>
        }}
      >
        {name}
      </Button>
    </>
  );
};
