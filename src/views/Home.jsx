import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import jsPDF from "jspdf";
import { MdOutlineEdit } from "react-icons/md";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { EditItem, Layout } from "../components/";
import { MdDragHandle } from "react-icons/md";

const initialItems = [
  {
    id: "1",
    content: "Item 1",
    width: 200,
    height: 50,
    color: "#fff",
    bg: "#AC4C4C",
    font: "verdana",
    play: false,
    fontSize: "100",
    duration: 7,
  },
  {
    id: "2",
    content: "Item 2",
    width: 200,
    height: 50,
    color: "#fff",
    bg: "#AC4C4C",
    font: "arial",
    play: false,
    fontSize: "100",
    duration: 7,
  },
  {
    id: "3",
    content: "Item 3",
    width: 200,
    height: 50,
    color: "#fff",
    bg: "#AC4C4C",
    font: "arial",
    play: false,
    fontSize: "100",
    duration: 7,
  },
];

function Home() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(initialItems);
  const [editItemVisible, setEditItemVisible] = useState(false);
  const [editItemPosition, setEditItemPosition] = useState({ top: 0, left: 0 });
  const [currentItem, setCurrentItem] = useState(null);
  const [isPinging, setIsPinging] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(7);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, user: "user" }]);
      setInputValue("");
    }
  };
  useEffect(() => {
    items.forEach((item) => {
      const input = document.getElementById("item-input" + item.id);
      const element = document.getElementById("item-" + item.id);
      element.style.background = item.bg;
      element.style.color = item.color;
      input.style.overflow = "hidden";
      input.style.fontFamily = item.font;
      input.style.fontSize = item.fontSize + "%";

      // Establece el ancho al valor necesario para mostrar todo el contenido
      input.style.width = input.scrollWidth + "px";

      console.log(item);
      if (item.play) {
        input.style.transition = item.duration + "s";
        console.log(item);
        input.style.marginLeft = "-" + input.scrollWidth + "px";
      } else {
        input.style.marginLeft = "0%";
        input.style.transition = "0s";
      }
    });
  }, [items]);

  const handleMoreSpeed = () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === currentItem.id
          ? { ...item, duration: item.duration + 1 }
          : item
      )
    );
  };
  const handleLessSpeed = () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.duration > 0 && item.id === currentItem.id
          ? { ...item, duration: item.duration - 1 }
          : item
      )
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  const handleResize = (index, size) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      width: size.width,
      height: size.height,
    };
    setItems(newItems);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    items.forEach((item, index) => {
      doc.setFontSize(12); // Set font size
      doc.setTextColor(0, 0, 255); // Set text color
      doc.setFillColor(200, 220, 255); // Set background color
      doc.rect(10, 10 + index * 20, item.width / 2, item.height / 2, "F"); // Draw rectangle with background
      doc.text(item.content, 10, 10 + index * 20 + 10); // Draw text
      doc.setDrawColor(0, 0, 0); // Set border color
      doc.rect(10, 10 + index * 20, item.width / 2, item.height / 2); // Draw border
    });
    doc.save("download.pdf");
  };

  const handleEditHover = (item, event) => {
    const rect = event.target.getBoundingClientRect();
    console.log(rect);
    setCurrentItem(item); // Set the current item
    setEditItemPosition({
      top: rect.top,
      left: rect.left + rect.width,
    });
    setEditItemVisible(true);
    console.log(item);
  };

  const handleDeleteItem = (itemId) => {
    // setIsPinging(true);
    setItems(items.filter((item) => item.id !== itemId));
    setEditItemVisible(false);
    // setTimeout(() => {
    // setIsPinging(false);

    // Aquí puedes agregar la lógica para eliminar el ítem si es necesario
    // }, 1000);  Duración de la animación "ping"
  };

  const handleBg = (color) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === currentItem.id ? { ...item, bg: color } : item
      )
    );
  };

  const handleColor = (color) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === currentItem.id ? { ...item, color: color } : item
      )
    );
  };
  const handleFontSize = (size) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === currentItem.id ? { ...item, fontSize: size } : item
      )
    );
  };

  const handleFont = (font) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === currentItem.id ? { ...item, font: font } : item
      )
    );
  };

  const handlePlay = (value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === currentItem.id ? { ...item, play: value } : item
      )
    );
  };

  return (
    <Layout>
      <style>
        {`
                        @keyframes changeBackground {
                            0% { background-color: red; }
                            50% { background-color: blue; }
                            100% { background-color: red; }
                        }
                        .animated-item {
                            animation: changeBackground 5s infinite;
                            width: 100px;
                            height: 100px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    `}
      </style>

      {editItemVisible && (
        <div
          className={` `}
          onMouseLeave={() => setEditItemVisible(false)}
          onMouseEnter={() => setEditItemVisible(true)}
          style={{
            position: "absolute",
            top: editItemPosition.top,
            left: editItemPosition.left,
          }}
        >
          <EditItem
            handleLessSpeed={handleLessSpeed}
            handleMoreSpeed={handleMoreSpeed}
            handlePlay={handlePlay}
            handleFontSize={handleFontSize}
            handleColor={handleColor}
            handleFont={handleFont}
            handleBg={handleBg}
            handleDeleteItem={handleDeleteItem}
            animationDuration={animationDuration}
            items={items}
            item={currentItem}
          />
        </div>
      )}

      <div className="flex items-center justify-center h-screen">
        <div className="container mx-auto shadow-lg rounded-lg bg-white flex flex-row h-[95vh] w-full">
          <div className="flex flex-col flex-1 p-4">
            <div className="flex-1 overflow-y-auto" id="messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.user === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.user === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4">
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="text"
                  id="inputMessage"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
          <div className="w-2/3 bg-gray-100 rounded-lg p-4 ">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="p-4 border border-gray-200 rounded-lg h-full overflow-y-auto flex flex-col overflow-x-hidden" // Asegúrate de que ocupe todo el espacio disponible
                    style={{ minHeight: "500px" }} // Ajusta el mínimo alto para que se pueda soltar en cualquier parte
                  >
                    {items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <ResizableBox
                            width={item.width}
                            height={item.height}
                            minConstraints={[100, 50]}
                            maxConstraints={[800, 300]}
                            onResizeStop={(e, data) =>
                              handleResize(index, data.size)
                            }
                          >
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              // style={{
                              // background:`${item.bg}`
                              // }}
                              id={`item-` + item.id}
                              className={`mb-2 border border-gray-300 rounded-lg flex justify-between h-full overflow-x-auto`}
                            >
                              <button
                                className="p-2 opacity-10 hover:opacity-100 transition absolute"
                                onMouseLeave={() => setEditItemVisible(false)}
                                onMouseEnter={(e) => handleEditHover(item, e)}
                              >
                                <MdOutlineEdit />
                              </button>
                              <input
                                style={{
                                  color: `${item.color}`,
                                }}
                                id={`item-input` + item.id}
                                type="text"
                                placeholder={item.content}
                                className="outline-none w-full bg-transparent"
                              />

                              <div className="m-auto bg-white absolute bottom-0 left-0 right-0 flex opacity-50 hover:opacity-100 transition border">
                                <MdDragHandle className="m-auto text-black" />
                              </div>
                            </div>
                          </ResizableBox>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
