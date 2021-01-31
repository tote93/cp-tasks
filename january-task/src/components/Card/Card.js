import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import "./Card.css";
import AddIcon from "@material-ui/icons/Add";
import Todo from "../ToDo/Todo";
import DeleteIcon from "@material-ui/icons/Delete";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
function Card({ info, index, deleteCard }) {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState(info.items || []);

  const addToDo = () => {
    if (inputValue !== "") {
      const localList = [
        ...todoList,
        { checked: false, title: inputValue, key: todoList.length },
      ];
      setTodoList(localList);
      setInputValue("");
      exportDataToStorage(localList);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue !== "") {
      const localList = [
        ...todoList,
        { checked: false, title: inputValue, key: todoList.length },
      ];
      setTodoList(localList);
      setInputValue("");
      exportDataToStorage(localList);
    }
  };
  const handleStatusChange = (todo, i) => {
    let list = todoList;
    list[i] = todo;
    setTodoList([...list]);
    exportDataToStorage(list);
  };
  const handleDelete = (index) => {
    const list = todoList.filter((_, i) => i !== index);
    setTodoList(list);
    exportDataToStorage(list);
  };
  const handleDeleteAll = () => {
    setTodoList([]);
    exportDataToStorage([]);
  };

  const exportDataToStorage = (data) => {
    const jsonStorage = JSON.parse(localStorage.getItem("cards"));
    jsonStorage[index].items = data;
    localStorage.setItem("cards", JSON.stringify(jsonStorage));
  };

  const handleEdit = (newInfo, index) => {
    const list = todoList.map((item, i) => {
      return i === index ? newInfo : item;
    });
    setTodoList(list);
    exportDataToStorage(list);
  };

  return (
    <div className="card">
      <HighlightOffIcon
        className="card__deleteCard"
        onClick={() => deleteCard(index)}
      />
      <div className="card__image">
        <div className="card__title">
          <h3>{info.cardTitle}</h3>
        </div>
      </div>
      <div className="card__form">
        <FormControl className="form__input">
          <InputLabel>Add Item...</InputLabel>
          <Input
            autoComplete="off"
            autoFocus
            inputProps={{ maxLength: 20 }}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            value={inputValue}
            onKeyDown={(e) => handleKeyDown(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => addToDo()}>
                  {inputValue !== "" && <AddIcon className="icon__valid" />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <ul className="todoList">
          {todoList.map((todo, i) => {
            return (
              <Todo
                todo={todo}
                key={todo.key}
                index={i}
                setList={handleStatusChange}
                deleteOnList={handleDelete}
                edit={handleEdit}
              />
            );
          })}
        </ul>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className="card__deleteAll"
          startIcon={<DeleteIcon />}
          onClick={() => handleDeleteAll()}
        >
          Delete All
        </Button>
      </div>
    </div>
  );
}

export default Card;
