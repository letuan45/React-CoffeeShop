import React, { useState, useEffect, useCallback } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const pageSize = 12;
const CustomPagination = (props) => {
  const paginationStyle = {
    "& .MuiPagination-ul": {
      justifyContent: "center",
      margin: "15px 0 40px 0",
      "& .MuiPaginationItem-root": {
        fontFamily: '"Poppins", sans-serif',
        fontWeight: "700",
        fontSize: "1.8rem",
        lineHeight: "5rem",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "var(--grey)",
        margin: "0 8px",
        "&.Mui-selected": {
          backgroundColor: "var(--main)",
        },
      },
    },
  };

  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

  const [count, setCount] = useState(0);

  //THIS PART NEED TO BE UPDATE WHEN HAVE REDUX
  const { products } = props;
  const { setData } = props;

  const getData = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (products.length > 0) {
        resolve({
          count: products.length,
          data: products,
        });
        setCount(products.length);
      }
    });
  }, [products]);

  useEffect(() => {
    getData().then((response) => {
      const pageObj = {
        data: response.data.slice(pagination.from, pagination.to),
        count: response.count,
      };
      setData(pageObj, pagination.from, pagination.to);
    });
  }, [products, pagination.from, pagination.to, getData, setData]);

  const HandlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to });
    window.scrollTo(0, 0);
  };

  return (
    <Stack spacing={2} sx={paginationStyle}>
      <Pagination
        count={Math.ceil(count / pageSize)}
        onChange={HandlePageChange}
      />
    </Stack>
  );
};

export default CustomPagination;
