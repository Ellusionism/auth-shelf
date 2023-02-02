import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function EditItem() {

  const dispatch = useDispatch();
  const history = useHistory();

  const item = useSelector(store => store.item)

  const [ itemDescription, setItemDescription ] = useState(item.description);
  const [ itemImageUrl, setItemImageUrl ] = useState(item.image_url);

  const updateItem = (event) => {
    console.log('Updated item:', itemDescription, itemImageUrl)
    event.preventDefault();
    const updatedItem = {
      id: item.id,
      description: itemDescription,
      image_url: itemImageUrl,
    }
    dispatch({
      type: 'UPDATE_ITEM',
      payload: updatedItem
    })
    history.push('/shelf');
  };

  return (
    <form onSubmit = { updateItem }>
      <label
        htmlFor = "descriptionInput"
        >Edit item description</label>
      
      <input
        type = 'text'
        className = 'descriptionInput'
        value = {itemDescription}
        onChange={(event) => setItemDescription(event.target.value)}
      />
      <label
        htmlFor = "imageUrlInput"
        >Edit image URL</label>
      <input
        className = 'imageUrlInput'
        type = 'text'
        value = {itemImageUrl}
        onChange={(event) => setItemImageUrl(event.target.value)}
      />
      <button type = 'submit'>Update item</button>
    </form>
  )
}

export default EditItem;