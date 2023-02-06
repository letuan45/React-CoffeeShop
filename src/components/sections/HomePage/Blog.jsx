import React, { useState, useEffect } from "react";
import useHttp from "../../../hooks/use-http";

import BlogItem from "../../Blogs/BlogItem";
import GreenWhiteButtonLg from "../../UI/Button/GreenWhiteButtonLg";
import classes from "./Blog.module.css";

const Blog = () => {
  const baseURL =
    "https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/News.json";
  const [news, setNews] = useState([]);

  const { erorr: newsError, fetchHandler: fetchNews } = useHttp();

  useEffect(() => {
    fetchNews({ url: baseURL }, (data) => {
      const newsData = [];
      for (const index in data) {
        newsData.push({
          id: index,
          title: data[index].title,
          image: data[index].image,
          type: data[index].type,
          link: data[index].link,
          date: new Date(...data[index].date.split("/")),
          numberOfComments: data[index].numberOfComments,
          views: data[index].views,
        });
        if (newsData.length === 4) break;
      }
      setNews(newsData);
    });
  }, [fetchNews]);

  let content;

  if (!newsError && news && news.length > 0) {
    content = news.map((item) => <BlogItem item={item} key={item.id} />);
  } else if (newsError) {
    content = <p>{newsError}</p>;
  } else if (!newsError && news.length === 0) {
    content = <p>WE STILL HAVE NO BLOGS !</p>;
  }

  return (
    <section className="blog">
      <div className="container" style={{ padding: "100px 0" }}>
        <div className={classes["main-title"]}>
          <span>Our blog</span>
          <h2>Recent Articles</h2>
        </div>
        <div style={{ width: "100%" ,overflow: "hidden" }}>
          <div className="row">{content}</div>
        </div>
        <div className={classes["button-group"]}>
          <GreenWhiteButtonLg to="/blog">Read more</GreenWhiteButtonLg>
        </div>
      </div>
    </section>
  );
};

export default Blog;
