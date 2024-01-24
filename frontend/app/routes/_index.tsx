import axios from "axios";
import { Text } from "~/types";
import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect, Fragment } from "react";
import Entry from "~/components/entry";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [data, setData] = useState<Text[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/texts");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <main className="container max-w-lg mx-auto py-8 px-4">
        {/* <section id="heading" className="mb-4 flex items-center space-x-3">
          <div className="bg-gray-50 p-2 border border-gray-200 rounded-xl shadow-sm">
            <FoodIcon size={68} />
          </div>
          <div>
            <h1 className="font-medium text-lg">CenterBite</h1>
            <p className="text-xs text-gray-600">
              Find the midpoint of a set of addresses and receive
              recommendations on restaurants in that area. The shaded, blue area
              is the area reachable in 35 minutes of driving.
            </p>
          </div>
        </section> */}

        <section id="entries">
          <div className="pb-4 border-b border-gray-200 mb-4">
            <h1 className="font-medium text-lg">Personal log</h1>
            <p className="text-xs text-gray-600">
              Any and all thoughts logged straight from my phone.
            </p>
          </div>

          {data && (
            <div className="space-y-4">
              {data.map((content) => (
                <Entry key={content.id} content={content} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="fixed bottom-0 w-full px-4">
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
