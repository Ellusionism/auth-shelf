import React, {useState}from 'react';
import { useDispatch } from 'react-redux';

const NewItemForm = () => {
    const dispatch = useDispatch();

    const [descriptionInput, setDescriptionInput] = useState('');
    const [image_urlInput, setImage_urlInput] = useState('');
    //const [user_id, setUser_id] = useState();


    const addNewItem = (event) => {
        event.preventDefault();
        let newItem = {
          description: descriptionInput,
          image_url: image_urlInput,
           //figure that out soonish
        }
        
        // Yell at a Saga function to send the newItem
        // data to our server:
        dispatch({
          type: 'CREATE_ITEM',
          payload: newItem
        })

        clearItemForm();
    }

    const clearItemForm = () => {
        setDescriptionInput('');
        setImage_urlInput('');
      }


    return (
        <div>
            <h3>Item Input Form:</h3>
            <form onSubmit={addNewItem}>
                <input
                  type='text'
                  placeholder="Description"
                  value={descriptionInput}
                  onChange={(evt) => setDescriptionInput(evt.target.value)} />
                <input
                  type='text'
                  placeholder="Image URL"
                  value={image_urlInput}
                  onChange={(evt) => setImage_urlInput(evt.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>

    );
}

export default NewItemForm;