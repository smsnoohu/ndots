import React from "react";

import EditorInner from "../../EditorInner";
import { Checkbox, Inputbox, Button } from "../../..";
import { useLinks } from "../../../../hooks";
import "./links.scss";

const Links = (props) => {
  const { linkState, linkActions } = useLinks();

  const { linkList, selectedLinks } = linkState;
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
          linkList.map((link) => (
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
              <div className="input-group">
                <Inputbox
                  id={link.id}
                  name={link.id}
                  value={link.value}
                  onChange={updateValue}
                />
                <Button
                  kind="secondary"
                  icon="search"
                  onClick={() => enableToLink(link.id)}
                />
                <Button
                  kind="primary"
                  icon="plus"
                  disabled={!link.value || !link.isFind}
                  onClick={updateLinkList}
                />
                <Button
                  kind="danger"
                  icon="trash"
                  disabled={!link.isFind || linkList.length === 1}
                  onClick={() => setDeleteNode(link.id)}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );

  const renderFooter = () => (
    <div className="btn-container">
      <Button kind="primary" value="Link" />
      <Button kind="secondary" value="Cancel" />
    </div>
  );
  return <EditorInner body={returnBody()} footer={renderFooter()} />;
};

export default Links;
