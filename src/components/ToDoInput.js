import { useEffect, useRef, useState } from 'react';
import './ToDoInput.css';
import ToDoList from './ToDoList';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';




function ToDoInput() {

    // Add Data in LocalStorage !
    const getLocalStorageItem = () => {
        let list = localStorage.getItem('lists');
        if (list) {
            return JSON.parse(localStorage.getItem('lists'));
        }
        else {
            return [];
        }
    };

    // useStates Hooks !
    const [inputItem, setInputItem] = useState("");
    const [todoListItem, setTodoListItem] = useState(getLocalStorageItem());
    const [toggleAddBtn, setToggleAddBtn] = useState(false);
    const [itemId, setItemId] = useState();
    const [undo, setUndo] = useState();


    // useRef Hook !
    const inputRef = useRef();
    const addBtnRef = useRef();




    // Add Todo Function !
    const addBtnHandler = () => {
        if (toggleAddBtn) {
            const newTodoList = todoListItem.map((e) => {
                if (e.id === itemId) {
                    return { ...e, itemName: inputItem }
                }
                return e;
            })
            setTodoListItem(newTodoList);
            setToggleAddBtn(false);
            setInputItem("");
            setItemId();
            inputRef.current.focus();
            addBtnRef.current.style.backgroundColor = 'rgb(21, 51, 111)';
            addBtnRef.current.style.color = '#fff';

        }
        else {
            const obj = { id: uuid(), itemName: inputItem }
            setTodoListItem((prev) => [...prev, obj]);
            setInputItem("");
            inputRef.current.focus();
        }
    };


    // Remove Todo Function !
    const removeHandler = (id) => {
        const afterFilter = todoListItem.filter((val) => {
            return val.id !== id;
        });
        setTodoListItem(afterFilter);

    };


    // Edit Todo Function !
    const editBtnHandler = (id) => {
        const editTodoItem = todoListItem.find((elem) => {
            return elem.id === id;
        });
        setInputItem(editTodoItem.itemName)
        setToggleAddBtn(true);
        setItemId(id);
        inputRef.current.focus();
        addBtnRef.current.style.backgroundColor = 'aqua';
        addBtnRef.current.style.color = '#000';
    };


    // Delete All Todo Function !
    const deleteAllItemHandler = () => {
        setUndo(todoListItem);
        setTodoListItem([]);
    };


    // Recover All Todo Function !
    const recoverAllItemHandler = () => {
        setTodoListItem(undo);
    };

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(todoListItem))
    }, [todoListItem])


    return (
        <div>
            <div className=' mt-5'>

                <h1 className='toDoHeading'>ToDo List</h1>

                <input type='text' value={inputItem} ref={inputRef} placeholder='Enter ToDo...' onChange={(e) => setInputItem(e.target.value)} className=' inputBox mt-2 mr-2' />

                <button type='button' className='addBtn' onClick={addBtnHandler} ref={addBtnRef} disabled={inputItem.length <= 0 ? true : false}>{toggleAddBtn ? <FontAwesomeIcon icon={faFloppyDisk} /> : <FontAwesomeIcon icon={faPlus} />} </button>

                <button type='button' className='deleteAll' onClick={deleteAllItemHandler}>Delete All</button>
                <button type='button' className='undoAll' onClick={recoverAllItemHandler}>
                    Undo All</button>
            </div>
            <ToDoList todoListItem={todoListItem} removeHandler={removeHandler} editBtnHandler={editBtnHandler}></ToDoList>


        </div>

    );
}

export default ToDoInput;
