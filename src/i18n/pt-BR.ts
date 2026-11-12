import type { SiteContent } from "./types";

export const ptBR: SiteContent = {
  meta: {
    title: "App Studio 42 — apps de código aberto sem rastreamento",
    description:
      "App Studio 42 faz apps de código aberto sem anúncios e sem rastreamento. Começamos pela linha Família: KidsHome e apps seguros para crianças e famílias.",
    ogLocale: "pt_BR",
  },
  a11y: {
    skip: "Pular para o conteúdo",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
    themeToLight: "Usar tema claro",
    themeToDark: "Usar tema escuro",
  },
  brand: {
    name: "App Studio 42",
    wordmark: "App Studio 42",
  },
  nav: [
    { label: "Princípios", href: "#principios" },
    { label: "Linhas", href: "#linhas" },
    { label: "KidsHome", href: "#kidshome" },
    { label: "Estúdios", href: "#estudios" },
  ],
  hero: {
    brand: "App Studio 42",
    title: "Código aberto.\nSem rastreamento.\nPara a vida real.",
    tagline:
      "Um estúdio de apps de código aberto para o dia a dia — sem anúncios, sem analytics, com código que você pode auditar.",
    ctaPrimary: "Conhecer KidsHome",
    ctaSecondary: "Ver no GitHub",
  },
  principles: {
    index: "01",
    eyebrow: "Princípios",
    title: "Feito com cuidado, construído para confiar.",
    subtitle:
      "Cada app começa com as mesmas regras: código aberto, dados locais e distribuição que você controla.",
    items: [
      {
        id: "open-source",
        title: "Código aberto",
        text: "Código público, licenças claras e contribuições bem-vindas. Você pode ler, modificar e auditar.",
      },
      {
        id: "privacy",
        title: "Privacidade primeiro",
        text: "Dados offline e locais quando possível. Sem analytics, sem rastreadores, sem telemetria escondida.",
      },
      {
        id: "free",
        title: "Gratuito e auditável",
        text: "Use sem pagar e sem surpresas. O que o app faz está no código — não em uma política opaca.",
      },
      {
        id: "distribute",
        title: "Lançamentos e, em breve, F-Droid",
        text: "Baixe pelos lançamentos do GitHub hoje. Estamos preparando a publicação no F-Droid.",
      },
    ],
  },
  lines: {
    index: "02",
    eyebrow: "Linhas de produto",
    title: "Começamos pela família. Outras linhas vêm depois.",
    subtitle:
      "Cada linha agrupa apps com o mesmo público. Família é a primeira; Utilitários e Produtividade virão a seguir.",
    availableLabel: "Disponível",
    plannedLabel: "Planejado",
    catalog: {
      family: {
        name: "Família",
        tagline: "Crianças e família",
        description:
          "Dispositivos seguros, tempo de tela, rotinas e IA adequada à idade — com os pais no controle.",
        apps: {
          kidshome: {
            name: "KidsHome",
            tagline: "Launcher infantil para Android e Fire",
            description:
              "Transforma um tablet ou celular em uma casa segura para crianças: só apps permitidos, limite diário de tela e área dos pais protegida por PIN. Funciona em tablets Amazon Fire (modo acessibilidade), como launcher padrão no Android e como kiosk Device Owner.",
            features: {
              pin: {
                title: "Área dos pais com PIN",
                text: "Escape de emergência e configurações protegidas por PIN, com bloqueio após tentativas.",
              },
              timeRing: {
                title: "Limite diário com anel de tempo",
                text: "O tempo restante aparece no anel da tela inicial. Quando acaba, a casa trava com cuidado.",
              },
              allowedApps: {
                title: "Só apps permitidos",
                text: "Monte a grade com o que a criança pode usar. O resto fica fora do alcance.",
              },
              material: {
                title: "Material 3 em pastéis",
                text: "Interface alegre em 5 idiomas (en, pt-BR, es, fr, de), com temas claro e escuro na área dos pais.",
              },
            },
            upcoming: {
              schedules: "Horários e janelas por dia",
              perApp: "Limites por app",
              stars: "Estrelas para ganhar tempo",
              report: "Relatório semanal local",
            },
            modes: {
              fire: "Amazon Fire via acessibilidade",
              launcher: "Launcher padrão no Android",
              kiosk: "Kiosk Device Owner",
            },
            screenshots: {
              kidHome: "Tela inicial infantil com apps e anel de tempo",
              screenTime: "Configuração de tempo de tela e horário de dormir",
              allowedApps: "Seleção de apps permitidos",
              pin: "Teclado PIN da área dos pais",
            },
            ctaDownload: "Baixar APK",
            ctaRepo: "Ver repositório",
            upcomingLabel: "Chegando na 1.4.0",
            modesLabel: "Modos de proteção",
            setupCaption: "Fluxo de configuração — PIN, apps, tempo de tela e modo criança",
          },
        },
        roadmapTitle: "Em breve na linha Família",
        roadmapHint: "Planejado — ainda não disponível",
        roadmap: {
          "kidshome-tv": {
            title: "KidsHome TV",
            text: "Perfis e tempo de tela para Android TV e Fire TV.",
          },
          "kid-safe-ai": {
            title: "Assistente de IA seguro",
            text: "Adequado à idade, controlado pelos pais, local ou com a sua própria chave — sem coletar dados de crianças.",
          },
          routines: {
            title: "Rotinas com estrelas",
            text: "App visual de rotinas diárias com recompensas em estrelas.",
          },
          "fire-setup-kit": {
            title: "Kit de configuração Fire",
            text: "Guia e ferramentas para preparar tablets Fire em minutos.",
          },
        },
      },
    },
  },
  sisters: {
    eyebrow: "Família 42",
    title: "Três estúdios, o mesmo espírito de código aberto.",
    subtitle: "App Studio 42 faz apps para o dia a dia. As irmãs cobrem jogos e engenharia B2B.",
    items: {
      gamestudio42: {
        blurb: "Jogos open source para navegador, desktop e celular.",
      },
      id42studio: {
        blurb: "Software e engenharia de IA para empresas.",
      },
    },
  },
  footer: {
    tagline: "Apps de código aberto sem rastreamento.",
    org: "Organização no GitHub",
    license: "Licença MIT",
    sistersLabel: "Estúdios irmãos",
    rights: "App Studio 42. Código do site sob MIT.",
  },
  notFound: {
    title: "Página não encontrada",
    text: "Esse caminho não existe neste site.",
    cta: "Voltar ao início",
  },
};
