import styles from "./lazyImage.module.scss";
import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

export default function LazyImage({ src, alt }) {
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = src;
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px" }
    );
    io.observe(imageRef.current);
  }, []);

  return (
    <div className={styles["lazy-image"]}>
      {loading ? <Spinner className={styles["lazy-image__spinner"]} /> : null}

      <img
        className={styles["lazy-image__image"]}
        alt={alt}
        ref={imageRef}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
