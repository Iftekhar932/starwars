import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const Planets = () => {
  const [page, setPage] = useState(1);

  const fetchPlanets = async ({ queryKey }) => {
    const res = await fetch(
      `http://swapi.dev/api/planets/?page=${queryKey[1]}`
    );
    return res.json();
  };

  const { data, status, isSuccess } = useQuery(
    ["planets", page],
    fetchPlanets,
    { keepPreviousData: true }
  );
  return (
    <div>
      <h2>Planets</h2>
      <button
        onClick={() => setPage(page - 1)}
        disabled={!isSuccess || data?.previous === null}
      >
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        disabled={!isSuccess || data?.next === null || undefined}
      >
        Next
      </button>
      {status === "error" && <div>🔴Error fetching data🔴</div>}
      {status === "loading" && <div>Loading</div>}
      {status === "success" && (
        <>
          <div>
            {data?.results?.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
