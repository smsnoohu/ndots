import React, { useRef, useState } from "react";

const Bookmark = (props) => {
  const { updateBookmark } = props;
  const bookmarkWrapper = useRef(null);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);

  const openBookmark = () => {
    setIsBookmarkOpen(true);
  };
  const closeBookmark = () => {
    setIsBookmarkOpen(false);
  };
  return (
    <div className="bootkmark-wrapper" ref={bookmarkWrapper}>
      <Button icon="star" title="Star" onClick={openBookmark} />
      {isBookmarkOpen && (
        <div className="bookmark-container">
          <h4>Select Tag</h4>
          <div className="input-group">
            <Inputbox
              name="bookmark"
              value={bookmark}
              onChange={updateField}
              autoComplete="off"
            />
            <Button
              kind="primary"
              className="btn-sm"
              icon="plus"
              onClick={addBookmarkList}
              disabled={!bookmark}
            />
          </div>
          <ul className="bookmark-list">
            {bookmarkList &&
              bookmarkList.length &&
              bookmarkList.map((item) => (
                <li key={item.id}>
                  <Radio
                    name="bookmark"
                    id={item.id}
                    checked={item.isSelected}
                    onChange={updateBookmark}
                    label={item.name}
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Bookmark;
