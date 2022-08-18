import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const People = () => {
  const [page, setPage] = useState(1);

  const fetchPlanets = async ({ queryKey }) => {
    const res = await fetch("http://swapi.dev/api/people/");
    return res.json();
  };

  const { data, status, isSuccess } = useQuery(
    ["planets", page],
    fetchPlanets,
    { keepPreviousData: true }
  );
  return (
    <div>
      <h2>People</h2>
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
            {data?.results?.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
