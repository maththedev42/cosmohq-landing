"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import Balancer from "react-wrap-balancer";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  LayoutDashboard,
  MessageCircle,
  Sparkles,
  Workflow,
} from "lucide-react";
import { motion, ease, fadeUp, stagger, staggerSlow } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { submitContactLead } from "@/lib/contact";

const CONTACT_EMAIL = "contato@cosmohq.org";
const WHATSAPP_URL =
  "https://wa.me/5551980602335?text=Ol%C3%A1%20CosmoHQ!%20Quero%20conversar%20sobre%20um%20projeto.";

const navItems = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Produtos", href: "/produtos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Fale com a gente", href: "#contato" },
  { label: "Teste fechado", href: "/teste-fechado" },
];

const steps = [
  {
    id: "01",
    title: "Entender o problema",
    description:
      "Começamos ouvindo o contexto do negócio, o objetivo e o que precisa mudar para a ideia virar algo útil no digital.",
    detail:
      "Menos achismo. Mais clareza sobre público, oferta e prioridade.",
    icon: LayoutDashboard,
  },
  {
    id: "02",
    title: "Construir a solução",
    description:
      "Desenhamos e executamos apps, sites e sistemas, além da presença nas redes sociais, com acabamento profissional e foco em conversão.",
    detail:
      "Estratégia e execução caminham juntas, sem separar o que gera valor do que entrega valor.",
    icon: Workflow,
  },
  {
    id: "03",
    title: "Analisar e melhorar",
    description:
      "Acompanhamos o que está funcionando, lemos os dados e ajustamos continuamente para aumentar o impacto de cada decisão.",
    detail:
      "O diferencial da CosmoHQ é usar inteligência para evoluir a solução depois que ela entra no ar.",
    icon: BarChart3,
  },
];

