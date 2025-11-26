import React, { useState } from "react";
import { BookOpen, Send, CheckCircle, AlertCircle, Info } from "lucide-react";

export default function TheaterActivity() {
  // Estado para armazenar as respostas
  const [answers, setAnswers] = useState({
    studentName: "",
    studentEmail: "",
    q1: "",
    q2a: "",
    q2b: "",
    q2c: "",
    q2d: "",
    q3a: "",
    q3b: "",
    q4: "",
    q5a: "",
    q5b: "",
    q5c: "",
    q5d: "",
    q6a: "",
    q6b: "",
    q7a: "",
    q7b: "",
    q7c: "",
    q8: "",
    q9a: "",
    q9b: "",
    q10a: "",
    q10b: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validação básica
    if (!answers.studentName.trim()) {
      setStatus({
        type: "error",
        message: "Por favor, informe seu nome completo!",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!answers.studentEmail.trim()) {
      setStatus({ type: "error", message: "Por favor, informe seu e-mail!" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(answers.studentEmail)) {
      setStatus({
        type: "error",
        message: "Por favor, informe um e-mail válido!",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "info", message: "Enviando respostas..." });

    try {
      // ------------------------------------------------------------------
      // ATENÇÃO PROFESSOR: COLE A URL DO SEU SCRIPT AQUI DENTRO DAS ASPAS
      // Exemplo: 'https://script.google.com/macros/s/AKfycbx.../exec'
      // ------------------------------------------------------------------
      const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbytstQNVWWo1IFtruDIQjVSB6Vr8Q1hsofxRLoFOomPyTFH7AuIU-8y_h5omQ0Fmuudbw/exec";

      if (!SCRIPT_URL) {
        throw new Error(
          "URL do script não configurada. Veja as instruções no final da página."
        );
      }

      // Usamos mode: 'no-cors' para evitar bloqueios do navegador.
      // Isso significa que não conseguimos ler a resposta JSON do servidor,
      // mas o envio funciona.
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...answers,
          timestamp: new Date().toLocaleString("pt-BR"),
        }),
      });

      // Sucesso
      setStatus({
        type: "success",
        message:
          "Atividade entregue com sucesso! O professor já recebeu suas respostas. ✓",
      });

      // Reseta o formulário após sucesso
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 500);
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message:
          "Erro ao enviar. Verifique se a URL do Script foi colada corretamente no código ou tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-20 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho da Escola */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-t-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold tracking-wider mb-2 uppercase">
              CEPI Matilde Margon Vaz
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-blue-100 text-sm">
              <span className="bg-blue-800/50 px-3 py-1 rounded-full">
                Professor: Jozimar
              </span>
              <span className="hidden md:inline">•</span>
              <span className="bg-blue-800/50 px-3 py-1 rounded-full">
                Disciplina: Língua Portuguesa
              </span>
              <span className="hidden md:inline">•</span>
              <span className="bg-blue-800/50 px-3 py-1 rounded-full">
                Série/Turma: 2ª A
              </span>
            </div>
          </div>

          <div className="border-t border-white/20 my-6"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-full">
                <BookOpen className="w-8 h-8 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  AVALIAÇÃO BIMESTRAL
                </h1>
                <p className="text-blue-200 font-medium">
                  4º Bimestre - Interpretação de Texto Teatral
                </p>
              </div>
            </div>
            <div className="bg-white/90 text-blue-900 px-6 py-2 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-transform">
              Valor: 5,0
            </div>
          </div>
        </div>

        {/* Corpo da Atividade */}
        <div className="bg-white rounded-b-lg shadow-xl p-6 md:p-8 mb-8">
          {/* Texto de Apoio */}
          <div className="bg-purple-50 rounded-xl p-6 md:p-8 mb-8 border border-purple-100">
            <div className="text-center mb-6">
              <span className="bg-purple-200 text-purple-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Texto Base
              </span>
              <h2 className="text-2xl font-bold text-purple-900 mt-3 mb-1">
                "O que os meninos pensam delas"
              </h2>
              <p className="text-purple-700 italic">Por Adélia Nicolete</p>
            </div>

            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4 font-serif">
              <p className="italic text-gray-500 bg-white/50 p-3 rounded text-sm border-l-2 border-purple-300">
                A ação se passa na sala de estar de um apartamento de classe
                média, num dos últimos andares. Um pôster de algum astro de
                música pop decora uma das paredes. As meninas fazem reverência a
                ele de vez em quando.
              </p>

              <p className="italic text-gray-500 bg-white/50 p-3 rounded text-sm border-l-2 border-purple-300">
                Sábado à tarde. Televisão, revistas espalhadas por todo o
                ambiente. Refrigerantes, salgadinhos, etc. A cena começa com
                Carol e Ana Paula acompanhando um clipe internacional de rock na
                TV, lendo a letra da música em uma revista. As duas cantam,
                dançam. De repente, Ana Paula emburra e desliga a TV.
              </p>

              <div className="pl-4 md:pl-8 space-y-3 my-6 border-l-4 border-purple-200">
                <p>
                  <strong className="text-purple-900">CAROL</strong> - Eh,
                  animal! Dá aqui esse controle remoto! O que foi agora, Ana
                  Paula?
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - Não se
                  faça de desentendida!
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong> - Eu tava
                  desafinando tanto assim?...
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - Não! É
                  que eu tô aqui toda amiguinha sua e me lembrei que eu devia
                  estar uma fera com você!
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong>{" "}
                  <span className="italic text-gray-500">
                    (liga novamente a TV, mais baixo)
                  </span>{" "}
                  - Fera comigo?! Tá louca? O que que eu fiz, Ana Paula?
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - Eu vou
                  embora!{" "}
                  <span className="italic text-gray-500">
                    (começa a juntar algumas revistas)
                  </span>
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong> - Como vai
                  embora? Sua mãe viajou! Vai ter que me aguentar o fim de
                  semana in-tei-ri-nho! E eu vou conversar até de madrugada,
                  você não vai conseguir dormir!!!{" "}
                  <span className="italic text-gray-500">
                    (gargalhada macabra)
                  </span>{" "}
                  Porque eu tenho insônia!!!!
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - E a
                  noite tá só começando...
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong>{" "}
                  <span className="italic text-gray-500">(Terrorista)</span> -
                  Eu tenho insônia!
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - Para!
                  Que terrorismo!{" "}
                  <span className="italic text-gray-500">
                    (procura algo nas revistas)
                  </span>{" "}
                  Insônia, insônia... Eu tenho a solução. Cadê? T'aqui: "um copo
                  de leite morno antes de dormir pode ajudar". Pronto. Você mama
                  e dorme.
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong> - Não
                  adianta copo de leite morno. É mal de família. Só dormimos
                  depois das três.
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - Se ao
                  menos usasse esse tempo pra estudar, garanto que tirava notas
                  melhores.
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong> - Começou a
                  humilhação. A vingança da CDF! Se eu não fosse sua amiga, Ana
                  Paula, juro que ia ser sua pior inimiga!
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - Amiga!
                  Que amiga?... Contar pro Toninho que eu tava a fim dele!?
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong> - Ah! É por
                  isso que você tá tão fula da vida?
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - Contou
                  ou não contou?
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong> - Contei, e
                  daí? Você não tava mesmo a fim do cara?
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - Tava!
                  Mas era segredo, entre mim e você! Cadê?{" "}
                  <span className="italic text-gray-500">
                    (procura nas revistas)
                  </span>{" "}
                  Ah! Essas revistas são a minha salvação! Achei!{" "}
                  <span className="italic text-gray-500">
                    (beija a revista)
                  </span>{" "}
                  Tem aqui uma coisa básica sobre paquera, escuta só: "Quando o
                  menino sabe que a menina tá a fim, a tendência é a relação
                  esfriar". E foi o que aconteceu! O Toninho começou a me
                  evitar!!!
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong> - Ai, Ana
                  Paula! Só quis ajudar, poxa... O cara também não se decidia!
                  Uma hora dava bola, outra hora, não... Cara indeciso...{" "}
                  <span className="italic text-gray-500">
                    (vai pegar a pipoca)
                  </span>
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - Eu
                  detesto isso, detesto! Deixa que eu resolvo as minhas coisas
                  do meu jeito!
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong>{" "}
                  <span className="italic text-gray-500">
                    (Carol dá de ombros, come pipoca)
                  </span>{" "}
                  - Só quis ajudar...
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> -
                  Dispenso a sua ajuda! Sempre que eu dou ouvidos pros seus
                  planos eu me ferro. Sempre! Eu não me abro mais com você,
                  Carol! Nunca mais!
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong>{" "}
                  <span className="italic text-gray-500">(se desculpando)</span>{" "}
                  - Puxa vida, Aninha, também não é pra tanto...
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - Cadê?{" "}
                  <span className="italic text-gray-500">
                    (procura nas revistas)
                  </span>{" "}
                  Onde tá? "Quando uma amiga rompe um segredo, isso, muitas
                  vezes, significa que poderá romper muitos outros. Cuidado!"
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong> - Ah, é?
                  Então vem cá.{" "}
                  <span className="italic text-gray-500">(procura também)</span>{" "}
                  Tá naquela que tem o Leo di Caprio...{" "}
                  <span className="italic text-gray-500">(encontra, lê)</span>{" "}
                  Escuta essa: "Amigas também erram. Se houve sinceridade por
                  tanto tempo, por que não perdoar um errinho de nada? Relaxe!"{" "}
                  <span className="italic text-gray-500">(mostra pra Ana)</span>{" "}
                  Tá vendo?{" "}
                  <span className="italic text-gray-500">
                    (oferece pipoca e abraço)
                  </span>
                </p>
                <p className="italic text-gray-500">
                  Ana Paula aceita o abraço. Fazem gestos de reconciliação com
                  as mãos.
                </p>
                <p>
                  <strong className="text-pink-900">ANA PAULA</strong> - Eu não
                  devia! Não vai demorar muito pra você aprontar outra das suas!
                  É do seu caráter...
                </p>
                <p>
                  <strong className="text-purple-900">CAROL</strong> - Enquanto
                  isso...
                </p>
                <p>
                  <strong className="text-gray-900">AS DUAS</strong> -
                  Anestesia!
                </p>
                <p className="italic text-gray-500">
                  As duas correm e se prostram em frente à TV por um tempo,
                  comem pipoca.
                </p>
              </div>

              <div className="text-xs text-gray-400 border-t pt-2 mt-4 text-center">
                Referência: Adélia Nicolete. O que os meninos pensam delas?.
                Acesso em: 14/6/2015.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
            <div className="bg-blue-600 text-white p-2 rounded-full">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900">Hora de Responder</h3>
              <p className="text-sm text-blue-700">
                Leia atentamente as perguntas e responda com base no texto
                acima.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Identificação */}
            <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className="bg-gray-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  ID
                </span>
                Identificação do Aluno
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={answers.studentName}
                    onChange={(e) =>
                      handleChange("studentName", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="Ex: Maria da Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={answers.studentEmail}
                    onChange={(e) =>
                      handleChange("studentEmail", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="Ex: aluno@email.com"
                  />
                </div>
              </div>
            </section>

            {/* Questão 1 */}
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-bold text-lg text-blue-900 mb-2">
                1. Tema da peça
              </h3>
              <p className="text-gray-700 mb-3 text-sm">
                Considerando o título da obra - "O que os meninos pensam delas?"
                -, levante hipóteses: Qual é, provavelmente, o tema da peça?
              </p>
              <textarea
                value={answers.q1}
                onChange={(e) => handleChange("q1", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                placeholder="Sua resposta..."
              />
            </div>

            {/* Questão 2 */}
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-t border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-4">
                2. Rubrica inicial
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    a. Em que lugar a cena acontecerá?
                  </label>
                  <input
                    type="text"
                    value={answers.q2a}
                    onChange={(e) => handleChange("q2a", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    b. Que personagens participarão da cena? Qual é a idade
                    delas? Comprove.
                  </label>
                  <textarea
                    value={answers.q2b}
                    onChange={(e) => handleChange("q2b", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none h-20"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    c. Qual é o nível social das personagens? Comprove.
                  </label>
                  <input
                    type="text"
                    value={answers.q2c}
                    onChange={(e) => handleChange("q2c", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    d. Conclua: Qual é o papel da rubrica no início desse texto?
                  </label>
                  <textarea
                    value={answers.q2d}
                    onChange={(e) => handleChange("q2d", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none h-20"
                  />
                </div>
              </div>
            </div>

            {/* Questão 3 */}
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-t border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-4">
                3. A encenação da história
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    a. Existe um narrador que conta o que acontece e o que as
                    personagens falam?
                  </label>
                  <input
                    type="text"
                    value={answers.q3a}
                    onChange={(e) => handleChange("q3a", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    b. De que modo a história se desenrola?
                  </label>
                  <input
                    type="text"
                    value={answers.q3b}
                    onChange={(e) => handleChange("q3b", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Questão 4 */}
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-t border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-2">
                4. Diálogos
              </h3>
              <p className="text-gray-700 mb-3 text-sm">
                No texto, os diálogos cumprem um papel fundamental. De que modo
                o autor indica quem está falando?
              </p>
              <textarea
                value={answers.q4}
                onChange={(e) => handleChange("q4", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
              />
            </div>

            {/* Questão 5 */}
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-t border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-4">
                5. Rubricas ao longo do texto
              </h3>
              <p className="text-gray-500 text-xs italic mb-4">
                Além da rubrica que introduz a peça, aparecem ao longo do texto
                outras rubricas, apresentadas sempre entre parênteses.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    a. Indica ação ou fato:
                  </label>
                  <input
                    type="text"
                    value={answers.q5a}
                    onChange={(e) => handleChange("q5a", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    b. Indica modo de falar:
                  </label>
                  <input
                    type="text"
                    value={answers.q5b}
                    onChange={(e) => handleChange("q5b", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    c. Indica som:
                  </label>
                  <input
                    type="text"
                    value={answers.q5c}
                    onChange={(e) => handleChange("q5c", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    d. Papel das rubricas:
                  </label>
                  <textarea
                    value={answers.q5d}
                    onChange={(e) => handleChange("q5d", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none h-24"
                  />
                </div>
              </div>
            </div>

            {/* Questão 6 */}
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-t border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-4">
                6. As personagens
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    a. Como elas se sentem? Por que se sentem assim?
                  </label>
                  <textarea
                    value={answers.q6a}
                    onChange={(e) => handleChange("q6a", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none h-20"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    b. Ana Paula revela estar magoada com Carol. Qual é o
                    motivo?
                  </label>
                  <textarea
                    value={answers.q6b}
                    onChange={(e) => handleChange("q6b", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none h-20"
                  />
                </div>
              </div>
            </div>

            {/* Questão 7 */}
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-t border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-4">
                7. As revistas
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    a. Que tipo de revista você imagina que as personagens leem?
                  </label>
                  <input
                    type="text"
                    value={answers.q7a}
                    onChange={(e) => handleChange("q7a", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    b. O que personagens como Ana Paula e Carol buscam nelas?
                  </label>
                  <textarea
                    value={answers.q7b}
                    onChange={(e) => handleChange("q7b", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none h-20"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    c. Elas parecem acreditar nos conselhos dados pela revista?
                  </label>
                  <input
                    type="text"
                    value={answers.q7c}
                    onChange={(e) => handleChange("q7c", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Questão 8 */}
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-t border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-2">
                8. "Anestesia!"
              </h3>
              <p className="text-gray-700 mb-3 text-sm">
                Levante hipóteses: O que elas querem dizer com essa palavra, no
                contexto?
              </p>
              <textarea
                value={answers.q8}
                onChange={(e) => handleChange("q8", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
              />
            </div>

            {/* Questão 9 */}
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-t border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-4">
                9. Linguagem das personagens
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    a. Como é a linguagem das personagens? Caracterize-a.
                  </label>
                  <textarea
                    value={answers.q9a}
                    onChange={(e) => handleChange("q9a", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none h-20"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    b. Essa linguagem coincide com a usada pelos adolescentes
                    hoje?
                  </label>
                  <textarea
                    value={answers.q9b}
                    onChange={(e) => handleChange("q9b", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none h-20"
                  />
                </div>
              </div>
            </div>

            {/* Questão 10 */}
            <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-t border-gray-100">
              <h3 className="font-bold text-lg text-blue-900 mb-4">
                10. Finalidade e público
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    a. Que finalidade a peça tem?
                  </label>
                  <textarea
                    value={answers.q10a}
                    onChange={(e) => handleChange("q10a", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none h-24"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    b. Que tipo de público ela tem como alvo?
                  </label>
                  <textarea
                    value={answers.q10b}
                    onChange={(e) => handleChange("q10b", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none h-24"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Área de Envio */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur shadow-lg border-t p-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {status.message && (
              <div
                className={`mb-3 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium animate-fade-in ${
                  status.type === "success"
                    ? "bg-green-100 text-green-800"
                    : status.type === "error"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : status.type === "error" ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <Info className="w-4 h-4" />
                )}
                {status.message}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`
                w-full md:w-auto px-12 py-3 rounded-full font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95
                ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed text-gray-200"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                }
              `}
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Enviando..." : "ENTREGAR AVALIAÇÃO"}
            </button>
          </div>
        </div>

        {/* Rodapé Instrutivo */}
        <div className="text-center text-gray-400 text-xs mt-8 pb-20">
          <p>Sistema desenvolvido para CEPI Matilde Margon Vaz</p>
          <p className="mt-2">
            Para o Professor: Certifique-se de configurar a variável{" "}
            <code className="bg-gray-200 px-1 rounded text-gray-600">
              SCRIPT_URL
            </code>{" "}
            no código.
          </p>
        </div>
      </div>
    </div>
  );
}
