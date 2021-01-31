import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
function App() {
  const [open, setopen] = useState(false);
  const [listName, setListName] = useState("");
  const [cardList, setCardList] = useState([]);
  const handleClose = () => {
    setopen(false);
  };
  const createNewList = () => {
    const localCard = [...cardList, { cardTitle: listName, items: [] }];
    setCardList(localCard);
    localStorage.setItem("cards", JSON.stringify(localCard));
    setListName("");
    handleClose();
  };
  const deleteAllCards = () => {
    setCardList([]);
    localStorage.setItem("cards", JSON.stringify([]));
  };

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem("cards"));
    if (cards) setCardList(cards);
  }, []);
  const deleteCard = (index) => {
    const list = cardList.filter((_, i) => i !== index);
    setCardList(list);
    localStorage.setItem("cards", JSON.stringify(list));
  };

  return (
    <div className="app">
      <div className="app__buttons">
        <Button
          className="app__button"
          variant="contained"
          color="secondary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setopen(true)}
        >
          New List
        </Button>
        {cardList.length > 0 && (
          <Button
            className="app__button"
            variant="contained"
            color="secondary"
            startIcon={<DeleteForeverIcon />}
            onClick={() => deleteAllCards()}
          >
            Delete All
          </Button>
        )}
      </div>

      {cardList.map((card, i) => (
        <Card info={card} key={i} index={i} deleteCard={deleteCard} />
      ))}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type the name of your new To Do List
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="List name..."
            type="text"
            fullWidth
            autoComplete="off"
            inputProps={{ maxLength: 10 }}
            onChange={(e) => setListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={listName !== "" ? false : true}
            onClick={() => (listName !== "" ? createNewList() : handleClose())}
            color="primary"
          >
            Create!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
