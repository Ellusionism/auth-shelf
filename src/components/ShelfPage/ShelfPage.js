import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewItemForm from '../NewItemForm/NewItemForm';

function ShelfPage() {

  useEffect(() => {
    dispatch({
      type: 'FETCH_SHELF'
    });
  }, []);

  const dispatch = useDispatch();

  const shelf = useSelector(store => store.shelf);

  console.log(shelf);

  return (
    <div className="container">
      <NewItemForm />
      <h2>Shelf</h2>
      <ul>
        { shelf.map(item => {
          return (
            <li>{item.description}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default ShelfPage;
