import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getList,
  deleteItem,
  selectCount,
  addItem,
  editList,
} from "./Redux/reduxSlice";
import styles from "./Todo.module.css";

export function FormSubmit() {
  const { TodoList, status, error } = useSelector(selectCount);
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState("");
  const [toggle, setToggle] = useState(null);
  const [modelInputField, setModelInputField] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = () => {
    dispatch(getList());
  };

  const deleteTodoItem = (id) => {
    dispatch(deleteItem(id));
  };

  const changeInputText = (e) => {
    setTodoText(e.target.value);
  };

  const addTodoItem = () => {
    if (todoText) {
      dispatch(
        addItem({
          userId: 5,
          id: TodoList.length + 1,
          title: todoText,
          body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor, ea amet voluptatibus facilis saepe repellat ducimus veritatis, in doloribus, voluptate beatae nam id dignissimos! Asperiores vitae reprehenderit accusamus ut labore",
        })
      );
      setTodoText("");
    }
  };

  const changeModelText = (event) => {
    setModelInputField({
      ...modelInputField,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitModel = (e) => {
    e.preventDefault();
    dispatch(
      editList({ toggle, modelInputField })
    );
    setToggle(null);
  };

  const editToggle = (num, item) => {
    setToggle(num);
    setModelInputField(item);
  };

  if (status == "loading") {
    return <h1>Loading...</h1>;
  }
  if (status === "failed") return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Write Todo Title ..."
        value={todoText}
        onChange={changeInputText}
      />{" "}
      &nbsp;
      <button onClick={addTodoItem}>Add</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {TodoList.map((item, i) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td className={styles.columnGap}>
                <button onClick={() => deleteTodoItem(item.id)}>Delete</button>
                <button onClick={() => editToggle(i, item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {toggle && (
        <div
          style={{
            backgroundColor: "grey",
            width: "500px",
            height: "250px",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h2>Todo Model</h2>
          <form onSubmit={handleSubmitModel}>
            <div>
              <label htmlFor="title">Title</label> &nbsp; &nbsp;
              <input
                type="text"
                id="title"
                value={modelInputField.title}
                name="title"
                onChange={changeModelText}
              />
            </div>
            <br />
            <div>
              <label htmlFor="title">Body</label> &nbsp; &nbsp;
              <input
                type="text"
                id="title"
                value={modelInputField.body}
                name="body"
                onChange={changeModelText}
              />
            </div>
            <br />
            <input type="submit" value={"Submit"} />
          </form>
        </div>
      )}
    </div>
  );
}
