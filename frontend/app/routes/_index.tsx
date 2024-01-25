import axios from "axios";
import { TbInboxOff } from "react-icons/tb";
import { HiChevronUp } from "react-icons/hi";
import type { MetaFunction } from "@remix-run/node";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRef, useState, useEffect, Fragment } from "react";

import { Content } from "~/types";
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
  const [data, setData] = useState<Content[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/texts?page=${page}`
      );
      console.log(response.data);

      // Boolean must be applied or 0 is shown.
      setHasMore(Boolean(response.data.length));
      setData((prevValue) =>
        response.data.length ? [...prevValue, ...response.data] : prevValue
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <Fragment>
      <main className="container max-w-lg mx-auto py-8 px-4">
        <section id="entries">
          <div className="pb-4 border-b border-gray-200 mb-4">
            <h1 className="font-medium text-lg">Personal log</h1>
            <p className="text-xs text-gray-600">
              My thoughts broadcasted to the world straight from my phone.
            </p>
          </div>
        </section>

        <section
          id="scrollableDiv"
          ref={containerRef}
          className="overflow-y-auto h-screen scroll-smooth"
        >
          {data.length ? (
            <InfiniteScroll
              hasMore={hasMore}
              className="space-y-4"
              dataLength={data.length}
              loader={<LoadingIcon />}
              scrollableTarget="scrollableDiv"
              next={() => setPage((prevPage) => prevPage + 1)}
              endMessage={
                <button
                  className="w-full py-4 flex items-center justify-center group rounded-xl"
                  onClick={() => {
                    const container = containerRef.current;
                    if (container) container.scrollTo(0, 0);
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
          ) : (
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center">
              <TbInboxOff size={20} className="text-gray-500 mb-2" />
              <p className="text-sm text-gray-500">
                You're early! Wait for new content!
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="fixed bottom-0 w-full px-4">
        <div className="container max-w-lg mx-auto border-t backdrop-blur-sm bg-white/80 border-gray-200 pt-4 pb-8 px-2 text-sm text-gray-400">
          <p className="text-gray-400">
            Powered by the Twilio API. Built with Remix, React, Koa.js, and
            SQLite.
          </p>
        </div>
      </footer>
    </Fragment>
  );
}
