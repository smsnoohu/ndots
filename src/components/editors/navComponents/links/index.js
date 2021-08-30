import React, { Fragment } from "react";

import EditorInner from "../../EditorInner";
import { Checkbox, Inputbox, Button } from "../../..";
import { useLinks } from "../../../../hooks";
import "./links.scss";

const Links = (props) => {
  const { linkState, linkActions } = useLinks();

  const {
    linkList,
    selectedLinks,
    autoComplete,
    isAutocompleteShow,
    autoCompleteWrapper,
    dots,
  } = linkState;
  const {
    updateLinkList,
    enableToLink,
    updateValue,
    updateCheckbox,
    setDeleteNode,
  } = linkActions;

  const returnBody = () => (
    <div className="link-wrapper">
      <ul className="link-container">
        {linkList &&
          linkList.length &&
          linkList.map((link, index) => (
            <li key={`key_${link.id}`}>
              <Checkbox
                id={`check_${link.id}`}
                name={`check_${link.id}`}
                checked={link.isSelected}
                disabled={
                  !link.value ||
                  !link.isFind ||
                  (selectedLinks.length === 2 && !link.isSelected)
                }
                onChange={() => updateCheckbox(link.id)}
              />
              <div className="autoComplete-wrapper">
                <Inputbox
                  id={link.id}
                  name={link.id}
                  value={link.value}
                  onChange={updateValue}
                />
                {isAutocompleteShow[link.id] ? (
                  <div
                    className="autoComplete-container"
                    ref={autoCompleteWrapper}
                  >
                    <ul>
                      {autoComplete.map((data) => (
                        <li
                          key={`auto_${data.id}`}
                          onClick={() => enableToLink(link.id, data)}
                        >
                          {data.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <Button
                kind="danger"
                icon="times"
                disabled={!link.isFind || linkList.length === 1}
                onClick={() => setDeleteNode(link.id)}
              />
              {linkList.length === index + 1 && (
                <Button
                  kind="primary"
                  icon="plus"
                  disabled={!link.value || !link.isFind}
                  onClick={updateLinkList}
                />
              )}
            </li>
          ))}
      </ul>
      <div className="description-container">
        {linkList &&
          linkList.length &&
          linkList
            .filter((link) => link.isSelected)
            .map((list) => (
              <Fragment key={`desc_${list.id}`}>
                <h4>{list.value}</h4>
                <p>{list.description}</p>
              </Fragment>
            ))}
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="btn-container">
      <Button
        kind="primary"
        value="Create Links"
        disabled={!selectedLinks || selectedLinks.length < 2}
      />
      <Button kind="secondary" value="Cancel" />
    </div>
  );
  return <EditorInner body={returnBody()} footer={renderFooter()} />;
};

export default Links;
