import React, { useEffect, useState } from "react";
import styles from "./CSS/gallery.module.css";
import { IMAGES_NAMES } from "../../constants/imagesSrc";
import { pathToImage } from "../../helpers/pathToImage";
import Modal from "../modal";
import useLocalStorage from "../../hooks/useLocalStorage";

export function Gallery() {
  const [localRemoved, setLocalRemoved] = useLocalStorage("removed", []);
  const [imagesSrc, setImagesSrc] = useState([]);
  const [removedImages, setRemovedImages] = useState(localRemoved);

  useEffect(() => {
    let arr = [];
    IMAGES_NAMES.map((name) => {
      const path = pathToImage(name);
      !localRemoved.includes(path) && arr.push(pathToImage(name));
    });
    setImagesSrc(arr);
  }, []);

  const reestablish = () => {
    setImagesSrc([...imagesSrc, ...localRemoved]);
  };

  const [chosenImage, setChosenImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span>Images counter: {imagesSrc.length}</span>

      <div
        className={styles.galleryContainer}
        onClick={(e) => {
          if (e.target.tagName === "IMG") {
            setChosenImage(e.target.src);
            setShowModal(true);
          }
        }}
      >
        {imagesSrc.map((src, idx) => {
          return (
            <div className={styles.item} key={idx}>
              <img src={src} alt="" />
              <div className={styles.removeContainer}>
                <button
                  onClick={() => {
                    setRemovedImages([...removedImages, src]);
                    setLocalRemoved([...localRemoved, src]);
                    const newList = imagesSrc.filter(
                      (imageSrc) => imageSrc !== src
                    );
                    setImagesSrc(newList);
                  }}
                >
                  Click me to remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {removedImages.length > 0 && (
        <div className={styles.reestablishBtnContainer}>
          <button
            onClick={() => {
              reestablish();
              setLocalRemoved([]);
              setRemovedImages([]);
            }}
          >
            Reestablish
          </button>
        </div>
      )}
      {showModal && <Modal callback={setShowModal} imageSrc={chosenImage} />}
    </>
  );
}
