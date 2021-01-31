import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./Todo.css";
import CheckIcon from "@material-ui/icons/Check";
function Todo({ todo, setList, deleteOnList, index, edit }) {
  const [todoItem, setTodoItem] = useState(todo);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const handleClickCheck = () => {
    let obj = todoItem;
    obj = { ...obj, checked: !todoItem.checked };
    setList(obj, index);
  };

  const handleClickDelete = () => {
    setDeleteFlag(!deleteFlag);
    setTimeout(() => {
      deleteOnList(index);
    }, 200);
  };

  useEffect(() => {
    setTodoItem(todo);
  }, [todo]);

  const onChangeEdit = (e) => {
    if (e.target.value !== "") {
      const newItem = JSON.parse(JSON.stringify(todoItem));
      newItem.title = e.target.value;
      setTodoItem(newItem);
    }
  };
  const handleClickEdit = () => {
    edit(todoItem, index);
    setOnEdit(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      edit(todoItem, index);
      setOnEdit(false);
    }
  };
  return (
    <li className={deleteFlag ? "todo todo__deleteTask" : "todo"}>
      <label className="todo__label" htmlFor={todo.title}>
        <input
          className="todo__input"
          type="checkbox"
          onChange={() => handleClickCheck()}
          checked={todo.checked ? true : false}
        />
        <span className="check"></span>
        <input
          type="text"
          className={todo.checked ? "todo__edit checked" : "todo__edit"}
          value={todoItem.title}
          onFocus={() => setOnEdit(true)}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => onChangeEdit(e)}
        />
      </label>
      {onEdit ? (
        <CheckIcon
          className="todoIcon todoIcon--confirm"
          onClick={() => handleClickEdit()}
        />
      ) : (
        <DeleteForeverIcon
          className="todoIcon todoIcon--delete"
          onClick={() => handleClickDelete()}
        />
      )}
    </li>
  );
}

export default Todo;
