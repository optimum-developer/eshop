import { useEffect, useState } from "react";

const useCart = (todoId) => {
  const [jsonData, setJsonData] = useState();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .then((response) => response.json())
      .then((json) => setJsonData(json));
  }, []);
  return jsonData;
};
export default useCart;
