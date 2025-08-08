import React, {useEffect, useRef} from "react";
import { categoryStore } from "@/providers/category";
import { history, useMatch, useNavigate } from "@@/exports";

type Type = {
  onClick?: () => void;
};
const MyDocMenuElement: React.FC<Type> = ({ onClick }) => {
  const docs = categoryStore((state) => state.data?.ideaDocs) ?? [];
  const match = useMatch("/idea/:title");
  const nav = useNavigate();
  const docTitle = match ? match.params.title : undefined;
  const detailRef = useRef<HTMLDetailsElement>(null);

  const closeMenu = () => {
    console.log(`document active element is ${document.activeElement}`);
    let activeElement = document.activeElement;
    detailRef?.current?.removeAttribute("open")
    if (
      activeElement instanceof HTMLBodyElement ||
      activeElement instanceof HTMLUListElement
    ) {
      activeElement.blur();
    }
  };

  useEffect(() => {
    const unListen = history.listen(() => {
      closeMenu();
    });
    window.addEventListener("scroll", closeMenu);
    return () => {
      unListen();
      window.removeEventListener("scroll", closeMenu);
    };
  }, []);

  if (docs.length === 0) {
    return <></>;
  }

  const GetShowTitle = () => {
    if (docTitle) {
      return docTitle;
    }
    return "笔记";
  };

  const title = GetShowTitle();

  return (
    <details ref={detailRef}>
      <summary>{title}</summary>
      <ul className={'w-52 shadow-2xl'}>
        {docs.map((doc) => (
          <li
            key={doc}
            onClick={() => {
              closeMenu();
              onClick?.();
            }}
          >
            <a
              onClick={() => {
                closeMenu();
                nav(`/idea/${doc}`);
              }}
            >
              {doc}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default MyDocMenuElement;
