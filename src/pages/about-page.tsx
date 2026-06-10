import { CTABanner } from '@/components/layout/cta-banner';
import { MotionInView } from '@/components/motion/motion-in-view';
import { founder } from '@/content/founder';

const longParagraphs = [
  'Ich heiße Julian Frey und komme aus München.',
  'Schon lange bevor ich mit Fotografie Geld verdient habe, war die Kamera mein ständiger Begleiter. Menschen haben mir immer wieder gesagt, dass ich ein Auge für Bilder habe – für Perspektiven, Stimmungen und die kleinen Details, die andere oft übersehen. Irgendwann wurde mir klar: Das ist nicht nur ein Hobby. Das ist das, was ich wirklich machen möchte.',
  'Für mich ist Fotografie kein Beruf, sondern eine Leidenschaft. Ich liebe es, Geschichten sichtbar zu machen und Marken so zu zeigen, wie sie wirklich sind.',
  'Deshalb geht es mir nie nur darum, schöne Bilder zu produzieren. Ich möchte dein Produkt verstehen, dein Restaurant erleben, dein Konzept fühlen und herausfinden, was dich besonders macht. Erst dann entstehen Bilder und Videos, die authentisch wirken und Menschen erreichen.',
  'Aus dieser Denkweise ist UpSocial entstanden.',
  'Wir starten oft mit Fotografie, weil dort meine Stärke liegt. Aber heute denke ich Marken ganzheitlich. Videografie, Social Media, Werbeanzeigen und Websites gehören für mich zusammen. Viele dieser Fähigkeiten habe ich mir selbst angeeignet, weil ich verstanden habe: Gute Bilder allein reichen nicht aus, wenn dahinter keine klare Strategie steht.',
  'Mein Anspruch ist es, meine kreative Vision mit deinem Produkt zu verbinden. Mein Blick für Ästhetik und deine Idee ergeben gemeinsam etwas, das Aufmerksamkeit schafft, Vertrauen aufbaut und langfristig funktioniert.',
  'Dabei arbeite ich persönlich und direkt. Du sprichst immer mit mir – nicht mit einem Account-Manager. Ich begleite Projekte von der ersten Idee bis zur Umsetzung und sage auch offen, wenn etwas keinen Sinn ergibt.',
  'Denn am Ende geht es nicht darum, möglichst viel zu verkaufen. Es geht darum, etwas aufzubauen, das wirklich zu dir und deiner Marke passt.',
];

export function AboutPage() {
  return (
    <>
      <section className='relative overflow-hidden bg-[var(--color-bg-secondary)]/55 px-5 pb-16 pt-28 text-foreground sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-40'>
        <MotionInView
          as='div'
          amount={0.25}
          staggerChildren={0.1}
          className='mx-auto grid max-w-[var(--max-width-page)] gap-10 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16'
        >
          <figure className='relative isolate aspect-[4/5] overflow-hidden bg-[var(--color-bg-tertiary)]'>
            <img
              src={founder.portrait}
              alt={`${founder.name}, ${founder.role}`}
              fetchPriority='high'
              decoding='async'
              className='h-full w-full object-cover object-center'
            />
            <span
              aria-hidden='true'
              className='pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--ink)]/10'
            />
          </figure>
          <div className='max-w-2xl'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-readable)]'>
              Über JF
            </p>
            <h1 className='mt-4 text-[clamp(2.6rem,6.5vw,5.25rem)] font-light leading-[0.96] tracking-[-0.045em] text-balance text-foreground'>
              {founder.name}.
            </h1>
            <p className='mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg'>
              {founder.role}
            </p>
            <p className='mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground'>
              München · Bayern
            </p>
          </div>
        </MotionInView>
      </section>

      <section
        aria-labelledby='about-story'
        className='bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28'
      >
        <MotionInView as='div' className='mx-auto max-w-[var(--max-width-content)]'>
          <h2
            id='about-story'
            className='font-display text-3xl font-light leading-tight tracking-[-0.025em] text-foreground sm:text-4xl'
          >
            Wie ich arbeite.
          </h2>
          <div className='mt-7 space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg'>
            {longParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <p
            aria-hidden='true'
            className='mt-10 font-display text-3xl font-light italic leading-none text-[var(--accent-readable)] sm:text-4xl'
          >
            — {founder.signature}
          </p>
        </MotionInView>
      </section>

      <CTABanner headline='Lust, gemeinsam etwas zu bauen?' subject='Anfrage Über JF' />
    </>
  );
}
