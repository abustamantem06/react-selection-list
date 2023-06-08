import "./App.css";
import useMockData from "./hooks/useMockData";
import SelectionList from "./components/SelectionList.jsx";
import { useState } from "react";

function App() {
    const [isSingleSelection, setSingleSelection] = useState(false);
    const items = useMockData();

    const handleAccept = (ids) => console.log(`Accepting id: ${ids}`);
    const handleReject = (ids) => console.log(`Rejecting id: ${ids}`);

    return (
        <>
            <SelectionList
                isSingleSelection={isSingleSelection}
            >
                <SelectionList.InputSearch />
                <SelectionList.List>
                    {items.map((c) => (
                        <SelectionList.Item key={c.id} value={c.id} text={c.name} />
                    ))}
                </SelectionList.List>
                <section>
                    <SelectionList.SubmitButton text="Confirm" onSubmit={handleAccept}/>
                    <SelectionList.SubmitButton text="Reject" onSubmit={handleReject}/>
                </section>
            </SelectionList>
            <button onClick={() => setSingleSelection((prev) => !prev)}>
                toggle selection
            </button>
        </>
    );
}

export default App;
