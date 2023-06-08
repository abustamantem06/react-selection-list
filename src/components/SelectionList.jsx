import {createContext, useContext, useEffect, useState} from "react";
import {v4} from "uuid";

const SelectionListContext = createContext(null);

const useSelectionListContext = () => useContext(SelectionListContext);

const SelectionList = ({
                           children,
                           isSingleSelection = false,
                       }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const uuid = v4();
    const [searchText, setSearchText] = useState("");
    useEffect(() => setSelectedIds([]), [isSingleSelection]);

    const handleSelectionId = (id) => {
        // NOTE: if we need to support forced selections we can merge selections here
        if (isSingleSelection) {
            setSelectedIds([id]);
            return;
        }

        setSelectedIds((prev) => {
            let hadSelection = false;

            // went for reducer since might need to filter or add and saw this as the best approach
            const newSelections = prev.reduce((acc, curr) => {
                if (curr === id) {
                    hadSelection = true;
                    return acc;
                }

                acc.push(curr);
                return acc;
            }, []);
            return hadSelection ? newSelections : [...newSelections, id];
        });
    };

    const resetSelectedIds = () => setSelectedIds([]);

    return (
        <SelectionListContext.Provider
            value={{
                contextId: uuid,
                selectedIds,
                isSingleSelection,
                searchText,
                setSearchText,
                resetSelectedIds,
                addSelection: handleSelectionId,
            }}
        >
            <div className="selection-list">{children}</div>
        </SelectionListContext.Provider>
    );
};

const List = (props) => {
    return <ul className="selection-list__options">{props.children}</ul>;
};

const Item = ({value, text}) => {
    const {
        contextId,
        addSelection,
        selectedIds,
        isSingleSelection,
        searchText,
    } = useSelectionListContext();
    const isSelected = !!selectedIds.find((selection) => selection === value);

    const shouldRender = text.includes(searchText);

    return shouldRender ? (
        <li className="selection-list__option" onClick={() => addSelection(value)}>
            <input
                type={isSingleSelection ? "radio" : "checkbox"}
                name={contextId}
                value={value}
                checked={isSelected}
                readOnly
            />
            {text}
        </li>
    ) : null;
};

const SubmitButton = ({text, onSubmit, shouldKeepSelections}) => {
    const {selectedIds, resetSelectedIds} = useSelectionListContext()
    const handleSubmit = () => {
        onSubmit(selectedIds);
        if (!shouldKeepSelections) {
            resetSelectedIds()
        }
    }
    return (
        <button onClick={handleSubmit} disabled={!selectedIds?.length}>
            {" "}
            {text}{" "}
        </button>
    );
}

const InputSearch = () => {
    const {setSearchText: setContextSearchText} = useSelectionListContext();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => setContextSearchText(searchText), 250);
        return () => {
            clearTimeout(timeout);
        };
    }, [searchText]);

    return (
        <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />
    );
};

SelectionList.List = List;
SelectionList.Item = Item;
SelectionList.InputSearch = InputSearch;
SelectionList.SubmitButton = SubmitButton;
export default SelectionList;