const portfolio = [
  {
    name: "CosmoKit",
    label: "App para macOS",
    problem:
      "Testar apps no Simulador do iOS vira um malabarismo de comandos de terminal e ferramentas espalhadas.",
    result:
      "Um app nativo para macOS que centraliza o QA no Simulador: push, deep links, captura de tela, simulação de rota e inspeção de rede.",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/cc/6d/9b/cc6d9b44-5035-0cba-74de-fac58981db3a/screenshot_1.png/800x500bb.jpg",
    links: [{ label: "Ver na App Store", url: "https://apps.apple.com/br/app/cosmokit-tools/id6756494471?mt=12" }],
    contain: false,
    bullets: ["Vários simuladores", "Captura e gravação", "Proxy e localização"],
  },
  {
    name: "CosmoFinanças",
    label: "App para iPhone e iPad",
    problem:
      "Como organizar a visão financeira sem depender de planilhas confusas?",
    result:
      "Uma experiência visual para enxergar o cenário com rapidez e tomar decisões com mais confiança.",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/50/19/c5/5019c5e6-a5e5-0948-6134-f20c12d8af79/screenshot_2.png/576x768bb.png",
    links: [{ label: "Ver na App Store", url: "https://apps.apple.com/br/app/cosmo-finan%C3%A7as/id6758966021" }],
    contain: true,
    bullets: ["Clareza para o dia a dia", "Decisão mais rápida", "Uso real como referência"],
  },
  {
    name: "LifeManager",
    label: "App para iPhone e Android",
    problem:
      "Organizar e priorizar as tarefas e atividades do dia a dia sem perder o foco no que importa.",
    result:
      "Um gerenciador de tarefas, hábitos e metas com estrutura hierárquica e progresso gamificado para manter a rotina sob controle.",
    image: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/04/6e/03/046e0331-11ce-c285-6d0a-1d088c9a195a/screenshot_1.png/576x768bb.png",
    links: [{ label: "Ver na App Store", url: "https://apps.apple.com/br/app/lifemanager/id6761347791" }],
    contain: true,
    bullets: ["Criação rápida de tarefas", "Hábitos e metas", "Progresso gamificado"],
  },
  {
    name: "CosmoRemote",
    label: "App para iPhone e Android",
    problem:
      "Como acompanhar e controlar sessões de IA no seu Mac sem ficar preso à mesa?",
    result:
      "Um app que leva o terminal do Mac para o bolso: acompanhe e comande sessões do Claude Code e do Codex em tempo real.",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/9a/5a/16/9a5a1632-6882-e6be-461c-7fd138e23909/screenshot_1.png/576x768bb.png",
    links: [
      { label: "Ver na App Store", url: "https://apps.apple.com/br/app/cosmoremote/id6761442464" },
      { label: "Ver no Google Play", url: "https://play.google.com/store/apps/details?id=com.cosmohq.cosmoremote" },
    ],
    contain: true,
    bullets: ["Pareamento por QR", "Streaming em tempo real", "Sessões em paralelo"],
  },
  {
    name: "Cosa Nostra",
    label: "App para iPhone e iPad",
    problem:
      "Entrar com uma ação sem saber como o juiz costuma decidir nem o histórico da parte contrária.",
    result:
      "Inteligência jurídica a partir de dados públicos oficiais do DJEN: estatísticas de decisão por juízo, padrões de sentença e histórico das partes.",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/a5/36/70/a536706d-b662-20ef-b2b6-abed8aa347de/screenshot_1.png/320x480bb.jpg",
    links: [{ label: "Ver na App Store", url: "https://apps.apple.com/br/app/cosa-nostra/id6763812183" }],
    contain: true,
    bullets: ["Conheça seu juiz", "Padrões de sentença", "Dados oficiais do DJEN"],
  },
  {
    name: "CosmoKit CLI",
    label: "Ferramenta open source",
    problem:
      "As operações do Simulador ficam presas à interface e não entram em Makefiles, hooks nem pipelines de CI.",
    result:
      "Uma CLI que liga, fotografa, grava, muda a localização e abre deep links no Simulador do iOS direto do terminal.",
    command: "brew install maththedev42/tap/cosmokit",
    links: [{ label: "Ver no GitHub", url: "https://github.com/maththedev42/cosmokit-cli" }],
    contain: false,
    bullets: ["Homebrew", "Scripts e CI", "Binário universal"],
  },
  {
    name: "Cosmo Travel MCP",
    label: "Ferramenta open source",
    problem:
      "Comparar os roteiros possíveis de uma viagem exige dezenas de cotações — e uma planilha em que os números do topo já envelheceram antes dos de baixo.",
    result:
      "Onze ferramentas MCP que cotam voos, hospedagem, eventos e trajetos numa rodada só, devolvendo cada preço com a fonte, a data e a faixa de referência da rota.",
    image: "/products/mcp-dossier-1.png",
    links: [{ label: "Ver no GitHub", url: "https://github.com/maththedev42/cosmo-travel-mcp" }],
    contain: false,
    bullets: ["Todo número com procedência", "Roteiros comparados lado a lado", "Vigília semanal de preço"],
  },
];

const differentials = [
  "Entregamos rápido sem abrir mão de qualidade",
  "Usamos dados para tomar decisões melhores",
  "Comunicação direta — sem reuniões intermináveis",
  "Somos clientes dos nossos próprios produtos",
];

const heroHighlights = [
  "Apps, sites e sistemas pensados para o seu negócio",
  "Redes sociais com direção e consistência",
  "Decisões orientadas por dados, sem achismo",
];

function SectionTitle({
  eyebrow,
  title,
  description,
  centered = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      variants={fadeUp}
      transition={{ duration: 0.65, ease }}
      className={cn("max-w-3xl", centered ? "mx-auto text-center" : "text-left")}
    >
      <Badge variant="secondary" className={cn("mb-5 w-fit", centered && "mx-auto")}>
        {eyebrow}
      </Badge>
      <h2 className="text-balance text-[2rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[2.8rem] lg:text-[4rem]">
        <Balancer>{title}</Balancer>
      </h2>
      <p className="mt-5 text-pretty text-base leading-7 text-white/68 sm:text-lg">
        <Balancer>{description}</Balancer>
      </p>
    </motion.div>
  );
}

function HeroImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden border border-white/10 bg-black/20", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized
        className="object-cover"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    </div>
  );
}

