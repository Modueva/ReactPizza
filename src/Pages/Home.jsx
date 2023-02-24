import React from 'react';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';
import Sort from '../components/sort/Sort';
import Categories from '../components/categories/Categories';

function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  /* ------ Fetch Запрос получаем от сервера данные------- */
  React.useEffect(() => {
    fetch('https://63f6d0179daf59d1ad8e8415.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
      window.scrollTo(0, 0); // scroll верх в первом renderer
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        {/* {items.map((obj) =>  (
                <PizzaBlock
                  key={obj.id}
                  {...obj}
                  // title={obj.title}
                  // price={obj.price}
                  // imageUrl={obj.imageUrl}
                  // sizes={obj.sizes}
                  // types={obj.types} можем сократить используевм spread оператор  {...obj}
                />
              ))} */}
      </div>
    </div>
  );
}

export default Home;
