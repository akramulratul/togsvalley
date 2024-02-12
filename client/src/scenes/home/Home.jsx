import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";
import MainCarousel from "./MainCarousel";
import Categories from "./Categories/Categories";

function Home() {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
      <Categories />
      <Subscribe />
    </div>
  );
}

export default Home;
