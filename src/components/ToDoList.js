import './ToDoList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function ToDoList(props) {
    // Destructering 
    const { todoListItem, removeHandler, editBtnHandler } = props;


    return (
        <div>
            {todoListItem.map((val) => {
                return (
                    <div className='mt-5' key={val.id}>
                        <div className=' bg-dark listDiv'>
                            <div className=' text ' >
                                <span className='text-white inputField'> {val.itemName}  </span>

                            </div>

                            <div className='listBtnDiv'>
                                <button type='button' className='mr-2 listBtnStyle edit' onClick={()=> editBtnHandler(val.id) }> <FontAwesomeIcon icon={faPenToSquare} /> </button>

                                <button type='button' className='ml-2 listBtnStyle remove' onClick={() => removeHandler(val.id)}> <FontAwesomeIcon icon={faTrash} /> </button>
                            </div>

                        </div>
                    </div>
                )
            })}

        </div>
    );
}

export default ToDoList;
