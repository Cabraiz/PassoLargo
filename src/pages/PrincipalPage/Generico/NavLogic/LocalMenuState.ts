export interface MenuState {
  selectedLink: string;
}

type SetLocalMenuState = React.Dispatch<React.SetStateAction<MenuState>>;

type Navigate = (path: string) => void;

export const handleLinkClick = (
  link: string,
  setLocalMenuState: SetLocalMenuState,
  navigate: Navigate,
  links: string[]
): void => {
  setLocalMenuState((prevState: MenuState) => ({
    ...prevState,
    selectedLink: link,
  }));

  const pathMap: Record<string, string> = {};

  // Mapear cada link para seu caminho
  links.forEach((item) => {
    pathMap[item] = `#${item.toLowerCase()}`;
  });

  navigate(pathMap[link] || ""); // Atualizar o caminho
};
