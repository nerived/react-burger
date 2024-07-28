import styles from "./FeedImage.module.css";

type FeedImageProps = {
  src: string;
};

export const FeedImage = ({ src }: FeedImageProps) => {
  return (
    <div className={styles.imgBox}>
      <div className={styles.inner}>
        <img src={src} alt="" />
      </div>
    </div>
  );
};

export default FeedImage;
