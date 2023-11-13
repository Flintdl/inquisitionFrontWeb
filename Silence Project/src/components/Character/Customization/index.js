import { useState } from 'react';
import {
  ArrowFatLineLeft,
  ArrowFatLineRight,
  Info,
} from '@phosphor-icons/react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import characterVampire from '../../../../public/images/characters/character_vampire.png';
import characterWitch from '../../../../public/images/characters/character_witch.png';
import characterVillager from '../../../../public/images/characters/character_villager.png';
import characterMermaid from '../../../../public/images/characters/character_mermaid.png';

import bgVampire from '../../../../public/images/custom_character/background_customization_character_option_01_vampire.png';
import bgMage from '../../../../public/images/custom_character/background_customization_character_option_01_mage.png';
import bgVillager from '../../../../public/images/custom_character/background_customization_character_option_01_villager.png';
import bgMermaid from '../../../../public/images/custom_character/background_customization_character_option_01_mermaid.png';

import CustomButton from '../../_Global/Commons/Buttons';
import CustomTitles from '../../_Global/Commons/Titles';
import CustomDialog from '../../_Global/Dialog';

const personsTest = [
  {
    name: 'Vampiro',
    image: characterVampire,
    bg: bgVampire,
    info: {
      name: 'Aldon Moterasu',
      biography: [
        'Aldon Moterasu, conhecido como o Vampiro das Sombras, emergiu dos recantos mais escuros da história. Sua existência começou séculos atrás, quando ele era um nobre respeitado em uma terra distante. No entanto, uma maldição ancestral recaiu sobre Aldon, transformando-o em uma criatura da noite.',
        'Rejeitado por sua própria família e temido por sua comunidade, Aldon se retirou para as sombras, onde aprendeu a controlar seus novos poderes vampíricos. Ele se tornou um mestre na arte da sedução, manipulando mentes humanas para atender aos seus desejos noturnos.',
        'Aldon Moterasu é conhecido por vagar por castelos abandonados e cemitérios, alimentando-se da essência vital dos vivos para sustentar sua imortalidade. Seu olhar hipnótico e suas presas afiadas são temidas por aqueles que ousam cruzar seu caminho.',
      ],
      attributes: [
        {
          name: 'Mordida Vampírica',
          tier: '10/10',
          description:
            'Aldon possui uma mordida vampírica mortal que pode drenar a vida de suas vítimas. Ele é capaz de se alimentar da essência vital dos seres humanos, fortalecendo-se e prolongando sua imortalidade.',
        },
        {
          name: 'Controle Mental',
          tier: '8/10',
          description:
            'Aldon desenvolveu a habilidade de controlar mentes humanas, manipulando pensamentos e decisões de suas presas. Sua presença é hipnótica, permitindo-lhe influenciar outros para atenderem aos seus desejos.',
        },
        {
          name: 'Agilidade Noturna',
          tier: '9/10',
          description:
            'Como vampiro, Aldon é incrivelmente ágil e veloz durante a noite. Ele pode se mover nas sombras com uma rapidez sobrenatural, tornando-se quase impossível de ser detectado pelos olhos humanos.',
        },
        {
          name: 'Transformação em Morcego',
          tier: '7/10',
          description:
            'Aldon tem a capacidade de se transformar em um morcego, permitindo-lhe atravessar locais inacessíveis e escapar de situações perigosas. Sua forma de morcego é uma extensão de sua agilidade e destreza.',
        },
        {
          name: 'Sensibilidade à Luz Solar',
          tier: '9/10',
          description:
            'Aldon é sensível à luz solar direta, o que o obriga a se mover predominantemente durante a noite. A exposição prolongada à luz do sol pode enfraquecê-lo significativamente.',
        },
      ],
    },
  },
  {
    name: 'Bruxa',
    image: characterWitch,
    bg: bgMage,
    info: {
      name: 'Kanit Zoterus',
      biography: [
        'Há muito tempo, nas profundezas de uma floresta enigmática, existia uma bruxa conhecida como Kanit Zoterus. Seu nome era sussurrado entre as folhas das árvores e ecoava pelos riachos mágicos que cruzavam a região. Kanit nasceu em uma família de curandeiros e herbalistas, mas desde cedo, ela exibiu talentos extraordinários que iam além das habilidades comuns de sua linhagem.',
        'Seu caminho na magia negra começou quando, ainda jovem, ela encontrou um antigo grimório escondido em uma caverna oculta. Este livro, empoeirado e repleto de símbolos arcanos, revelou a Kanit os segredos proibidos da magia das sombras. Fascinada por esse conhecimento proibido, ela começou a estudar as artes sombrias, desvendando segredos que levaram outros a repudiá-la.',
        'Conforme seus poderes cresceram, Kanit Zoterus se isolou na floresta, construindo uma torre sombria onde praticava seus rituais e aprimorava suas habilidades. Diziam que ela conseguia convocar criaturas das profundezas, manipular as sombras para criar ilusões e até mesmo prever o futuro com a observação de estrelas específicas.',
        'Apesar de sua reputação sinistra, Kanit não era uma bruxa malévola. Ela utilizava suas habilidades para proteger a floresta e seus habitantes mágicos dos perigos que espreitavam nas trevas. No entanto, sua busca por conhecimento a levou a enfrentar desafios sombrios, incluindo seres malignos que cobiçavam seu poder.',
        'A história de Kanit Zoterus tornou-se uma lenda na região, misturando temor e admiração. Alguns a viam como uma guardiã da natureza, enquanto outros a consideravam uma ameaça que deveria ser erradicada. Seu destino permaneceu envolto em mistério, deixando a floresta repleta de rumores e histórias sobre a bruxa que controlava as sombras para proteger a magia que fluía entre as árvores.',
      ],
      attributes: [
        {
          name: 'Sombra Profunda',
          tier: '10/10',
          description:
            'Kanit é uma mestra na manipulação das sombras. Seus feitiços sombrios podem envolver seus inimigos, obscurecendo sua visão e enfraquecendo suas habilidades. Ela é capaz de se camuflar nas sombras, tornando-se praticamente invisível aos olhos não treinados.',
        },
        {
          name: 'Conexão com a Natureza',
          tier: '8/10',
          description:
            'Apesar de seus poderes sombrios, Kanit mantém uma forte conexão com a natureza. Ela pode se comunicar com animais da floresta e obter informações valiosas sobre o ambiente ao seu redor. Sua torre está envolta por plantas mágicas que a alertam sobre intrusos.',
        },
        {
          name: 'Rituais Místicos',
          tier: '9/10',
          description:
            'Kanit é uma especialista em realizar rituais místicos que envolvem ingredientes raros e magias ancestrais. Esses rituais podem conceder poderes temporários, como visões do futuro, cura intensificada ou até mesmo a capacidade de invocar aliados espirituais para auxiliá-la em batalha.',
        },
        {
          name: 'Sabedoria Arcana',
          tier: '7/10',
          description:
            'Seu conhecimento arcano é vasto, especialmente em relação às artes sombrias. Kanit é capaz de decifrar inscrições mágicas antigas, desvendar enigmas místicos e entender os meandros das energias mágicas que permeiam a floresta.',
        },
        {
          name: 'Intuição Sombria',
          tier: '9/10',
          description:
            'Kanit possui uma intuição aguçada quando se trata de detectar ameaças ocultas. Ela pode sentir a presença de seres sobrenaturais, antecipando emboscadas e detectando a influência de forças sombrias na região.',
        },
      ],
    },
  },
  {
    name: 'Aldeão',
    image: characterVillager,
    bg: bgVillager,
    info: {
      name: 'Lucas Ardent',
      biography: [
        'Lucas Ardent, um habitante simples e humilde da aldeia de Sombriol, nasceu em meio aos campos verdejantes que cercam o pacífico vilarejo. Vindo de uma linhagem de agricultores dedicados, Lucas cresceu aprendendo os segredos da terra e a importância da comunidade.',
        'Conhecido por sua bondade e disposição para ajudar, Lucas despende seus dias plantando e colhendo para sustentar a aldeia. Sua presença calorosa e sorriso amigável são uma fonte de consolo para os aldeões, tornando-o uma figura querida na comunidade.',
        'Embora sua vida seja marcada pela simplicidade, Lucas Ardent é resiliente diante das adversidades. Ele se tornou um pilar na aldeia, oferecendo apoio moral e físico sempre que necessário, e sua coragem é frequentemente testada pelos desafios que surgem nas sombras da floresta próxima.',
      ],
      attributes: [
        {
          name: 'Agricultor Habilidoso',
          tier: '8/10',
          description:
            'Lucas é um agricultor habilidoso, utilizando técnicas ancestrais para cultivar colheitas saudáveis e sustentar a aldeia de Sombriol.',
        },
        {
          name: 'Hospitaleiro',
          tier: '9/10',
          description:
            'Reconhecido por sua hospitalidade excepcional, Lucas acolhe visitantes com um sorriso caloroso, proporcionando abrigo e compartilhando histórias alegres sobre a vida na aldeia.',
        },
        {
          name: 'Líder Comunitário',
          tier: '7/10',
          description:
            'Apesar de sua natureza modesta, Lucas emergiu como um líder não oficial na aldeia de Sombriol, unindo os aldeões e enfrentando desafios com sabedoria.',
        },
        {
          name: 'Conhecimento da Floresta',
          tier: '6/10',
          description:
            'Com sua experiência prática, Lucas possui conhecimento da floresta próxima, identificando plantas úteis, evitando áreas perigosas e alertando a aldeia sobre potenciais ameaças.',
        },
        {
          name: 'Resistência à Adversidade',
          tier: '8/10',
          description:
            'Lucas enfrentou diversas adversidades ao longo de sua vida, desenvolvendo uma notável resistência. Sua resiliência inspira os aldeões a enfrentarem os desafios com coragem.',
        },
      ],
    },
  },
  {
    name: 'Sereia',
    image: characterMermaid,
    bg: bgMermaid,
    info: {
      name: 'Nerida Maris',
      biography: [
        'Nerida Maris, a encantadora sereia dos mares profundos, é uma criatura mágica que habita as águas cristalinas do Oceano Celestial. Nascida de lendas antigas e da magia que permeia as profundezas, Nerida é conhecida por sua beleza inigualável e melodia hipnotizante.',
        'Seus dias são preenchidos com a exploração dos recifes de coral e a interação amigável com as criaturas marinhas. Nerida é a guardiã das águas, zelando pela vida marinha e mantendo o equilíbrio ecológico em seu reino subaquático.',
        'Embora sua essência seja serena, Nerida também é uma protetora feroz de seu lar. Ela é capaz de controlar as marés e convocar tempestades quando ameaças espreitam os oceanos. Sua lealdade aos amigos e seu amor pela natureza são inabaláveis.',
      ],
      attributes: [
        {
          name: 'Encanto Marinho',
          tier: '10/10',
          description:
            'Nerida emana um encanto marinho irresistível. Sua beleza e melodia hipnotizante podem atrair e acalmar até as criaturas mais selvagens dos oceanos.',
        },
        {
          name: 'Guardiã das Águas',
          tier: '9/10',
          description:
            'Nerida é a guardiã das águas, protegendo os recifes de coral e a vida marinha. Sua conexão com o oceano permite que ela sinta as mudanças nos ecossistemas e reaja para preservar o equilíbrio.',
        },
        {
          name: 'Manipulação das Marés',
          tier: '8/10',
          description:
            'Com um gesto gracioso, Nerida pode controlar as marés, elevando ou abaixando níveis de água e criando correntes aquáticas. Ela usa essa habilidade para navegar pelos oceanos e proteger seu reino.',
        },
        {
          name: 'Comunicação Aquática',
          tier: '7/10',
          description:
            'Nerida possui a capacidade de se comunicar com todas as formas de vida marinha, estabelecendo uma conexão empática que permite a compreensão mútua de sentimentos e intenções.',
        },
        {
          name: 'Tempestade Aquática',
          tier: '8/10',
          description:
            'Quando necessário, Nerida pode convocar tempestades aquáticas para afastar ameaças. Raios, trovões e ondas furiosas respondem ao seu chamado, defendendo seu reino subaquático.',
        },
      ],
    },
  },
];

