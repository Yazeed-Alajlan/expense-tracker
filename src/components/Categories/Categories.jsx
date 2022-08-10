import CategoryCard from "./CategoryCard";
import CategoryCardFlat from "./CategoryCardFlat";
import { useCategories } from "contexts/CategoriesContext";
import { Container, Button } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Expenses from "components/Expenses/Expenses";
import { useState, useEffect, useRef } from "react";

const Categories = () => {
  var currentMonth =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2);

  const { getCategories, getCategoryExpenses } = useCategories();
  const [categories, setCategories] = useState(getCategories());
  const monthFilterRef = useRef();
  const [month, setMonth] = useState(currentMonth);

  const handleMonthFilter = () => {
    console.log(monthFilterRef.current.value === "");

    if (monthFilterRef.current.value === "") {
      console.log(currentMonth);
      setMonth(currentMonth);
    }
    setMonth(monthFilterRef.current.value);
  };

  return (
    <>
      <Container>
        <Splide
          options={{
            autoWidth: true,
            arrow: false,
            pagination: false,
            drag: "free",
            gap: "1rem",
          }}
        >
          {categories.map((category) => {
            const amount = getCategoryExpenses(category.name).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <SplideSlide key={category.id}>
                <CategoryCard
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

      <Button onClick={handleMonthFilter}>This month</Button>
      <input
        type="month"
        ref={monthFilterRef}
        value={month}
        onChange={handleMonthFilter}
      />
      <Container>
        {categories.map((category) => {
          const amount = getCategoryExpenses(category.name).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          if (amount > 0) {
            return (
              <>
                <CategoryCardFlat
                  name={category.name}
                  amount={amount}
                  max={category.max}
                  icon={category.icon}
                />
                <Expenses categoryName={category.name} month={month} />
              </>
            );
          }
        })}
      </Container>
    </>
  );
};

export default Categories;
