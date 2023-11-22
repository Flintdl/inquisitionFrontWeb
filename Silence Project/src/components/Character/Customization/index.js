import React, { useState } from 'react';
import { ArrowFatLineLeft } from '@phosphor-icons/react';
import Image from 'next/image';

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
import CustomizationExhibition from './Exhibition';
import CustomizationLeftBar from './Biography';
import CustomizationRightBar from './Attributes';

const personsTest = [
  {
    name: 'Vampiro',
    image: characterVampire,
    bg: bgVampire,
    attributes: {
      Sobrenatural: {
        ManipulaçãoSombria: 52,
        ControleMental: 45,
        AgilidadeNoturna: 45,
      },
      Físico: {
        Força: 18,
        Agilidade: 15,
        Vitalidade: 35,
        Destreza: 33,
      },
    },
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
    attributes: {
      Mágico: {
        ManipulaçãoSombria: 32,
        ConexãoNatureza: 65,
        RituaisMísticos: 45,
        SabedoriaArcana: 35,
      },
      Físico: {
        Força: 38,
        Agilidade: 25,
        Vitalidade: 65,
        Destreza: 23,
      },
    },
    info: {
      name: 'Kanit Zoterus',
      biography: [
        'Há muito tempo, nas profundezas de uma floresta enigmática, existia uma bruxa conhecida como Kanit Zoterus. Seu nome era sussurrado entre as folhas das árvores e ecoava pelos riachos mágicos que cruzavam a região. Kanit nasceu em uma família de curandeiros e herbalistas, mas desde cedo, ela exibiu talentos extraordinários que iam além das habilidades comuns de sua linhagem.',
        'Seu caminho na magia negra começou quando, ainda jovem, ela encontrou um antigo grimório escondido em uma caverna oculta. Este livro, empoeirado e repleto de símbolos arcanos, revelou a Kanit os segredos proibidos da magia das sombras. Fascinada por esse conhecimento proibido, ela começou a estudar as artes sombrias, desvendando segredos que levaram outros a repudiá-la.',
        'Conforme seus poderes cresceram, Kanit Zoterus se isolou na floresta, construindo uma torre sombria onde praticava seus rituais e aprimorava suas habilidades. Diziam que ela conseguia convocar criaturas das profundezas, manipular as sombras para criar ilusões e até mesmo prever o futuro com a observação de estrelas específicas.',
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
      ],
    },
  },
  {
    name: 'Aldeão',
    image: characterVillager,
    bg: bgVillager,
    attributes: {
      Habilidades: {
        Agricultura: 52,
        Hospitalidade: 45,
        LiderançaComunitária: 45,
        ConhecimentoFloresta: 45,
      },
      Físico: {
        Força: 18,
        Agilidade: 15,
        Vitalidade: 35,
        Destreza: 33,
      },
    },
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
    attributes: {
      Mágico: {
        EncantoMarinho: 52,
        GuardiãDasÁguas: 45,
        ManipulaçãoMarés: 45,
        ComunicaçãoAquática: 45,
        TempestadeAquática: 45,
      },
      Físico: {
        Força: 18,
        Agilidade: 15,
        Vitalidade: 35,
        Destreza: 33,
      },
    },
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
        <div className="h-full w-full bg-gradient-to-r from-black via-transparent to-black opacity-90"></div>
      </div>
      <CustomizationNavBack
        setOpenCharacterCustomization={setOpenCharacterCustomization}
      />
      <section className="flex h-full max-h-[calc(100%-90px)] w-full select-none gap-32 pb-4">
        <CustomizationLeftBar props={{ personsTest, pos }} />
        <CustomizationExhibition
          props={{ personsTest, pos, direction }}
          actions={{ navigateBackward, navigateForward }}
        />
        <CustomizationRightBar props={{ personsTest, pos }} />
      </section>
    </CustomDialog>
  );
}

const CustomizationNavBack = ({ setOpenCharacterCustomization }) => {
  return (
    <nav className="mx-4 w-fit rounded-lg border-2 border-white/10 bg-white/5 px-4 py-2 backdrop-blur-lg">
      <div
        onClick={() => setOpenCharacterCustomization(false)}
        className="group/back flex cursor-pointer items-center gap-1 transition-all hover:gap-2 hover:opacity-70">
        <ArrowFatLineLeft
          size={24}
          weight="fill"
          className="text-white group-hover/back:text-cyan-400"
        />
        <CustomTitles
          tag="p"
          size={18}
          pos="left"
          text="Retornar"
          customClass="!text-gray-300 group-hover/back:!text-cyan-400 font-KanitBold"
        />
      </div>
    </nav>
  );
};

export default CharacterCustomization;
