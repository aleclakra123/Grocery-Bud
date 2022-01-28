import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({id, itemName, editItem, deleteItem}) => {
  return (
    <article className="grocery-item" key={id}>
      <p className="title">{itemName}</p>
      <div className="btn-container">
        <button type="button" className="edit-btn" onClick={()=>{editItem(id, itemName)}}>
          <FaEdit />
        </button>
        <button type="button" className="delete-btn" onClick={()=>{deleteItem(id)}}>
          <FaTrash />
        </button>
      </div>
    </article>
  )
}

export default List