export default function CosmoLanding() {
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactMessage, setContactMessage] = useState<string | null>(null);

  async function submitBriefing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const projectType = String(formData.get("projectType") ?? "").trim();
    const objective = String(formData.get("objective") ?? "").trim();

    setContactStatus("sending");
    setContactMessage(null);

    try {
      const result = await submitContactLead({
        name,
        projectType,
        objective,
        source: "landing:hero",
        pageUrl: window.location.href,
      });

      form.reset();
      setContactStatus("success");
      setContactMessage(result.message ?? "Recebemos seu briefing. Vamos responder em breve.");
    } catch (error) {
      setContactStatus("error");
      setContactMessage(error instanceof Error ? error.message : "Não foi possível enviar o briefing.");
    }
  }

  return (
    <div id="top" className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,152,219,0.2),transparent_32%),radial-gradient(circle_at_80%_12%,rgba(241,196,15,0.14),transparent_18%),radial-gradient(circle_at_15%_18%,rgba(231,76,60,0.12),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background:linear-gradient(180deg,rgba(255,255,255,0.04),transparent_18%)]" />

      <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#121719]/80 px-5 py-3 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3498db,#5abaf5,#f1c40f)] text-sm font-semibold text-white shadow-[0_14px_40px_-16px_rgba(52,152,219,0.9)]">
              C
            </span>
            <div>
              <div className="text-sm font-semibold tracking-[0.24em] text-white">
                COSMOHQ
              </div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/46">
                Agência digital
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-white/68 transition hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contato"
            className={buttonVariants({
              size: "sm",
              className: "hidden sm:inline-flex",
            })}
          >
            Fale com a gente
            <ArrowRight className="size-4" />
          </a>
        </div>
      </header>

      <main>
        <section className="section-shell noise-overlay relative px-4 pb-18 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:items-center">
            <motion.div className="relative z-10" initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <Badge variant="secondary" className="mb-6 bg-white/6">
                  <Sparkles className="size-3.5" />
                  Estratégia, execução e inteligência de dados
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="max-w-4xl text-[2.95rem] font-semibold leading-[0.94] tracking-[-0.07em] text-white sm:text-[4.2rem] lg:text-[5.7rem]"
              >
                <Balancer>Sua ideia no digital. Do jeito certo.</Balancer>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-pretty text-base leading-8 text-white/72 sm:text-lg"
              >
                <Balancer>
                  A CosmoHQ transforma ideias em produtos e presença online.
                  Construímos apps, sites e sistemas, cuidamos das redes
                  sociais e usamos dados para garantir que cada decisão gere o
                  maior impacto possível.
                </Balancer>
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-3">
                {heroHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/72"
                  >
                    {item}
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contato"
                  className={buttonVariants({
                    size: "lg",
                    className: "ambient-glow",
                  })}
                >
                  Fale com a gente
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#como-funciona"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  })}
                >
                  Ver o que fazemos
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease }}
              className="relative"
            >
              <div className="hero-orbit absolute -left-20 top-8 h-60 w-60 rounded-full" />
              <div className="hero-orbit absolute -right-12 bottom-0 h-64 w-64 rounded-full opacity-70" />

              <div className="editorial-panel ring-gradient relative overflow-hidden rounded-[40px] p-4 sm:p-5">
                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <HeroImage
                    src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/f5/44/e8/f544e8a5-7be4-1f6c-f1ad-d9f50972ceda/screenshot_1.png/576x768bb.png"
                    alt="CosmoFinanças — visão geral do mês"
                    priority
                    className="aspect-[4/4.6] rounded-[30px]"
                  />

                  <div className="grid gap-4">
                    <HeroImage
                      src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/7c/f7/85/7cf78523-e85b-e061-5fa6-27988f8e86bc/screenshot_2.png/800x500bb.jpg"
                      alt="CosmoKit — simulação de rotas e localização"
                      className="aspect-[4/3] rounded-[30px]"
                    />

                    <Card className="rounded-[30px] border-white/10 bg-[#101518]/90">
                      <CardContent className="space-y-4 p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.22em] text-white/44">
                              Nosso diferencial
                            </p>
                            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                              Dados antes de opinião.
                            </h3>
                          </div>
                          <Check className="mt-1 size-5 text-brand-success" />
                        </div>

                        <div className="space-y-3">
                          {[
                            "Ajustamos a solução com base no que está funcionando.",
                            "Falamos direto, com foco no que move o negócio.",
                            "Nós mesmos usamos os produtos que construímos.",
                          ].map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-3 text-sm leading-6 text-white/72"
                            >
                              <Check className="mt-1 size-4 text-brand-success" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="glass-panel rounded-[30px]">
                      <CardContent className="p-5">
                        <div className="text-xs uppercase tracking-[0.22em] text-white/42">
                          Foco
                        </div>
                        <div className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
                          Resultado real.
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/66">
                          Projetos pensados para negócios que precisam sair do
                          rascunho e ganhar tração.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="glass-panel rounded-[30px]">
                      <CardContent className="p-5">
                        <div className="text-xs uppercase tracking-[0.22em] text-white/42">
                          Ritmo
                        </div>
                        <div className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
                          Sem reunião infinita.
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/66">
                          Comunicação direta para acelerar decisão e execução.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="glass-panel rounded-[30px]">
                    <CardContent className="grid gap-4 p-5 sm:grid-cols-[1fr_1.1fr]">
                      <div className="relative overflow-hidden rounded-[24px] border border-white/10">
                        <Image
                          src="https://images.pexels.com/photos/6476776/pexels-photo-6476776.jpeg"
                          alt="Pessoa apresentando dados em uma tela"
                          width={900}
                          height={1200}
                          unoptimized
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-[0.22em] text-white/42">
                            O que entregamos
                          </div>
                          <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">
                            Apps, sites, sistemas e presença online.
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-white/66">
                            Uma agência para quem precisa de estratégia,
                            execução e leitura de dados no mesmo lugar.
                          </p>
                        </div>
                        <a
                          href="#portfolio"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition hover:text-white"
                        >
                          Ver cases
                          <ArrowUpRight className="size-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="como-funciona" className="section-shell px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Como funciona"
              title="Entender, construir, analisar e melhorar."
              description="É assim que a CosmoHQ trabalha: primeiro compreende o problema, depois executa a solução e, por fim, acompanha os resultados para melhorar continuamente."
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              className="mt-14 grid gap-4 lg:grid-cols-3"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease, delay: index * 0.05 }}
                >
                  <Card className="spotlight-border group hover-lift h-full rounded-[30px]">
                    <CardContent className="flex h-full flex-col gap-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/42">
                          {step.id}
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/6 p-3 text-brand-primary transition duration-300 group-hover:scale-[1.03]">
                          <step.icon className="size-5" />
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col">
                        <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-base leading-7 text-white/66">
                          {step.description}
                        </p>
                        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/70">
                          {step.detail}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="portfolio" className="section-shell px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Portfólio"
              title="Casos reais com os próprios produtos da CosmoHQ."
              description="Os exemplos abaixo mostram o problema que cada solução resolve e o contexto em que ela faz diferença, sem foco na tecnologia por trás."
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.22 }}
              variants={staggerSlow}
              className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {portfolio.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease, delay: index * 0.05 }}
                >
                  <Card className="spotlight-border hover-lift flex h-full flex-col overflow-hidden rounded-[30px]">
                    <div
                      className={cn(
                        "relative aspect-[4/3] overflow-hidden border-b border-white/10",
                        item.contain && "bg-white"
                      )}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          unoptimized
                          className={item.contain ? "object-contain" : "object-cover"}
                          sizes="(min-width: 1024px) 33vw, 100vw"
                        />
                      ) : (
                        <div className="flex h-full items-center bg-[#0d0f10] p-6">
                          <code className="font-mono text-sm leading-7 text-brand-primary">
                            <span className="text-white/40">$ </span>
                            {item.command}
                          </code>
                        </div>
                      )}
                    </div>
                    <CardContent className="flex flex-1 flex-col gap-5">
                      <div className="flex items-center justify-between gap-4">
                        <Badge variant="secondary">{item.label}</Badge>
                        <ArrowUpRight className="size-4 text-white/40" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                          {item.name}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-white/66">
                          <span className="text-white/82">Problema:</span> {item.problem}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/66">
                          <span className="text-white/82">Resultado:</span> {item.result}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.bullets.map((bullet) => (
                          <span
                            key={bullet}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/68"
                          >
                            {bullet}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
                        {item.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary transition hover:text-white"
                          >
                            {link.label}
                            <ArrowUpRight className="size-4" />
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="mt-4 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]"
            >
              <Card className="glass-panel rounded-[30px]">
                <CardContent className="grid gap-4 sm:grid-cols-3">
                  <div className="relative overflow-hidden rounded-[24px] border border-white/10">
                    <Image
                      src="https://images.unsplash.com/photo-1601933974703-d25155828f40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w5MDk4MzF8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGNvbXB1dGVyfGVufDB8MHx8fDE3NzQ4MDU5MzV8MA&ixlib=rb-4.1.0&q=85"
                      alt="Pessoa trabalhando em um computador"
                      width={800}
                      height={1200}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[24px] border border-white/10">
                    <Image
                      src="https://images.pexels.com/photos/1647904/pexels-photo-1647904.jpeg"
                      alt="Dupla trabalhando em uma discussão positiva"
                      width={800}
                      height={1200}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[24px] border border-white/10">
                    <Image
                      src="https://images.pexels.com/photos/6476776/pexels-photo-6476776.jpeg"
                      alt="Profissional apresentando dados"
                      width={800}
                      height={1200}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel rounded-[30px]">
                <CardContent className="flex h-full flex-col justify-between gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-white/42">
                      Nosso jeito de mostrar valor
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                      Resultado e contexto, não tecnologia por tecnologia.
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/66">
                      O portfólio da CosmoHQ existe para mostrar o problema que
                      cada solução resolve, como ela entra na rotina do negócio
                      e por que faz diferença no resultado final.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Casos feitos com produtos próprios",
                      "Narrativa centrada no uso real",
                      "Sem promessa vazia ou enfeite técnico",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/72"
                      >
                        <Check className="mt-1 size-4 text-brand-success" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="diferenciais" className="section-shell px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Diferenciais"
              title="Quatro motivos para a CosmoHQ ser uma parceira útil de verdade."
              description="A proposta é simples: entregar rápido, decidir melhor, falar direto e trabalhar com a experiência de quem usa os próprios produtos."
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.22 }}
              variants={stagger}
              className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {differentials.map((item, index) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease, delay: index * 0.05 }}
                >
                  <Card className="spotlight-border group hover-lift h-full rounded-[30px]">
                    <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                      <Check className="size-8 text-brand-success" />
                      <h3 className="mt-4 text-base font-semibold tracking-[-0.03em] text-white">
                        {item}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="contato" className="section-shell px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="CTA final"
              title="Tem um projeto em mente? Vamos conversar."
              description="Chame a CosmoHQ no WhatsApp ou envie um briefing curto com nome, tipo de projeto e objetivo."
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="mt-14 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]"
            >
              <motion.div variants={fadeUp}>
                <Card className="editorial-panel h-full rounded-[32px]">
                  <CardContent className="flex h-full flex-col gap-6">
                    <div>
                      <Badge variant="success" className="mb-4">
                        Conversa direta
                      </Badge>
                      <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white">
                        Conte a ideia, o resto a gente organiza.
                      </h3>
                      <p className="mt-3 text-base leading-7 text-white/66">
                        Se você já tem o problema claro, a conversa vai ser
                        objetiva. Se a ideia ainda estiver no começo, o
                        formulário ajuda a estruturar o pedido sem fricção.
                      </p>
                    </div>

                    <a
                    href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({
                        size: "lg",
                        className:
                          "w-full bg-[linear-gradient(135deg,#25d366,#128c7e)] shadow-[0_18px_45px_-18px_rgba(37,211,102,0.55)] hover:brightness-110",
                      })}
                    >
                      <MessageCircle className="size-4" />
                      Abrir WhatsApp
                    </a>

                    <div className="rounded-[28px] border border-white/10 bg-black/12 p-5 text-sm leading-7 text-white/66">
                      A CosmoHQ trabalha como agência digital para transformar
                      ideias em produtos e presença online com estratégia,
                      execução e dados.
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Card className="hover-lift h-full rounded-[32px]">
                  <CardContent className="p-6 sm:p-7">
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                      Envie um briefing curto
                    </h3>
                    <p className="mt-2 text-sm text-white/56">
                      Três campos, sem burocracia.
                    </p>

                    <form onSubmit={submitBriefing} className="mt-8 space-y-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-2 block text-sm font-medium text-white/78"
                        >
                          Nome
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          placeholder="Como podemos te chamar?"
                          className="h-12 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-white placeholder:text-white/30 transition focus:border-brand-primary/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-project"
                          className="mb-2 block text-sm font-medium text-white/78"
                        >
                          Tipo de projeto
                        </label>
                        <select
                          id="contact-project"
                          name="projectType"
                          required
                          defaultValue=""
                          className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-white transition focus:border-brand-primary/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 [&:invalid]:text-white/32 [&>option]:bg-cosmo-bg [&>option]:text-white"
                        >
                          <option value="" disabled>
                            Selecione uma opção
                          </option>
                          <option value="App">App</option>
                          <option value="Site">Site</option>
                          <option value="Sistema">Sistema</option>
                          <option value="Redes sociais">Redes sociais</option>
                          <option value="Projeto completo">Projeto completo</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-objective"
                          className="mb-2 block text-sm font-medium text-white/78"
                        >
                          Objetivo
                        </label>
                        <textarea
                          id="contact-objective"
                          name="objective"
                          required
                          rows={4}
                          placeholder="O que você quer alcançar com esse projeto?"
                          className="w-full resize-none rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/30 transition focus:border-brand-primary/50 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={contactStatus === "sending"}
                        className={buttonVariants({
                          size: "lg",
                          className: "w-full disabled:pointer-events-none disabled:opacity-70",
                        })}
                      >
                        {contactStatus === "sending" ? "Enviando..." : "Enviar briefing"}
                        <ArrowRight className="size-4" />
                      </button>

                      {contactMessage && (
                        <p className={`text-center text-xs ${contactStatus === "error" ? "text-rose-300" : "text-emerald-300"}`}>
                          {contactMessage}
                        </p>
                      )}

                      <p className="text-center text-xs text-white/42">
                        Envia direto para {CONTACT_EMAIL}
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <footer className="section-shell px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Card className="editorial-panel rounded-[34px]">
              <CardContent className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,0.5fr))] md:gap-8">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#3498db,#5abaf5,#f1c40f)] text-white shadow-[0_14px_40px_-16px_rgba(52,152,219,0.8)]">
                      C
                    </div>
                    <div>
                      <div className="text-lg font-semibold tracking-[-0.04em] text-white">
                        CosmoHQ
                      </div>
                      <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                        Agência digital
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 max-w-lg text-base leading-7 text-white/64">
                    Transformamos ideias em produtos e presença online com
                    estratégia, execução e inteligência de dados.
                  </p>
                </div>

                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/42">
                    Navegação
                  </div>
                  <div className="mt-4 space-y-3">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block text-sm text-white/64 transition hover:text-white"
                      >
                        {item.label}
                      </a>
                    ))}
                    <a
                      href="/privacidade"
                      className="block text-sm text-white/64 transition hover:text-white"
                    >
                      Política de Privacidade
                    </a>
                    <a
                      href="/termos"
                      className="block text-sm text-white/64 transition hover:text-white"
                    >
                      Termos de Uso
                    </a>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/42">
                    Contato
                  </div>
                  <div className="mt-4 space-y-3">
                    <a
                      href="mailto:contato@cosmohq.org"
                      className="flex items-center gap-2 text-sm text-white/64 transition hover:text-white"
                    >
                      contato@cosmohq.org
                      <ArrowUpRight className="size-3.5" />
                    </a>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-white/64 transition hover:text-white"
                    >
                      WhatsApp
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </CardContent>

              <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-6 text-sm text-white/42 md:flex-row md:items-center md:justify-between md:px-7">
                <div>&copy; {new Date().getFullYear()} CosmoHQ. Todos os direitos reservados.</div>
                <div>Agência digital para transformar ideias em resultado real.</div>
              </div>
            </Card>
          </div>
        </footer>
      </main>
    </div>
  );
}
