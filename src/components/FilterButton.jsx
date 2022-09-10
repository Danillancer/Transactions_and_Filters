import { Button } from "@mui/material";

export const FilterButton = ({
  name,
  filter,
  setFilterData,
  disableFilter,
}) => {
  return (
    <>
      <Button
        className="filter__button"
        variant={filter ? "contained" : "outlined"}
        size="small"
        sx={{ letterSpacing: 0, fontSize: "0.8rem" }}
        onClick={() => {
          setFilterData(!filter);
          disableFilter ? disableFilter.map((el) => el(false)) : <></>;
        }}
      >
        {name}
      </Button>
    </>
  );
};
