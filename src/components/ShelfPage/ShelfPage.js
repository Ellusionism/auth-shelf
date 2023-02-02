import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NewItemForm from '../NewItemForm/NewItemForm';

function ShelfPage() {

  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: 'FETCH_SHELF'
    });
  }, []);

  const deleteItem = (item) => {
    // console.log(user)

    if (item.user_id === user.id){
      dispatch({
        type: 'DELETE_ITEM',
        payload: item.id
      })
    } else {
      console.log('NOOOO! >:(');
    }
  }

  const editItem = (item) => {
    // console.log(user)

    if (item.user_id === user.id){
      dispatch({
        type: 'SET_ITEM',
        payload: item
      })
      history.push(`/edit/${item.id}`)
    } else {
      console.log('NOOOO! >:(');
    }
  }

  const dispatch = useDispatch();
  const shelf = useSelector(store => store.shelf);
  const user = useSelector(store => store.user);


  // console.log(shelf);

  return (
    <div className="container">
      <NewItemForm />
      <h2>Shelf</h2>
      <ul>
        { shelf.map(item => {
          return (
            <div key={item.id}>
            <li >{item.description}</li>
            <img src={item.image_url} alt={item.description}/>
            <button onClick={() => deleteItem(item)}>Delete</button>
            <button onClick={() => editItem(item)}>Edit</button>
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default ShelfPage;
