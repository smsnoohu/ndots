import React from "react";

import EditorInner from "../../EditorInner";
import { Inputbox, Button } from "../../..";
import { useShare } from "../../../../hooks";
import "./share.scss";
import QRCode from "../../../../assets/images/QRCode.png";

const Share = () => {
  const { shareState, shareActions } = useShare();

  const { inviteList, inviteEmail, inviteAccessType, message } = shareState;
  const { updateInviteField, updateInviteList, removeInviteList } =
    shareActions;

  const returnBody = () => (
    <div className="share-container">
      <form>
        <Inputbox
          name="inviteEmail"
          id="inviteEmail"
          value={inviteEmail}
          onChange={updateInviteField}
          placeholder="Enter email to invite"
        />
        {message && message.invalidEmail && (
          <div className="error-text">Invalid Email Address</div>
        )}
        <div className="row pt-20">
          <div className="col-sm-3 pb-20">
            <select
              name="inviteAccessType"
              id="inviteAccessType"
              className="form-control"
              value={inviteAccessType}
              onChange={updateInviteField}
            >
              <option value="">-- Select --</option>
              <option value="view">View</option>
              <option value="edit">Edit</option>
            </select>
          </div>
          <div className="col-sm-3">
            <Button
              kind="primary"
              value="Invite"
              disabled={!inviteEmail || !inviteAccessType}
              onClick={updateInviteList}
            />
          </div>
        </div>
      </form>
      <ul className="invite-list">
        {inviteList && inviteList.length
          ? inviteList.map((list) => (
              <li key={list.id}>
                <span>{list.email}</span>
                <Button
                  kind="danger"
                  icon="times"
                  onClick={() => removeInviteList(list.id)}
                />
              </li>
            ))
          : null}
      </ul>
      <h2 className="pt-20">Create QR Code</h2>
      <div className="qr-code">
        <img src={QRCode} alt="QR Code" />
      </div>
      <div className="row">
        <div className="col-sm-3 pb-20">
          <select
            name="inviteAccessType"
            id="inviteAccessType"
            className="form-control"
          >
            <option value="">-- Select --</option>
            <option value="view">View</option>
            <option value="edit">Edit</option>
          </select>
        </div>
        <div className="col-sm-9">
          <Button kind="primary" value="Generate QR Code" />
        </div>
      </div>
      <div className="btn-container">
        <Button kind="primary" value="Copy Image" icon="copy" />
        <Button kind="primary" value="Copy Link" icon="copy" />
      </div>
    </div>
  );

  const renderFooter = () => (
    <>
      <Button kind="info" iconType="fab" icon="skype" />
      <Button kind="info" iconType="fab" icon="whatsapp" />
      <Button kind="info" iconType="fab" icon="instagram" />
    </>
  );

  return <EditorInner body={returnBody()} footer={renderFooter()} />;
};

export default Share;
