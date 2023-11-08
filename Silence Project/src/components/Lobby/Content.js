import Image from "next/image";
import image01 from "../../../public/images/lobby_backgrounds/background_initial_page_option_01.png";
import image02 from "../../../public/images/lobby_backgrounds/background_initial_page_option_02.png";
import image03 from "../../../public/images/lobby_backgrounds/background_initial_page_option_03.png";
import image04 from "../../../public/images/lobby_backgrounds/background_initial_page_option_04.png";
import image05 from "../../../public/images/lobby_backgrounds/background_initial_page_option_05.png";

function ContentLobby({ children, bgLobby = 1 }) {
  const selectBg = () => {
    switch (bgLobby) {
      case 1:
        return image01;
      case 2:
        return image02;
      case 3:
        return image03;
      case 4:
        return image04;
      case 5:
        return image05;
      default:
        return image01;
    }
  };

  return (
    <div className="h-full w-full p-12 pb-24">
      <div className={`fixed left-0 top-0 -z-10 h-full w-full bg-cover`}>
        <Image
          src={selectBg()}
          title="Character Test"
          alt="Character Test"
          fill={true}
          priority={true}
          className="block h-auto w-full select-none !object-cover"
        />
        <div className="h-full w-full bg-gradient-to-r from-black via-black to-black/10 opacity-80"></div>
      </div>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </div>
  );
}

export default ContentLobby;
