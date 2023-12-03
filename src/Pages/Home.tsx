import React from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/categories/Categories';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../Redux/slices/filterSlice';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';
import Sort, { sortList } from '../components/sort/Sort';
import Pagination from '../components/Pagination';
import { SearchPizzaParams, fetchPizzas, selectPizzaData } from '../Redux/slices/pizzaSlice';
import { useAppDispatch } from '../Redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isSearch = React.useRef(false); //error
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onClickCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };

  //     const queryString = qs.stringify(params, { skipNulls: true });

  //     navigate(`/?${queryString}`)
  //   }

  //   if (!window.location.search) {
  //        dispatch(fetchPizzas({} as SearchPizzaParams));
  //       }
  // },[categoryId, sort.sortProperty,searchValue,currentPage]);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

   // Если был первый рендер , то проверяем URL параметры и сохроняем  в редуксе
  //  React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(setFilters({
  //       searchValue: params.search,
  //       categoryId: Number(params.category),
  //       currentPage: Number(params.currentPage),
  //       sort: sort || sortList[0],
  //     }));


  //   }
  // }, []);

  // Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);



  // Если был первый рендер, то запрашиыаем  пиццы
  // React.useEffect(() => {
  //   window.scrollTo(0, 0); // scroll верх в первом renderer
  //   if (!isSearch.current) {
  //     fetchPizzas();
  //   }
  //   isSearch.current = false;
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Нужно удалить или с ними работать
  // React.useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProperty: sort.sortProperty,
  //     categoryId,
  //     currentPage,
  //   });
  //   navigate(`?${queryString}`);
  // }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер то проверяем url параметры и сохроняем в редуксе
  // React.useEffect(() => {
  //   if(window.location.search) {
  //     const params = qs.parse(window.Location.search.substring(1));
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
  //     if (sort) {
  //       params.sort = sort
  //     }
  //     dispatch(setFilters(params))
  //   }
  //   isMounted.current = true;
  // }, [])

  const pizzas = items.map((obj: any) => (
      <PizzaBlock  {...obj} />
  ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попыробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
