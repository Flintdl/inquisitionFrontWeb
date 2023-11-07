import { CornersOut } from "@phosphor-icons/react";

function FooterLobby() {
  return (
    <footer className="fixed bottom-0 left-0 flex w-full items-center justify-between px-14 py-8">
      <p className="font-AntonRegular text-sm text-white">
        &copy; Todos os direitos reservados, equipe
        <span className="text-green-500"> Silence Killers</span> - 2023
      </p>
      <div className="flex items-center gap-1 text-green-500">
        <CornersOut size={32} weight="bold" />
        <p className="font-AntonRegular text-sm">Tela cheia</p>
      </div>
    </footer>
  );
}

export default FooterLobby;
