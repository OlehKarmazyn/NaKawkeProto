import React from 'react';
import { Link } from 'react-router';
import { Navigation } from '@/app/components/layout/Navigation';
import { Footer } from '@/app/components/layout/Footer';
import { PageMeta } from '@/app/components/seo/PageMeta';
import { SITE_NAME } from '@/app/shared/constants/seo';

/**
 * Polityka prywatności — tylko po polsku, bez przełącznika języka.
 * Strona prawna, nie tłumaczona na EN/UK.
 */
export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <PageMeta
        title="Polityka Prywatności"
        description="Polityka prywatności serwisu Na Kawkę — informacje o przetwarzaniu danych osobowych, plikach cookies i prawach użytkownika."
        canonicalPath="/polityka-prywatnosci"
        robotsNoIndex
      />
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <article className="text-white/90" aria-label="Polityka prywatności">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Polityka Prywatności — Na Kawkę
              </h1>
              <p className="text-white/70 text-sm">
                <strong>Obowiązuje od:</strong> 25.02.2026
                <br />
                <strong>Ostatnia aktualizacja:</strong> 01.03.2026
              </p>
            </header>

            <section aria-labelledby="admin-heading" className="mb-12">
              <h2 id="admin-heading" className="text-2xl font-semibold text-white mb-4">
                I. Administrator danych osobowych
              </h2>
              <p className="mb-2">
                Administratorem Twoich danych osobowych jest:
              </p>
              <p className="mb-4 font-medium">
                Ihor Vovchuk
                <br />
                z siedzibą: 51-607 Wrocław, ul. Tadeusza Czackiego 57
                <br />
                NIP: 8982291752
              </p>
              <p className="mb-2">
                Kontakt w sprawach ochrony danych osobowych:
                <br />
                📧 nakawke.pl@gmail.com
              </p>
            </section>

            <section aria-labelledby="data-heading" className="mb-12">
              <h2 id="data-heading" className="text-2xl font-semibold text-white mb-4">
                II. Jakie dane zbieramy i w jakim celu?
              </h2>
              <h3 className="text-xl font-medium text-white mt-6 mb-2">
                Formularz kontaktowy
              </h3>
              <p className="mb-4">
                W związku z wysłaniem przez Ciebie zgłoszenia za pośrednictwem formularza
                kontaktowego na stronie <strong>nakawke.pl</strong> przetwarzamy następujące
                dane osobowe:
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#C0C0C0]/30">
                      <th className="text-left py-2 pr-4 font-semibold">Dane</th>
                      <th className="text-left py-2 pr-4 font-semibold">Cel przetwarzania</th>
                      <th className="text-left py-2 font-semibold">Podstawa prawna</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-[#C0C0C0]/20">
                      <td className="py-2 pr-4">Imię</td>
                      <td className="py-2 pr-4">Identyfikacja i personalizacja kontaktu</td>
                      <td className="py-2">Art. 6 ust. 1 lit. b RODO — działania przed zawarciem umowy / Art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes Administratora</td>
                    </tr>
                    <tr className="border-b border-[#C0C0C0]/20">
                      <td className="py-2 pr-4">Numer telefonu</td>
                      <td className="py-2 pr-4">Nawiązanie kontaktu w celu omówienia współpracy</td>
                      <td className="py-2">Art. 6 ust. 1 lit. b RODO / Art. 6 ust. 1 lit. f RODO</td>
                    </tr>
                    <tr className="border-b border-[#C0C0C0]/20">
                      <td className="py-2 pr-4">Adres e-mail</td>
                      <td className="py-2 pr-4">Nawiązanie kontaktu, przesłanie informacji zwrotnej</td>
                      <td className="py-2">Art. 6 ust. 1 lit. b RODO / Art. 6 ust. 1 lit. f RODO</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Podanie danych jest dobrowolne, jednak niezbędne do odpowiedzi na Twoje zgłoszenie.
              </p>
            </section>

            <section aria-labelledby="storage-heading" className="mb-12">
              <h2 id="storage-heading" className="text-2xl font-semibold text-white mb-4">
                III. Jak długo przechowujemy Twoje dane?
              </h2>
              <p className="mb-4">
                Twoje dane osobowe będą przechowywane przez okres niezbędny do obsługi Twojego
                zgłoszenia oraz przez czas wymagany przez przepisy prawa, nie dłużej jednak niż{' '}
                <strong>3 lata</strong> od daty ostatniego kontaktu, w celu ewentualnego dochodzenia
                lub obrony roszczeń.
              </p>
              <p>Po upływie tego okresu dane zostaną trwale usunięte.</p>
            </section>

            <section aria-labelledby="recipients-heading" className="mb-12">
              <h2 id="recipients-heading" className="text-2xl font-semibold text-white mb-4">
                IV. Komu przekazujemy Twoje dane?
              </h2>
              <p className="mb-4">
                Twoje dane osobowe mogą być przekazywane wyłącznie podmiotom, które przetwarzają
                je w naszym imieniu na podstawie umowy powierzenia przetwarzania danych (art. 28
                RODO). Są to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Dostawca hostingu i infrastruktury serwerowej</strong> — w celu
                  przechowywania danych (serwer PocketBase)
                </li>
                <li>
                  <strong>Komunikator Telegram</strong> — w celu natychmiastowego powiadomienia o
                  zgłoszeniu (dane są przesyłane w formie wiadomości do administratora konta;
                  Telegram Inc. działa zgodnie z własną polityką prywatności dostępną na
                  telegram.org)
                </li>
              </ul>
              <p className="mb-2">
                Twoje dane <strong>nie są</strong> sprzedawane ani udostępniane podmiotom trzecim
                w celach marketingowych.
              </p>
              <p>
                Twoje dane <strong>nie są</strong> przekazywane do państw trzecich poza Europejski
                Obszar Gospodarczy, z wyjątkiem infrastruktury Telegram, której serwery mogą
                znajdować się poza EOG — w takim przypadku transfer odbywa się na podstawie
                standardowych klauzul umownych zatwierdzonych przez Komisję Europejską.
              </p>
            </section>

            <section aria-labelledby="umami-heading" className="mb-12">
              <h2 id="umami-heading" className="text-2xl font-semibold text-white mb-4">
                V. Analityka — Umami
              </h2>
              <p className="mb-4">
                Na stronie <strong>nakawke.pl</strong> używamy narzędzia analitycznego{' '}
                <strong>Umami</strong> w wersji self-hosted (hostowanego na własnym serwerze).
                Umami zbiera wyłącznie anonimowe dane statystyczne dotyczące korzystania ze
                strony (np. liczba odwiedzin, typ urządzenia, kraj odwiedzającego).
              </p>
              <p>
                Umami <strong>nie używa plików cookies</strong> i{' '}
                <strong>nie przetwarza danych osobowych</strong> — zebrane dane są w pełni
                anonimowe i nie pozwalają na identyfikację konkretnego użytkownika. Z tego
                powodu korzystanie z Umami nie wymaga udzielenia zgody przez użytkownika.
              </p>
            </section>

            <section aria-labelledby="cookies-heading" className="mb-12">
              <h2 id="cookies-heading" className="text-2xl font-semibold text-white mb-4">
                VI. Pliki cookies
              </h2>
              <p className="mb-4">
                Strona <strong>nakawke.pl</strong> <strong>nie używa</strong> plików cookies
                (ciasteczek) do śledzenia użytkowników ani celów marketingowych.
              </p>
              <p>
                Jedyne techniczne mechanizmy przechowywania danych w przeglądarce to{' '}
                <code className="bg-white/10 px-1 rounded">localStorage</code> wykorzystywany do
                zapamiętania wybranego przez użytkownika języka interfejsu (PL / EN / UK). Nie
                stanowi to danych osobowych w rozumieniu RODO.
              </p>
            </section>

            <section aria-labelledby="rights-heading" className="mb-12">
              <h2 id="rights-heading" className="text-2xl font-semibold text-white mb-4">
                VII. Twoje prawa
              </h2>
              <p className="mb-4">
                Zgodnie z RODO przysługują Ci następujące prawa:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Prawo dostępu</strong> (art. 15 RODO) — masz prawo uzyskać informację, czy
                  i jakie Twoje dane przetwarzamy
                </li>
                <li>
                  <strong>Prawo do sprostowania</strong> (art. 16 RODO) — masz prawo żądać
                  poprawienia nieprawidłowych danych
                </li>
                <li>
                  <strong>Prawo do usunięcia</strong> (art. 17 RODO) — masz prawo żądać usunięcia
                  danych („prawo do bycia zapomnianym")
                </li>
                <li>
                  <strong>Prawo do ograniczenia przetwarzania</strong> (art. 18 RODO) — masz
                  prawo żądać ograniczenia przetwarzania Twoich danych
                </li>
                <li>
                  <strong>Prawo do przenoszenia danych</strong> (art. 20 RODO) — masz prawo
                  otrzymać swoje dane w ustrukturyzowanym formacie
                </li>
                <li>
                  <strong>Prawo do sprzeciwu</strong> (art. 21 RODO) — masz prawo wnieść sprzeciw
                  wobec przetwarzania danych opartego na prawnie uzasadnionym interesie
                </li>
                <li>
                  <strong>Prawo do skargi</strong> — masz prawo wnieść skargę do organu
                  nadzorczego, którym w Polsce jest{' '}
                  <strong>Prezes Urzędu Ochrony Danych Osobowych (UODO)</strong>, ul. Stawki 2,
                  00-193 Warszawa, www.uodo.gov.pl
                </li>
              </ul>
              <p className="mb-4">
                Aby skorzystać z przysługujących Ci praw, skontaktuj się z nami pod adresem
                e-mail: <strong>nakawke.pl@gmail.com</strong>
              </p>
              <p>
                Odpowiemy na Twoje żądanie bez zbędnej zwłoki, nie później niż w terminie{' '}
                <strong>30 dni</strong> od jego otrzymania.
              </p>
            </section>

            <section aria-labelledby="security-heading" className="mb-12">
              <h2 id="security-heading" className="text-2xl font-semibold text-white mb-4">
                VIII. Bezpieczeństwo danych
              </h2>
              <p>
                Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich
                danych osobowych przed nieuprawnionym dostępem, ujawnieniem, zmianą lub
                zniszczeniem. Dostęp do danych mają wyłącznie osoby upoważnione, zobowiązane do
                zachowania poufności.
              </p>
            </section>

            <section aria-labelledby="changes-heading" className="mb-12">
              <h2 id="changes-heading" className="text-2xl font-semibold text-white mb-4">
                IX. Zmiany w Polityce Prywatności
              </h2>
              <p>
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności.
                O wszelkich istotnych zmianach poinformujemy poprzez aktualizację daty w nagłówku
                dokumentu. Zalecamy regularne zapoznawanie się z treścią Polityki.
              </p>
            </section>

            <section aria-labelledby="contact-heading" className="mb-12">
              <h2 id="contact-heading" className="text-2xl font-semibold text-white mb-4">
                X. Kontakt
              </h2>
              <p>
                W razie pytań dotyczących przetwarzania Twoich danych osobowych prosimy o kontakt:
                <br />
                📧 <strong>nakawke.pl@gmail.com</strong>
                <br />
                ✉️ <strong>51-607 Wrocław, ul. Tadeusza Czackiego 57</strong>
              </p>
            </section>
          </article>

          <p className="mt-12 pt-6 border-t border-[#C0C0C0]/20">
            <Link to="/" className="text-[#C0C0C0] hover:text-white transition-colors">
              ← Powrót na stronę główną {SITE_NAME}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
