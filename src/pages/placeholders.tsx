import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { site } from '@/content/site';

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
  return (
    <section className='px-5 py-24 sm:px-8 lg:px-10 lg:py-32'>
      <div className='mx-auto max-w-[var(--max-width-page)]'>
        <p className='mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
          {eyebrow}
        </p>
        <h1 className='max-w-4xl text-4xl font-light leading-tight tracking-tight sm:text-6xl lg:text-7xl'>
          {title}
        </h1>
        <p className='mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
          {description}
        </p>
        <Button asChild className='mt-10'>
          <Link to='/kontakt'>
            {site.primaryCta}
            <ArrowUpRight aria-hidden='true' />
          </Link>
        </Button>
      </div>
    </section>
  );
}

type LegalLayoutProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

function LegalLayout({ eyebrow, title, intro, children }: LegalLayoutProps) {
  return (
    <section className='bg-background px-5 py-24 text-foreground sm:px-8 sm:py-28 lg:px-10 lg:py-36'>
      <article className='mx-auto grid max-w-[var(--max-width-page)] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-20'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
            {eyebrow}
          </p>
          <h1 className='mt-4 max-w-2xl text-[clamp(2.75rem,7vw,6rem)] font-light leading-[0.94] tracking-[-0.05em] text-foreground'>
            {title}
          </h1>
          <p className='mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg'>
            {intro}
          </p>
        </header>

        <div className='grid gap-10 border-t border-border pt-8 text-base leading-relaxed text-foreground/85 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0'>
          {children}
        </div>
      </article>
    </section>
  );
}

function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={title.toLowerCase().replaceAll(' ', '-')}>
      <h2
        id={title.toLowerCase().replaceAll(' ', '-')}
        className='font-display text-2xl font-light leading-tight tracking-[-0.025em] text-foreground sm:text-3xl'
      >
        {title}
      </h2>
      <div className='mt-4 space-y-3 text-muted-foreground'>{children}</div>
    </section>
  );
}

export function ImpressumPage() {
  return (
    <LegalLayout
      eyebrow='Rechtliches'
      title='Impressum.'
      intro='Anbieterkennzeichnung gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Medienstaatsvertrag (MStV).'
    >
      <LegalSection title='Angaben gemäß § 5 DDG'>
        <p>Julian Frey</p>
        <p>UpSocial by JF</p>
        <p>Maria-Theresia-Str. 7</p>
        <p>81675 München</p>
        <p>Deutschland</p>
      </LegalSection>

      <LegalSection title='Kontakt'>
        <p>
          Telefon:{' '}
          <a href='tel:+4917621384822' className='underline-offset-4 hover:underline'>
            +49 176 21384822
          </a>
        </p>
        <p>
          E-Mail:{' '}
          <a href='mailto:info@up-social.de' className='underline-offset-4 hover:underline'>
            info@up-social.de
          </a>
        </p>
      </LegalSection>

      <LegalSection title='Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV'>
        <p>Julian Frey</p>
        <p>Maria-Theresia-Str. 7</p>
        <p>81675 München</p>
        <p>Deutschland</p>
      </LegalSection>

      <LegalSection title='EU-Streitschlichtung'>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href='https://ec.europa.eu/consumers/odr/'
            target='_blank'
            rel='noreferrer noopener'
            className='underline-offset-4 hover:underline'
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse findest du oben im Impressum.
        </p>
      </LegalSection>

      <LegalSection title='Verbraucherstreitbeilegung'>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export function DatenschutzPage() {
  return (
    <LegalLayout
      eyebrow='Datenschutz'
      title='Datenschutzerklärung.'
      intro='Kurz, lesbar und als Platzhalter markiert, bis Hosting, Analytics und Kontaktdaten final bestätigt sind.'
    >
      <LegalSection title='Verantwortlicher'>
        <p>Julian Frey, UpSocial by JF</p>
        <p>[Adresse ergänzen]</p>
        <p>E-Mail: info@up-social.de</p>
      </LegalSection>

      <LegalSection title='Zugriffsdaten und Hosting'>
        <p>
          Beim Besuch dieser Website können technische Zugriffsdaten verarbeitet werden, zum
          Beispiel IP-Adresse, Zeitpunkt des Abrufs, Browsertyp und angefragte Seite. Die
          Verarbeitung dient dem stabilen und sicheren Betrieb der Website.
        </p>
        <p>[Hosting-Anbieter und Speicherfristen ergänzen]</p>
      </LegalSection>

      <LegalSection title='Kontaktaufnahme'>
        <p>
          Wenn du per WhatsApp, Instagram oder E-Mail Kontakt aufnimmst, werden die von dir
          übermittelten Daten zur Bearbeitung deiner Anfrage verarbeitet. Die Daten werden nicht
          ohne Anlass an Dritte weitergegeben.
        </p>
      </LegalSection>

      <LegalSection title='Analytics'>
        <p>
          Falls Umami oder ein vergleichbares datenschutzfreundliches Analytics-Tool eingesetzt
          wird, wird dieser Abschnitt mit Anbieter, Zweck, Rechtsgrundlage und Opt-out-Hinweis
          ergänzt.
        </p>
      </LegalSection>

      <LegalSection title='Deine Rechte'>
        <p>
          Du hast nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung
          der Verarbeitung, Datenübertragbarkeit und Beschwerde bei einer
          Datenschutzaufsichtsbehörde.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export function NotFoundPage() {
  return (
    <section className='bg-background px-5 py-24 text-foreground sm:px-8 sm:py-28 lg:px-10 lg:py-36'>
      <div className='mx-auto grid max-w-[var(--max-width-page)] gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-end'>
        <Link
          to='/'
          className='inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-[var(--accent-readable)]'
        >
          <ArrowLeft aria-hidden='true' className='size-4' />
          Zur Startseite
        </Link>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
            404
          </p>
          <h1 className='mt-4 max-w-4xl text-[clamp(3rem,8vw,7rem)] font-light leading-[0.94] tracking-[-0.05em] text-foreground'>
            Diese Seite gibt es nicht.
          </h1>
          <p className='mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
            Der Weg ist falsch abgebogen. Die Galerie und die Leistungsseiten sind weiterhin da.
          </p>
          <div className='mt-10 flex flex-col gap-3 sm:flex-row'>
            <Button asChild>
              <Link to='/galerie'>Zur Galerie</Link>
            </Button>
            <Button asChild variant='outline'>
              <Link to='/leistungen'>
                Leistungen ansehen
                <ArrowUpRight aria-hidden='true' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
