"use client";
import { Minus, Plus } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";

const ListInput = ({
  placeholder,
  type = "text",
  listState,
}: {
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  listState: [string[], Dispatch<SetStateAction<string[]>>];
}) => {
  const [List, setList] = listState;

  return (
    <div>
      <div className="flex flex-col gap-1">
        {/* <HightlightElement setHightlights={setHightlights} hightlights={hightlights} index={0} /> */}
        {List.map((highlight, index) => (
          <ListInputElement
            setList={setList}
            key={index}
            List={List}
            index={index}
            placeholder={placeholder}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

const ListInputElement = ({
  setList,
  List,
  index,
  placeholder,
  type = "text",
}: {
  setList: React.Dispatch<React.SetStateAction<string[]>>;
  List: string[];
  index: number;
  placeholder: string;
  type: HTMLInputTypeAttribute;
}) => {
  return (
    <div className="flex gap-2">
      <input
        className="rounded-lg border-2 p-2 outline-none focus:border-blue-600"
        type={type}
        name="hightlight"
        placeholder={placeholder}
        value={List[index]}
        onChange={(event) => {
          setList((prev) => {
            const newList = [...prev];
            newList[index] = event.target.value;
            return newList;
          });
        }}
      />
      <button
        className="rounded-lg border bg-slate-300 p-3"
        onClick={() => {
          if (index + 1 === List?.length) {
            setList((prev) => [...prev, ""]);
            return;
          }
          const newList = [...List];
          newList.splice(index, 1);
          console.log(newList);
          setList(newList);
        }}
        type="button"
      >
        {index + 1 === List.length ? <Plus size={16} /> : <Minus size={16} />}
      </button>
    </div>
  );
};

export { ListInput };
