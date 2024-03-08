import ShoppingList from "./ShoppingList";
import MainCarousel from "./MainCarousel";
import Categories from "./Categories/Categories";
import Title from "../../components/Title";

function Home() {
    return (
        <div className="home">
            <Title title='Home'/>
            <MainCarousel/>
            <ShoppingList/>
            <Categories/>
            {/*<Subscribe />*/}
        </div>
    );
}

export default Home;
