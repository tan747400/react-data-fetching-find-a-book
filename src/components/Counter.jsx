import React, { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  // useEffect รันทุกครั้งที่ count เปลี่ยน
  useEffect(() => {
    console.log("Count เปลี่ยนเป็น:", count);
    document.title = `Count: ${count}`; // เปลี่ยน title ของหน้าเว็บตาม count
  }, [count]); // dependency array = [count]

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Counter App</h1>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: "10px" }}>
        +1
      </button>
      <button onClick={() => setCount(count - 1)}>
        -1
      </button>
    </div>
  );
}
