import { useCategories } from "contexts/CategoriesContext";
import CategoryCard from "./CategoryCard";
const Categories = ({ month }) => {
  const { getCategories, getCategoryAmountByDate } = useCategories();

  return (
    <>
      {getCategories().map((category, i) => {
        const amount = getCategoryAmountByDate(category.name, month).reduce(
          (total, expense) => total + expense.amount,
          0
        );

        return (
          <CategoryCard
            key={category.id}
            name={category.name}
            amount={amount}
            max={category.max}
            icon={category.icon}
          />
        );
      })}
    </>
  );
};

export default Categories;
