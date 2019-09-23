import React, {useState} from 'react';

function Hooks(){
    // [*Getter_and_Setter] - No React o Hooks pode 
    // ser usado como Get/Set
    const [count, setCount] = useState(0);

    return(
        <div>
            <h2>Hooks</h2>
            <p>Você clicou {count} vezes</p>
            <button onClick={() => setCount(count + 1)}>
                Incrementa Hook->count
            </button>
      </div>
    )
}
export default Hooks;
