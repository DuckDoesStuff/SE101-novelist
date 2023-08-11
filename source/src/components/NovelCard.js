import React, { useState } from "react";
import ButtonReaction from "./ButtonReaction.js";
import Button from "./Button.js";

const NovelCard = ({ read, like }) => {
  return (
    <div>
      <Button doSomething={read} className="read">
        {" "}
        READ{" "}
      </Button>
      <ButtonReaction
        prevIcon="fa-regular fa-heart"
        postIcon="fa-solid fa-heart"
        doSomething={like}
        className="reaction"
      >
        {" "}
        Like{" "}
      </ButtonReaction>
    </div>
  );
};

export default NovelCard;
