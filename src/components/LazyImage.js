import styles from "./lazyImage.module.scss";
import { useEffect, useRef } from "react";

export default function LazyImage({ src, alt }) {
  const imageRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = src;
        }
      });
    });
    io.observe(imageRef.current);
  }, []);
  return <img className={styles.image} alt={alt} ref={imageRef}></img>;
}
