import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

// Import Environment Variables
const API_URL = process.env.REACT_APP_API_URL;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const { data, loading, error } = useFetch(`${API_URL}items/${item.id}`);
  const {
    palette: { neutral },
  } = useTheme();

  const category = data?.attributes?.category ?? item?.attributes?.category;
  const price = data?.attributes?.price ?? item?.attributes?.price;
  const name = data?.attributes?.name ?? item?.attributes?.name;
  const imageUrl = `${UPLOAD_URL}${
    data?.attributes?.image?.data?.attributes?.formats?.medium?.url ??
    item?.attributes?.image?.data?.attributes?.formats?.medium?.url
  }`;
  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }
  // const url =
  //   image?.data?.attributes?.formats?.medium?.url ?? "defaultImageURL";

  // const { category, price, name, image } = data
  //   ? data.attributes
  //   : item.attributes;
  // const {
  //   data: {
  //     attributes: {
  //       formats: {
  //         medium: { url },
  //       },
  //     },
  //   },
  // } = image;

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={item.name}
          width="300px"
          height="400px"
          src={imageUrl} // Use imageUrl here
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">৳ {price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
