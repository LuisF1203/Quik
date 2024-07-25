import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { RiFontColor } from "react-icons/ri";
import { IoColorFillOutline } from "react-icons/io5";
import { AiOutlineFontSize } from "react-icons/ai";
import {
  CiTrash,
  CiPlay1,
  CiPause1,
  CiCircleChevLeft,
  CiCircleChevRight,
} from "react-icons/ci";

const fonts = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Impact",
  "Times New Roman",
  "Didot",
  "Georgia",
  "American Typewriter",
  "Courier",
  "Courier New",
  "Brush Script MT",
  "Comic Sans MS",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Palatino Linotype",
  "Garamond",
  "Book Antiqua",
  "Arial Narrow",
  "Century Gothic",
  "Lucida Bright",
  "Lucida Handwriting",
  "Copperplate",
  "Papyrus",
  "Gill Sans",
  "Optima",
  "Candara",
  "Perpetua",
  "Charcoal",
  "Monaco",
  "Brush Script MT",
  "Chalkboard",
  "Chalkboard SE",
  "Hoefler Text",
  "Gill Sans MT",
  "Marker Felt",
  "Arial Rounded MT Bold",
];

function EditItem({
  handleLessSpeed,
  handleMoreSpeed,
  handlePlay,
  handleFontSize,
  handleColor,
  handleFont,
  handleBg,
  handleDeleteItem,
  item,
  animationDuration,
}) {
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [textColor, setTextColor] = useState(item.color);
  const [backgroundColor, setBackgroundColor] = useState(item.bg);
  const [selectedFont, setSelectedFont] = useState(item.font || fonts[0]);
  const [actualFontSize, setActualFontSize] = useState(item.fontSize);
  const [play, setPlaying] = useState(item.play);
  const [speed, setSpeed] = useState(item.duration);

  useEffect(() => {
    setTextColor(item.color);
    setBackgroundColor(item.bg);
    setSelectedFont(item.font || fonts[0]);
    setActualFontSize(item.fontSize);
    setSpeed(item.duration);
    setPlaying(item.play);
  }, [item]);

  const handleDeleteClick = () => {
    handleDeleteItem(item.id);
  };

  const handleBgClick = (color) => {
    setBackgroundColor(color.hex);
    handleBg(color.hex);
  };

  const handleColorClick = (color) => {
    setTextColor(color.hex);
    handleColor(color.hex);
  };

  const handleFontClick = (font) => {
    setSelectedFont(font);
    handleFont(font);
  };

  const handleFontSizeChange = (event) => {
    handleFontSize(event.target.value);
    setActualFontSize(event.target.value);
  };

  const handlePlayClick = () => {
    setPlaying(!play);
    handlePlay(!play);
  };

  const handleMoreSpeedClick = () => {
    const newSpeed = speed - 1;
    speed > 1 && setSpeed(newSpeed), handleLessSpeed(newSpeed);
  };

  const handleLessSpeedClick = () => {
    const newSpeed = speed + 1;
    setSpeed(newSpeed);
    handleMoreSpeed(newSpeed);
  };

  return (
    <div className="fixed bg-white p-2 rounded-lg shadow-x z-10 border">
      <ul>
        <li
          className="cursor-pointer transition hover:scale-110 min-w-40 hover:bg-slate-50 pl-2 flex p-2 opacity-60 hover:opacity-100 relative group"
          onMouseEnter={() => setShowTextColorPicker(true)}
          onMouseLeave={() => setShowTextColorPicker(false)}
        >
          <RiFontColor className="mt-auto mb-auto" />
          <span className="pl-2 mt-auto mb-auto">Text color</span>
          {showTextColorPicker && (
            <div className="absolute left-full top-0 bg-white shadow-lg rounded-lg z-10">
              <SketchPicker
                color={textColor}
                onChangeComplete={handleColorClick}
              />
            </div>
          )}
        </li>
        <li
          className="cursor-pointer transition hover:scale-110 min-w-40 hover:bg-slate-50 pl-2 flex p-2 opacity-60 hover:opacity-100 relative group"
          onMouseEnter={() => setShowBackgroundColorPicker(true)}
          onMouseLeave={() => setShowBackgroundColorPicker(false)}
        >
          <IoColorFillOutline className="mt-auto mb-auto" />
          <span className="pl-2 mt-auto mb-auto">Background color</span>
          {showBackgroundColorPicker && (
            <div className="absolute left-full top-0 bg-white shadow-lg rounded-lg z-10">
              <SketchPicker
                color={backgroundColor}
                onChangeComplete={handleBgClick}
              />
            </div>
          )}
        </li>
        <li
          className="cursor-pointer transition hover:scale-110 min-w-40 hover:bg-slate-50 pl-2 flex p-2 opacity-60 hover:opacity-100 relative group"
          onMouseEnter={() => setShowFontPicker(true)}
          onMouseLeave={() => setShowFontPicker(false)}
        >
          <AiOutlineFontSize className="mt-auto mb-auto" />
          <span className="pl-2 mt-auto mb-auto">Font</span>
          {showFontPicker && (
            <div className="absolute left-full top-0 bg-white shadow-lg rounded-lg z-10 overflow-y-scroll h-52">
              <ul>
                <div className="p-2 border-b">
                  <p className="text-center text-xs">{actualFontSize}/500</p>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    value={actualFontSize}
                    onChange={handleFontSizeChange}
                  />
                </div>

                {fonts.map((font) => (
                  <li
                    key={font}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    style={{ fontFamily: font }}
                    onClick={() => handleFontClick(font)}
                  >
                    {font}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
        <li>
          <div className={`${play ? "flex justify-center" : ""}`}>
            <span
              className={`text-center text-xs bg-red-500 rounded-full ${
                play
                  ? "animate-spin w-40 h-40 text-2xl font-bold"
                  : "w-8 h-8 opacity-50 grayscale ml-2"
              } transition cursor-default text-white flex items-center justify-center`}
            >
              {speed}s
            </span>
          </div>

          <div className="flex justify-between p-5">
            <button
              onClick={handleLessSpeedClick}
              className="cursor-pointer transition hover:scale-110 hover:shadow-2xl opacity-60 hover:opacity-100"
            >
              <CiCircleChevLeft />
            </button>
            <button
              onClick={handlePlayClick}
              className="relative cursor-pointer transition hover:scale-110 hover:shadow-2xl opacity-60 hover:opacity-100"
            >
              <span className="relative z-10">
                {play ? <CiPause1 /> : <CiPlay1 />}
              </span>
            </button>
            <button
              onClick={handleMoreSpeedClick}
              className="cursor-pointer transition hover:scale-110 hover:shadow-2xl opacity-60 hover:opacity-100"
            >
              <CiCircleChevRight />
            </button>
          </div>
        </li>
        <li
          className={`border-t border-red-600 text-red-600 cursor-pointer transition hover:scale-110 min-w-40 hover:bg-slate-50 pl-2 flex p-2 opacity-60 hover:opacity-100 relative`}
          onClick={handleDeleteClick}
        >
          <CiTrash className="mt-auto mb-auto" />
          <span className="pl-2 mt-auto mb-auto">Delete item</span>
        </li>
      </ul>
    </div>
  );
}

export default EditItem;
