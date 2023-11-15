import { X } from '@phosphor-icons/react';

function CustomDialog({
  title,
  close,
  size = 'lg',
  children,
  buttonClose = true,
  soundAllowed,
}) {
  const playCloseSound = () => {
    const audio = new Audio('/sounds/click-menu.mp3');
    if (soundAllowed && soundAllowed === 'allowed') audio.play();
  };

  const resultSize = () => {
    switch (size) {
      case 'sm':
        return 'w-72 border-2';
      case 'md':
        return 'w-96 border-2';
      case 'lg':
        return 'w-[500px] border-2';
      case 'xl':
        return 'w-[900px] border-2';
      case '2xl':
        return 'w-[1240px] border-2';
      case 'full':
        return 'w-full h-full max-w-full left-0 top-0 bg-slate-700';
      default:
        return 'w-[500px]';
    }
  };
  return (
    <section className="fixed left-0 top-0 z-20 flex h-full w-full  items-center justify-center">
      <div
        className="fixed left-0 top-0 h-full w-full cursor-pointer bg-black/60"
        onClick={() => {
          if (buttonClose) {
            close(false);
            playCloseSound();
          }
        }}></div>
      <div
        className={`relative z-10 flex max-w-[90%] flex-col gap-3 rounded-xl border-white/10 bg-white/5 p-3 backdrop-blur-lg ${resultSize()}`}>
        {buttonClose && (
          <span
            onClick={() => {
              close(false);
              playCloseSound();
            }}
            className="absolute -bottom-14 left-[50%] w-fit -translate-x-[50%] cursor-pointer rounded-full border border-white/10 bg-gray-400/40 p-2 text-white hover:opacity-80">
            <X size={20} weight="bold" />
          </span>
        )}
        <h4 className="text-center font-AntonRegular text-xl text-gray-300">
          {title || '~'}
        </h4>
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
    </section>
  );
}

export default CustomDialog;
