import React, {useState} from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@material-ui/icons/Star";

const RatingPoint = (props) => {
  const [ratingValue, setRatingValue] = useState(props.val);

  const ratingStyle = {
    "& .MuiRating-iconEmpty": {
      color: "var(--grey)"
    }
  }

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        sx={ratingStyle}
        readOnly
        name="hover-feedback"
        value={ratingValue}
        precision={0.5}
        onChange={(event, newValue) => {
          setRatingValue(newValue);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
};

export default RatingPoint;
