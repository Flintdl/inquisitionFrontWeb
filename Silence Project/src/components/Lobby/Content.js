function ContentLobby({ children }) {
  return (
    <div className="h-full w-full bg-cover p-12 pb-32">
      <div className="fixed left-0 top-0 -z-10 h-full w-full bg-lobby">
        <div className="h-full w-full bg-black opacity-70"></div>
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
