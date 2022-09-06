import { useState } from "react";

import CategoryCard from "./CategoryCard";
import { useCategories } from "contexts/CategoriesContext";
import { Container, Button } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const CategoriesSlider = ({ month }) => {
  const { getCategories, getCategoryAmountByDate } = useCategories();
  return (
    <Container>
      <Splide
        options={{
          autoWidth: true,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "1rem",
        }}
      >
        {getCategories().map((category, i) => {
          const amount = getCategoryAmountByDate(category.name, month).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          return (
            <SplideSlide key={category.id}>
              <CategoryCard
                key={i}
                name={category.name}
                amount={amount}
                max={category.max}
                icon={category.icon}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </Container>
  );
};

export default CategoriesSlider;
