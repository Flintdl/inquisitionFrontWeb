import { X } from "@phosphor-icons/react";

function MessageContainer({ messages, setMessages }) {
  function closeMessageSingle(id) {
    setMessages((prevMessages) => {
      const index = prevMessages.findIndex((message) => message.id === id);

      if (index === -1) {
        return prevMessages;
      }

      const newMessages = [...prevMessages];
      const message = newMessages[index];

      // Remove a mensagem da lista
      newMessages.splice(index, 1);

      return newMessages;
    });
  }

  return (
    <ul className=" scrollbar-none max-w-300 fixed right-4 top-0 z-50 my-12 flex max-h-screen flex-col gap-4">
      {messages.map(({ id, type, description }, i) => {
        return (
          <MessagePopup
            key={id}
            props={{ id, type, description, closeMessageSingle }}
          />
        );
      })}
    </ul>
  );
}

function MessagePopup({ props }) {
  const { id, type, description, closeMessageSingle } = props;

  setTimeout(() => {
    console.log("TERSTR");
    closeMessageSingle(id);
  }, 7000);

  return (
    <li
      className={`bg-dark-600 border-l-4 ${
        (type === "error" && "border-l-red-400") ||
        (type === "success" && "border-l-green-400")
      } animate-slide-message flex max-w-xs select-none flex-col gap-1 rounded-lg p-4 text-sm shadow-md`}
    >
      <div className="font-inter_bold flex items-center gap-4 text-sm text-gray-300">
        <span dangerouslySetInnerHTML={{ __html: description }}></span>
        <X
          className="text-md cursor-pointer hover:opacity-80"
          size={32}
          onClick={() => closeMessageSingle(id)}
        />
      </div>
    </li>
  );
}

export default MessageContainer;
