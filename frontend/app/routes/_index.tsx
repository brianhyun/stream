import axios from "axios";
import type { MetaFunction } from "@remix-run/node";
import { useRef, useState, useEffect, Fragment } from "react";

import { Text } from "~/types";
import Entry from "~/components/entry";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Text[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/texts?page=${page}`
      );

      console.log(response.data);

      setData((prevValue) => [...prevValue, ...response.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = () => {
    const container = containerRef.current;

    if (
      container &&
      container.scrollHeight - container.scrollTop === container.clientHeight
    )
      setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  return (
    <Fragment>
      <main className="container max-w-lg mx-auto py-8 px-4">
        <section id="entries">
          <div className="pb-4 border-b border-gray-200 mb-4">
            <h1 className="font-medium text-lg">Personal log</h1>
            <p className="text-xs text-gray-600">
              Any and all thoughts logged straight from my phone.
            </p>
          </div>
        </section>

        <section
          id="entries"
          ref={containerRef}
          className="overflow-y-auto h-96	space-y-4"
        >
          {data && data.length
            ? data.map((content) => (
                <Entry key={content.id} content={content} />
              ))
            : "No data"}
        </section>
      </main>

      <footer className="w-full px-4">
        <div className="container max-w-lg mx-auto border-t backdrop-blur-sm bg-white/30 border-gray-200 pt-4 pb-8 px-2 text-sm text-gray-400">
          <p>
            Powered by the Twilio API. Built with Remix, React, Koa.js, and
            SQLite.
          </p>
        </div>
      </footer>
    </Fragment>
  );
}
