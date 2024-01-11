import React from "react"
import { useDispatch } from "react-redux"
import { ReactComponent as CloseIcon } from "../icons/close.svg"

const StoriesModal = ({ stories, active, story, close, selectStory }) => {
    const dispatch = useDispatch()

    const setElementWidth = () => {
      const elementWidth = 100 / stories.length;
      return { width: `${elementWidth}%` };
    };

    return (
        <div className="stories-modal">
            <div className="stories-wrap">
              <div
                  onClick={close}
                  className="stories-modal-close"
              >
                <CloseIcon />
              </div>
              <div className="stories-container-buttons">
                {stories.map((s, index) => (
                    <div
                        key={s._id}
                        onClick={() => {
                          selectStory(s)
                          dispatch.stories.setWatched(s._id)
                        }}
                        style={setElementWidth()}
                        className={
                          s._id === story._id
                              ? "stories-button-active"
                              : "stories-button"
                        }
                    ></div>
                ))}
              </div>
            </div>
            <div className='stories-image-wrap'>
                <img
                    src={story.img}
                    alt="story image"
                />
            </div>
        </div>
    )
}

export default StoriesModal
