import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets", page], fetchPlanets);
  const fetchPlanets = async (key, page) => {
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    console.log("✨ 🌟 ~ page", page);
    return res.json();
  };

  return (
    <div>
      <h2>Planets</h2>
      <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(2)}>Page 2</button>
      <button onClick={() => setPage(3)}>Page 3</button>
      {status === "error" && <div>🔴Error fetching data🔴</div>}
      {status === "loading" && <div>Loading</div>}
      {status === "success" && (
        <div>
          {data?.results?.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
