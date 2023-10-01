import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getData } from "../helpers";

export const YoutubeContext = createContext();

// context'teki verileri bütün uygulamaya sağlar
export const YoutubeProvider = ({ children }) => {
  const [selected, setSelected] = useState({
    name: "Home",
    type: "home",
  });

  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);

    if (selected.type === "home") {
      // anasayfa videoları
      getData("/home/").then((data) => setVideos(data.contents));
    } else {
      // kategori videoları
      getData(`/search/?q=${selected.name.toLowerCase()}`).then((data) =>
        setVideos(data.contents)
      );
    }
  }, [selected]);

  return (
    <YoutubeContext.Provider value={{ selected, setSelected, videos }}>
      {children}
    </YoutubeContext.Provider>
  );
};