function CharacterCustomization({ actions, soundAllowed }) {
  const { setOpenCharacterCustomization } = actions;

  const [pos, setPos] = useState(0);
  const [direction, setDirection] = useState(false);

  const slideChar = () => {
    const audio = new Audio('/sounds/slide.mp3');
    console.log(soundAllowed);
    if (soundAllowed && soundAllowed === 'allowed') audio.play();
  };

  const navigateBackward = () => {
    setPos((prevPos) => (prevPos === 0 ? personsTest.length - 1 : prevPos - 1));
    setDirection(false);
    slideChar();
  };

  const navigateForward = () => {
    setPos((prevPos) => (prevPos === personsTest.length - 1 ? 0 : prevPos + 1));
    setDirection(true);
    slideChar();
  };

  return (
    <CustomDialog
      title="Personagens e suas funções"
      close={setOpenCharacterCustomization}
      buttonClose={false}
      size="full">
      <div className={`fixed left-0 top-0 -z-10 h-full w-full bg-cover`}>
        <Image
          src={personsTest[pos].bg}
          title="Character Test"
          alt={`Custom Test`}
          fill={true}
          quality={100}
          priority={true}
          className="block h-auto w-full select-none !object-cover"
        />
        <div className="h-full w-full bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
      </div>
      <nav></nav>
      <section className="flex h-full w-full select-none gap-32">
        <nav className="flex w-auto flex-1 p-4 pb-12">
          <ul className="flex h-full w-full flex-col gap-2 rounded-xl border-2 border-white/10 p-2 backdrop-blur-lg">
            <li className="flex items-center gap-2 p-1">
              <Info size={24} weight="fill" className="text-gray-300" />
              <CustomTitles
                tag="p"
                size={18}
                pos="center"
                text={`Informações sobre ${personsTest[pos].name}`}
                customClass="!text-gray-300 font-Kanit"
              />
            </li>
            <li className="flex items-center gap-2 p-1">
              <CustomTitles
                tag="p"
                size={18}
                pos="center"
                text={`Nome: ${personsTest[pos].info.name}`}
                customClass="!text-gray-300 font-Kanit"
              />
            </li>
            <li className="flex gap-2 overflow-y-auto p-1 scrollbar-thin scrollbar-track-gray-900/40 scrollbar-thumb-gray-500/40">
              <div className="flex flex-col gap-4">
                <CustomTitles
                  tag="p"
                  size={18}
                  pos="left"
                  text="Biografia: "
                  customClass="!text-gray-300 font-Kanit"
                />
                {personsTest[pos].info.biography.map((item) => (
                  <CustomTitles
                    tag="p"
                    size={14}
                    pos="left"
                    text={item}
                    customClass="!text-gray-300 font-Kanit"
                  />
                ))}
              </div>
            </li>
          </ul>
        </nav>
        <section className="mx-auto mt-auto flex h-full w-fit select-none items-end pb-12">
          <div className="flex items-center justify-center gap-4">
            <div className="flex h-fit cursor-pointer items-center justify-center rounded-lg border-2 bg-black/60 p-1 hover:opacity-80">
              <ArrowFatLineLeft
                size={32}
                weight="fill"
                className="text-white"
                onClick={navigateBackward}
              />
            </div>
            <AnimatePresence>
              <ul className="h-[600px] w-[500px]">
                {personsTest.map(({ name, image }, i) => {
                  return i === pos ? (
                    <motion.div
                      key={i}
                      initial={{ x: direction ? 300 : -300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction ? -300 : 300, opacity: 0 }}
                      className="relative mx-auto flex h-[600px] max-w-[450px] overflow-hidden py-4">
                      {/* <div className="absolute left-[50%] top-0 z-10 -translate-x-[50%] rounded-md border-2 bg-black px-4 py-1 font-AntonRegular text-xl text-white">
                        {name}
                      </div> */}
                      <div className="absolute z-10 h-full w-full"></div>
                      <Image
                        src={image}
                        title={name}
                        alt={name}
                        fill={true}
                        priority={true}
                        className="block h-auto w-fit select-none bg-clip-content !object-contain pt-12 drop-shadow-[0_35px_35px_rgba(0,0,0,1)] xl:!object-cover"
                      />
                    </motion.div>
                  ) : null;
                })}
              </ul>
            </AnimatePresence>
            <div className="flex h-fit cursor-pointer items-center justify-center rounded-lg border-2 bg-black/60 p-1 hover:opacity-80">
              <ArrowFatLineRight
                size={32}
                weight="fill"
                className="text-white"
                onClick={navigateForward}
              />
            </div>
          </div>
        </section>
        <nav className="flex h-full w-auto flex-1 p-4 pb-12">
          <ul className="flex h-full w-full flex-col gap-2 rounded-xl border-2 border-white/10 p-2 backdrop-blur-lg">
            <li className="flex items-center gap-2 p-1">
              <Info size={24} weight="fill" className="text-gray-300" />
              <CustomTitles
                tag="p"
                size={18}
                pos="center"
                text="Atributos"
                customClass="!text-gray-300 font-Kanit"
              />
            </li>
            <li className="flex max-h-[850px] gap-2 overflow-y-auto p-1 scrollbar-thin scrollbar-track-gray-900/40 scrollbar-thumb-gray-500/40">
              <div className="flex flex-col gap-2">
                {personsTest[pos].info.attributes.map(
                  ({ name, tier, description }) => (
                    <>
                      <CustomTitles
                        tag="p"
                        size={18}
                        pos="left"
                        text={name}
                        customClass="!text-cyan-400 font-KanitRegular"
                      />
                      <CustomTitles
                        tag="p"
                        size={12}
                        pos="left"
                        text={`Classificação: ${tier}`}
                        customClass="!text-yellow-400 font-KanitRegular"
                      />
                      <CustomTitles
                        tag="p"
                        size={14}
                        pos="left"
                        text={description}
                        customClass="!text-gray-300 font-Kanit"
                      />
                    </>
                  ),
                )}
              </div>
            </li>
          </ul>
        </nav>
      </section>
      {/* <section className="mt-auto flex items-center justify-center gap-2">
        <CustomButton
          title="Aceitar"
          color="primary"
          action={{
            onClick: () => {
              setSoundAllowed('allowed');
              setOpenAcceptSound(false);
            },
          }}
        />
      </section> */}
    </CustomDialog>
  );
}

export default CharacterCustomization;
