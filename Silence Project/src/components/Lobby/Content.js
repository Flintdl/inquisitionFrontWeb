function ContentLobby({ children, bgLobby = "bg-lobby" }) {
  return (
    <div className="h-full w-full p-12 pb-24">
      <div
        className={`${bgLobby} fixed left-0 top-0 -z-10 h-full w-full bg-cover`}
      >
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
