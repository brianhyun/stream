import axios from "axios";
import { HiChevronUp } from "react-icons/hi";
import type { MetaFunction } from "@remix-run/node";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRef, useState, useEffect, Fragment } from "react";

import { Text } from "~/types";
import Entry from "~/components/entry";
import LoadingIcon from "~/components/loading-icon";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Text[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/texts?page=${page}`
      );
      console.log(response.data);

      setHasMore(response.data.length);
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
              My thoughs broadcasted to world straight from my phone. No social
              media account required. Yup, Twitter and Threads, I'm talking to
              you. Just a simple internet connection is required.
            </p>
          </div>
        </section>

        <section
          id="entries"
          ref={containerRef}
          className="overflow-y-auto h-96 scroll-smooth"
        >
          <InfiniteScroll
            next={fetchData}
            hasMore={hasMore}
            className="space-y-4"
            dataLength={data.length}
            loader={<LoadingIcon />}
            endMessage={
              <button
                className="w-full py-4 flex items-center justify-center group rounded-lg"
                onClick={() => {
                  const container = containerRef.current;

                  if (container) {
                    container.scrollTo(0, 0);
                  }
                }}
              >
                <HiChevronUp
                  size={20}
                  className="text-gray-500 group-hover:text-gray-600 mr-1"
                />
                <p className="text-xs uppercase font-bold text-gray-500 group-hover:text-gray-600 tracking-wide">
                  Back to top
                </p>
              </button>
            }
          >
            {data.map((content) => (
              <Entry key={content.id} content={content} />
            ))}
          </InfiniteScroll>
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
